  var mongoose = require('mongoose');
  var events = require('events');
  var eventEmitter = new events.EventEmitter();

  //adding db models..(js files)
  require('../models/chat.js');
  require('../models/room.js');

  //using mongoose Schema models..
  var chatModel = mongoose.model('chats');
  var roomModel = mongoose.model('rooms');

  module.exports.sockets = function(http) {
    var io = require('socket.io')(http);
    var ioChat = io.of('/chat1');
    var userSocket = {};

    ioChat.on('connection', function(socket) {
      console.log('socket-io chat connected.');
      socket.on('set-user-data', function(username) {
        console.log(username + '  logged In');
        socket.username = username; //storing the username in socket.username
     //   console.log(socket.id)
        userSocket[socket.username] = socket.id; //linking the socket id with username.
      });

      socket.on('set-room', function(room) {
        //leaving room.
        socket.leave(socket.room);
        //getting room data.
        eventEmitter.emit('get-room-data', room);
        //we are using the mongo id as room  id fetched from the function from script in js folder
        //setting room and join.
        setRoom = function(roomId) {
          console.log(roomId)
          socket.room = roomId;
          console.log("roomId : " + socket.username);
          socket.join(socket.room);
          ioChat.to(userSocket[socket.username]).emit('set-room', socket.room);
        };
      }); //end of set-room event.,,,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.,.

      //emits event to read old-chats-init from database.
      socket.on('old-chats-init', function(data) {
        eventEmitter.emit('read-chat', data);
      });

      //emits event to read old chats from database.
      socket.on('old-chats', function(data) {
        eventEmitter.emit('read-chat', data);
      });

      //sending old chats to client.
      oldChats = function(result, username, room) {
        ioChat.to(userSocket[username]).emit('old-chats', {
          result: result,
          room: room,
        });
      };

      //showing msg on typing......................................................................
      socket.on('typing', function() {
        socket.to(socket.room).broadcast.emit('typing', socket.username + ' : is typing...');
      });

      socket.on('chat-msg', function(data) {
        //emits event to save chat to database.
        eventEmitter.emit('save-chat', {
          msgFrom: socket.username,
          msgTo: data.msgTo,
          msg: data.msg,
          room: socket.room,
          date: new Date(),
        });
        //emits event to send chat msg to all clients.
        ioChat.to(socket.room).emit('chat-msg', {
          msgFrom: socket.username,
          msg: data.msg,
          date: new Date(),
        });
      }); //ends here

      //for popping disconnection message.
      socket.on('disconnect', function() {
        console.log(socket.username + '  logged out');
        socket.broadcast.emit('broadcast', { description: socket.username + ' Logged out' });
        console.log('chat disconnected.');
      }); //end of disconnect event.
    });

    //saving chats to database...................................................................................

    eventEmitter.on('save-chat', function(data) {
      var newChat = new chatModel({
        msgFrom: data.msgFrom,
        msgTo: data.msgTo,
        msg: data.msg,
        room: data.room,
        createdOn: data.date,
      });

      newChat.save(function(err, result) {
        if (err) {
          console.log('Error : ' + err);
        } else if (result == undefined || result == null || result == '') {
          console.log('Chat Is Not Saved.');
        } else {
          console.log('Chat Saved.');
          //console.log(result);
        }
      });
    }); //end of saving chat.......................................................................................

    //reading chat from database......................................................................................
    eventEmitter.on('read-chat', function(data) {
      console.log(data);
      chatModel
        .aggregate([
          { $match: { room: data.room } },
          {
            $project: {
              _id: 1,
              date:'$createdOn',
              room: 1,
              msg: 1,
              msgTo: 1,
              msgFrom: 1,
              __v: 1,
              time: { $dateToString: { format: '%H-%M-%S', date: '$createdOn' } },
            },
          },
          { $sort: { date: -1, time: 1 } },
        ])
        .limit(data.msgCount)
        .sort({date: 1})
        .exec(function(err, result) {
          if (err) {
            console.log('Error : ' + err);
          } else {
            //calling function which emits event to client to show chats.
            oldChats(result, data.username, data.room);
          }
        });
    }); //end of reading chat from database................................................................................

    //listening get-room-data event.
    eventEmitter.on('get-room-data', function(room) {
      roomModel.find(
        {
          $or: [
            {
              name1: room.name1,
            },
            {
              name1: room.name2,
            },
            {
              name2: room.name1,
            },
            {
              name2: room.name2,
            },
          ],
        },
        function(err, result) {
          if (err) {
            console.log('Error : ' + err);
          } else {
            if (result == '' || result == undefined || result == null) {
              var today = Date.now();

              newRoom = new roomModel({
                name1: room.name1,
                name2: room.name2,
                lastActive: today,
                createdOn: today,
              });

              newRoom.save(function(err, newResult) {
                if (err) {
                  console.log('Error : ' + err);
                } else if (newResult == '' || newResult == undefined || newResult == null) {
                  console.log('Some Error Occured During Room Creation.');
                } else {
                  setRoom(newResult._id); //calling setRoom function.
                }
              }); //end of saving room.
            } else {
              var jresult = JSON.parse(JSON.stringify(result));
              setRoom(jresult[0]._id); //calling setRoom function.
            }
          } //end of else.
        }
      ); //end of find room.
    }); //end of get-room-data listener.
  };

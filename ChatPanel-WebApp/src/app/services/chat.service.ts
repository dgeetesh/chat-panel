import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  url="http://localhost:3000/chat1";
  socket=io(this.url);

  constructor() { 
    // this.socket = io(this.url);

  }

  sendMessage(message)
{	
  this.socket.emit('chat-msg',{msg:message.msg,msgTo:message.msgTo});
}
  setUserData(username){

    this.socket.emit('set-user-data',username);
    }
    
  selectChatUser(chatUser):any
{
  return new Promise(resolve => {

  let currentRoom=chatUser.senderId+"-"+chatUser.receiverId;
  let reverseRoom=chatUser.receiverId+"-"+chatUser.senderId;
  this.socket.emit('set-room',{name1:currentRoom,name2:reverseRoom});
   this.socket.on('set-room',function(data:any){
    console.log("any")

     resolve(data);
//   this.socket.emit('old-chats-init',{room:data,username:chatUser.username,msgCount:chatUser.messageCount});
  });
})

}

getOldChats(chatuser)
{
    this.socket.emit('old-chats',{room:chatuser.roomId,username:chatuser.username,msgCount:chatuser.messageCount});
}

}

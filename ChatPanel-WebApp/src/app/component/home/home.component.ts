import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Message } from '../../models/message';
import { ChatUser } from '../../models/chatUser';
import { ChatService } from '../../services/chat.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  socket:any;
  items:any;
  toUsername:string;
  receiverId:string;
  userName:any;
  users:any;
  UserId:any;
  user:string;
  messages :any=[];
  message = new Message();
  chatUser= new ChatUser();
  txtMessage: string = '';
  searchInput:String
  filterUsers:any;


  constructor(private apiService:ApiService,private chatService:ChatService,private router: Router,
    public authenticationService: AuthenticationService) {
    this.users=this.authenticationService.getUser();
    this.userName=this.users.firstName;
    this.chatService.setUserData(this.users.firstName);
    this.socket=this.chatService.socket;
    this.socket.on('chat-msg',(data:any)=>{

      this.messages.push(data);
    });

    this.socket.on('old-chats',(data:any)=>{
      this.messages=data.result;
    });

    this.socket.on('typing',(data:any)=>{
      console.log("typed");
    });

   }

  ngOnInit(): void {
    this.getUsers();

  }

  onChange(e){
    if(e.target.value){
      this.filterUsers=this.filterUsers.filter(et=>et.firstName.toLowerCase().includes(e.target.value.toLowerCase()));
    }else{
      this.filterUsers=this.items;
    }
  }

  getUsers(){
    this.apiService.getCallback('users/list').subscribe(response => {
      console.log(response.result);
      if(response){
        this.items=response.result
        this.filterUsers=this.items
      }

  });
}



  selectChatUser(receivername,receiverId) {
    this.toUsername=receivername+""+receiverId
    localStorage.setItem("receivername",receivername);
    localStorage.setItem('receiverId',receiverId);
    this.receiverId=receiverId;

    this.chatUser=new ChatUser();
    this.chatUser.senderId=this.users._id;
    this.chatUser.receiverId=this.receiverId;
    this.chatUser.messageCount=10;
    this.chatUser.username=this.users._id+""+this.users.firstName;
    this.chatService.selectChatUser(this.chatUser).then(roomId => {
    this.chatUser.roomId=roomId;
    this.getOldChats();
    });

  }
  getOldChats() {
    this.chatUser.username=this.userName;
    this.chatUser.messageCount=this.chatUser.messageCount+5;
    this.chatService.getOldChats(this.chatUser)
  }
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.msgTo=this.toUsername;
      this.message.msgFrom=this.users._id+""+this.users.firstName;;
      this.message.msg = this.txtMessage;

      this.message.date = new Date();
      // this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  navigateTo(val){
    this.router.navigate([val]);
  }

}

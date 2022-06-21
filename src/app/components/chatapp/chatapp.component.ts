import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
// import { ChatService } from '../services/chat.service';
import { ChatappService } from 'src/app/service/chatapp.service';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit {
  @Input() userName: string = '';
  private usersSub: Subscription;
  private messagesSub: Subscription;
  private errorSub: Subscription;

  users: any =[];
  messages: any =[];
  msgtext: string ='';
 
  constructor(private chat: ChatappService,private toastr:ToastrService) { 
    this.errorSub=this.chat.error.asObservable().subscribe((err:string)=>{
      if(err){
        this.toastr.error(err,'Something went wrong')
      }
    });
    this.usersSub = this.chat.users.asObservable().subscribe((user:any)=>{
      if(user){
        console.log(user);
        this.users=[];
        Object.entries(user).forEach((userData)=>{ 
          this.users.push({
            id: userData[0],
            name: userData[1]
          });
        });
      }
    });
    this.messagesSub = this.chat.message.asObservable().subscribe((msg:any)=>{
      if(msg){
        console.log(msg);
        if (typeof msg!== 'string'){
          this.messages.push(msg);
        } else{
          this.toastr.info(msg);
        }
      }
    });
   }

  ngOnInit(): void {
    if(this.userName.length>0){
      this.chat.joinRoom(this.userName);
    }
  }
sendMessage():void{
  if (this.msgtext.length > 0){
    this.chat.sendMessage(this.msgtext);
    this.msgtext = '';
}
}
}
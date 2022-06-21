import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatappService {
  users: BehaviorSubject<any> = new BehaviorSubject(null);
  message: BehaviorSubject<any> = new BehaviorSubject(null);
  error: BehaviorSubject<any> = new BehaviorSubject(null);
  private socket = io('http://localhost:3000');
  private userCheck: boolean=true;

  constructor() { 
    this.socket.on("update", (msg)=>{
      if(this.userCheck)
      this.message.next(msg)
    });
    this.socket.on("update-people",(people)=>{
      if(this.userCheck){
        this.users.next(people)
      }
    });
    this.socket.on("chat",(userName,msg,time)=>{
      if(this.userCheck){
        this.message.next({user:userName,msg:msg,time:time});
      };
    });
    this.socket.on("disconnect",()=>{
      this.error.next("this server is not available");
    });
  }
  joinRoom(userName: string){
    this.socket.emit('join',userName);
  }
  sendMessage(message: string){
    this.socket.emit('send',message);
  }
}

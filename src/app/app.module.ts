import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatappComponent } from './components/chatapp/chatapp.component';
// import { ChatappComponent } from './components/chatapp/chatapp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { ToastrModule } from 'ngx-toastr';
import { ChatappService } from './service/chatapp.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatappComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

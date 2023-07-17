import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';
import { HomeComponent } from './home/home.component';
import { Page2Component } from './page2/page2.component';  


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    KeyboardShortcutsModule.forRoot()  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import {SignalrChannelService, ChannelConfig, SignalrWindow, channelConfig} from './signalrchannel.service';
import { WindowRef } from './windowRef';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ SignalrChannelService,
    WindowRef,
    { provide: SignalrWindow, useValue: window },
    { provide: 'channel.config', useValue: channelConfig}],
  bootstrap: [AppComponent]
})
export class AppModule { }

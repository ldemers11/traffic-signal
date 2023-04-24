import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CircleComponent } from './circle/circle.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { WebsocketService, myRxStompConfig } from './websocket/websocket.service';
import { CommonModule } from '@angular/common';


export function rxStompServiceFactory(): WebsocketService {
  const rxStomp = new WebsocketService();
  rxStomp.configure(myRxStompConfig);
  rxStomp.activate();
  return rxStomp;
}

@NgModule({
  declarations: [
    AppComponent,
    CircleComponent,
    TrafficLightComponent
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [
    {
      provide: WebsocketService,
      useFactory: rxStompServiceFactory,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

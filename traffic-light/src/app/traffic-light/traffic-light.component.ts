import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket/websocket.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.scss']
})
export class TrafficLightComponent implements OnInit {

  isRedSub = new BehaviorSubject(true);
  isRed = this.isRedSub.asObservable();
  isGreenSub = new BehaviorSubject(false);
  isGreen =  this.isGreenSub.asObservable();
  isYellowSub = new BehaviorSubject(false);
  isYellow =  this.isYellowSub.asObservable();

  constructor(private websocketService: WebsocketService) {}

  ngOnInit(): void {
    this.updateLightColor('Red');

    this.websocketService.watch('/all/messages').subscribe((message) => {
      console.log(message.body);
      this.updateLightColor(message.body);
    });
  }

  updateLightColor(color: string): void {

    if (color === 'Red' || color === 'Green' || color === 'Yellow') {
      const colorState = {
        Red: false,
        Green: false,
        Yellow: false
      };

      colorState[color] = true;

      this.isRedSub.next(colorState.Red);
      this.isGreenSub.next(colorState.Green);
      this.isYellowSub.next(colorState.Yellow);
    } else {
      console.log('Ignoring invalid color message');
    }
  }

}

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TrafficLightComponent } from './traffic-light/traffic-light.component';
import { CircleComponent } from './circle/circle.component';
import { WebsocketService } from './websocket/websocket.service';
import { NEVER } from 'rxjs';

describe('AppComponent', () => {

  const mockWebsocketService = jasmine.createSpyObj('WebsocketService', ['watch']);
  mockWebsocketService.watch.and.returnValue(NEVER);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent, TrafficLightComponent, CircleComponent
      ],
      providers: [
        {
          provide: WebsocketService,
          useValue: mockWebsocketService
        }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'traffic-light'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('traffic-light');
  });
});

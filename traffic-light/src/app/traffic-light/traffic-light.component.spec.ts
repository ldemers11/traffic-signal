import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TrafficLightComponent } from './traffic-light.component';
import { CircleComponent } from '../circle/circle.component';
import { WebsocketService } from '../websocket/websocket.service';
import { NEVER, of } from 'rxjs';

describe('TrafficLightComponent', () => {
  let component: TrafficLightComponent;
  let fixture: ComponentFixture<TrafficLightComponent>;

  const mockWebsocketService = jasmine.createSpyObj('WebsocketService', ['watch']);
  mockWebsocketService.watch.and.returnValue(NEVER);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficLightComponent, CircleComponent ],
      providers: [
        {
          provide: WebsocketService,
          useValue: mockWebsocketService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show 3 circle lights', () => {
    const circles = fixture.nativeElement.querySelectorAll('app-circle .circle');
    expect(circles.length).toBe(3);
  });

  describe('initial state', () => {

    beforeEach(waitForAsync(() => {
      mockWebsocketService.watch.and.returnValue(NEVER);
      component.ngOnInit();
      fixture.detectChanges();
      }));

    it('should show red light on initially', () => {
      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
    });

  });

  describe('message Green received', () => {

    beforeEach(waitForAsync(() => {
      mockWebsocketService.watch.and.returnValue(of({body: 'Green'}));
      component.ngOnInit();
      fixture.detectChanges();
    }));

    it('should show only green light when `Green` received', () => {

      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();
      const greenCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-green');
      expect(greenCircle).not.toBeNull();
      const yellowCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-yellow');
      expect(yellowCircle).toBeNull();
    });

  });

  describe('message Yellow received', () => {

    beforeEach(waitForAsync(() => {
      mockWebsocketService.watch.and.returnValue(of({body: 'Yellow'}));
      component.ngOnInit();
      fixture.detectChanges();
    }));

    it('should show only yellow light when `Yellow` received', () => {

      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();
      const greenCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-green');
      expect(greenCircle).toBeNull();
      const yellowCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-yellow');
      expect(yellowCircle).not.toBeNull();
    });
  });


  describe('message Red received', () => {

    beforeEach(waitForAsync(() => {
      mockWebsocketService.watch.and.returnValue(of({body: 'Red'}));
      component.ngOnInit();
      fixture.detectChanges();
    }));

    it('should show only red light when `Red` received', () => {

      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
      const greenCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-green');
      expect(greenCircle).toBeNull();
      const yellowCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-yellow');
      expect(yellowCircle).toBeNull();
    });
  });


  describe('unknown message received', () => {

    beforeEach(waitForAsync(() => {
      mockWebsocketService.watch.and.returnValue(of({body: 'asdfljaljs'}));
      component.ngOnInit();
      fixture.detectChanges();
    }));

    it('should not change light state', () => {

      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
      const greenCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-green');
      expect(greenCircle).toBeNull();
      const yellowCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-yellow');
      expect(yellowCircle).toBeNull();
    });
  });
});

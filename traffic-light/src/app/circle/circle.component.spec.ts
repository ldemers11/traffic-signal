import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleComponent } from './circle.component';
import { Component } from '@angular/core';


@Component({
  template: `
    <app-circle
      [color]="color" [lightOn]="lightOn">
    </app-circle>`
})
class TestHostComponent {
  color = 'red';
  lightOn = false;
}

describe('CircleComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestHostComponent, CircleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('off state', () => {

    it('should not have color class', () => {
      const circle = fixture.nativeElement.querySelector('app-circle .circle');
      expect(circle).not.toBeNull();
      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();
    });

    it('should contain `White`', () => {
      const circle = fixture.nativeElement.querySelector('app-circle .circle');
      expect(circle.textContent).toContain('white');
    });
  });

  describe('on state', () => {

    beforeEach(() => {
      component.lightOn = true;
      fixture.detectChanges();
    });

    it('should have color class', () => {
      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
    });

    it('should contain color name', () => {
      const redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle.textContent).toContain('red');
    });
  });

  describe('input changes', () => {

    it('should change color when `color` input changes', () => {
      let redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();
      component.lightOn = true;
      fixture.detectChanges();

      redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
      component.color = 'green';
      fixture.detectChanges();

      redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();
      const greenCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-green');
      expect(greenCircle).not.toBeNull();
    });

    it('should show color when `lightOn` input changes', () => {
      const circle = fixture.nativeElement.querySelector('app-circle .circle');
      expect(circle).not.toBeNull();
      let redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).toBeNull();

      component.lightOn = true;
      fixture.detectChanges();
      redCircle = fixture.nativeElement.querySelector('app-circle .circle.circle-red');
      expect(redCircle).not.toBeNull();
      expect(redCircle.textContent).toContain('red');
    });
  });
});

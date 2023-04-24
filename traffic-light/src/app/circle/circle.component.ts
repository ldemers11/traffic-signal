import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { on } from 'events';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit, OnChanges {

  @Input()color = 'red';
  @Input()lightOn = true;

  lightClass = '';

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.lightClass = this.lightOn ? `circle-${this.color}` : '';
  }

}

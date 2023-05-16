import { Component, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { TimePicker } from 'src/app/core/models/interfaces/timePicker';
import { HackElementText } from 'src/app/shared/utils/hackerText';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})

export class TimePickerComponent implements OnInit, AfterViewInit {

  @Output() timeEvent = new EventEmitter<TimePicker>();

  hours: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  minutes: number[] = [0, 15, 30, 45];
  ampmOptions: string[] = ['am', 'pm'];

  selectedHours: number = 1;
  selectedMinutes: number = 0;
  selectedAmPm: string = 'am';

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    //this.hours.forEach((hour) => { HackElementText(hour.toString(), ('timepicker'+hour.toString())); });
    //this.minutes.forEach((minute) => { HackElementText(minute.toString(), ('timepicker'+minute.toString())); });
    //this.ampmOptions.forEach((option) => { HackElementText(option, option); });
  }

  emit() {
    this.timeEvent.emit({ hours: this.selectedHours, minutes: this.selectedMinutes, ampmOptions: this.selectedAmPm });
  }

  onHoursChange(value: string) {
    this.selectedHours = parseInt(value, 10);
    this.emit();
  }

  onMinutesChange(value: string) {
    this.selectedMinutes = parseInt(value, 10);
    this.emit();
  }

  onAmPmChange(value: string) {
    this.selectedAmPm = value;
    this.emit();
  }
}

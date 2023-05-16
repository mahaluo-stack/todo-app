import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './ui/todo-list/todo-list.component';
import { TodoItemComponent } from './ui/todo-list/todo-item/todo-item.component';
import { CalendarComponent } from './ui/calendar/calendar.component';
import { TimePickerComponent } from './ui/todo-list/time-picker/time-picker.component';


@NgModule({
  declarations: [TodoListComponent, TodoItemComponent, CalendarComponent, TimePickerComponent],
  exports: [TodoListComponent, TodoItemComponent, CalendarComponent, TimePickerComponent],
  imports: [CommonModule]
})

export class SharedModule { }

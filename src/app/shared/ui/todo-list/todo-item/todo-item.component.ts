import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TodoFields } from 'src/app/core/models/classes/todo';
import { HackElementText } from 'src/app/shared/utils/hackerText';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit, AfterViewInit {

  @Input() todo!: TodoFields;
  @Output() removeTodo = new EventEmitter<string>();
  locked: boolean

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    //HackElementText(this.todo.title, ('todo'+this.todo.id.toString()));
    //HackElementText(this.todo.timeString, ('todo'+this.todo.timeString));
  }

  constructor() {
    this.locked = false;
  }

  handleRemove(id: string) {
    this.removeTodo.emit(id);
  }
}

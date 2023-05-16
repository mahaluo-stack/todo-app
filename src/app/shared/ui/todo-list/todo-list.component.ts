import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TodoFields } from 'src/app/core/models/classes/todo';
import { HackElementText, HackInputText } from '../../utils/hackerText';
import { TimePicker } from 'src/app/core/models/interfaces/timePicker';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})

export class TodoListComponent implements OnInit, AfterViewInit {

  @Input() dateString: string = "";
  @Input() todoList: Array<TodoFields> = [];
  @Output() todoEvent = new EventEmitter<TodoFields[]>();
  newTodoTitle: string = "";
  addBtn: string = "add";
  inputPlaceholder: string = "title";
  timePicker: TimePicker = { hours: 0, minutes: 0, ampmOptions: "AM"};

  constructor() {

  }

  ngOnInit(): void {
  
  }

  ngAfterViewInit(): void {
    //HackElementText(this.addBtn, "addBtn");
    //HackElementText(this.dateString, "dateString");
    //HackInputText(this.inputPlaceholder, "newTodoInput");
  }

  getTodoList(): Array<TodoFields> { return this.todoList; }
  getTodoTitle(): string { return this.newTodoTitle; }

  handleInput(value: string) {
    this.newTodoTitle = value;
  }

  handleTime(timeObject: TimePicker) {
    this.timePicker = timeObject;
    console.log(timeObject);
  }

  addTodo(): void {
    if (this.newTodoTitle === "") { return; }
    let todoString: string | null = localStorage.getItem("todoList");
    let arr: Array<TodoFields> = todoString ? Object.values(JSON.parse(todoString)) : [];

    arr.forEach((item, index) => {
      return item.id = index.toString()
    });

    let newTodo = {
      time: this.timePicker,
      timeString: this.timePicker.hours.toString()+":"+ this.timePicker.minutes.toString() + this.timePicker.ampmOptions,
      title: this.newTodoTitle,
      dateCreated: new Date(this.dateString),
      id: todoString === null ? "1" : (arr.length + 1).toString()
    }
    arr.push(newTodo);
    localStorage.setItem("todoList", JSON.stringify(arr));

    this.newTodoTitle = "";
    this.todoEvent.emit(arr);
  }

  removeTodo(todo: TodoFields): void {
    let todoString: string | null = localStorage.getItem("todoList");
    let arr: Array<TodoFields> = [];
    if (todoString === null) { return; }
    arr = Object.values(JSON.parse(todoString));
    arr = arr.filter(filterTodo => filterTodo.id !== todo.id);
    localStorage.setItem("todoList", JSON.stringify(arr));
    this.todoEvent.emit(arr);
  }


}

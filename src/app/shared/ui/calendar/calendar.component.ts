import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Days } from 'src/app/core/constants/days';
import { Months } from 'src/app/core/constants/months';
import { Todo, TodoFields } from 'src/app/core/models/classes/todo';
import { GridDate } from 'src/app/core/models/interfaces/gridDate';
import { HackAllText, HackElementText } from '../../utils/hackerText';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit, AfterViewInit {

  months: Array<string> = Months;
  days: Array<string> = Days;
  gridSize: number = 42;
  prevNextMonth: number = 0;
  today: Date = new Date();

  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  currentDay: number = new Date().getDay();
  currentMonthName: string = this.months[new Date().getMonth()];
  currentDayName: string = this.days[new Date().getDay() - 1];
  dates: Array<GridDate> = [];

  selectedDate: Date;
  selectedDateString: string;
  todayBtn: string = "today";
  prevBtn: string = "←";
  nextBtn: string = "→";
  todoList: Array<TodoFields> = [];

  constructor() {
    this.today.setHours(0, 0, 0, 0);
    this.selectedDate = this.today;
    this.selectedDateString = this.today.toDateString();
    this.todoList = this.getTodos(this.today);
   
    this.update(0);
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    //this.hackText();
  }

  hackText() {
    HackElementText(this.todayBtn, "todayBtn");
    HackElementText(this.prevBtn, "prevBtn");
    HackElementText(this.nextBtn, "nextBtn");

    HackElementText(this.currentMonthName, this.currentMonthName);
    HackElementText(this.currentYear.toString(), this.currentYear.toString());

    Days.forEach((day) => { HackElementText(day, day); });
    this.dates.forEach((date) => { HackElementText(date.date.toString(), date.id); });
    let todoString: string | null = localStorage.getItem("todoList");
    if (todoString !== null) {
      Object.values(JSON.parse(todoString)).forEach((todo, index) => {
        const todoFields = todo as TodoFields;
        HackElementText(todoFields.title, todoFields.title);
      });
    }
  }

  setToday() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.update(0);
  }

  update(prevNext: number) {
    this.dates = [];
    const date = new Date(this.currentYear, (this.currentMonth + prevNext));

    this.currentYear = date.getFullYear();
    this.currentMonth = date.getMonth();
    this.currentMonthName = Months[this.currentMonth];

    const firstDay = new Date(this.currentYear, this.currentMonth).getDay() - 1;
    const totalMonthDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const totdalPrevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();

    for (var i = 1; i <= firstDay; i++) {
      const prevMonthDate = totdalPrevMonthDays - firstDay + i;
      const key = new Date(this.currentYear, this.currentMonth - 1, prevMonthDate);
      this.dates.push({ id: this.dates.length.toString() + 1, dateString: key.toDateString(), key: key, todoList: this.getTodos(key), date: prevMonthDate, monthClass: 'prev', todayClass: 'prev' });
    }

    for (var i = 1; i <= totalMonthDays; i++) {
      const key = new Date(this.currentYear, this.currentMonth, i);
      if (i === this.today.getDate() && this.currentMonth === this.today.getMonth() && this.currentYear === this.today.getFullYear()) {
        this.dates.push({ id: this.dates.length.toString() + 1, dateString: key.toDateString(), key: key, todoList: this.getTodos(key), date: i, monthClass: 'current', todayClass: 'today' });
      } else {
        this.dates.push({ id: this.dates.length.toString() + 1, dateString: key.toDateString(), key: key, todoList: this.getTodos(key), date: i, monthClass: 'current', todayClass: 'current' });
      }
    }

    if (this.dates.length < this.gridSize) {
      var count = this.gridSize - this.dates.length;
      for (var i = 1; i <= count; i++) {
        var key = new Date(this.currentYear, this.currentMonth + 1, i);
        this.dates.push({ id: this.dates.length.toString() + 1, dateString: key.toDateString(), key: key, todoList: this.getTodos(key), date: i, monthClass: 'next', todayClass: 'next' });
      }
    }

  
  }

  handleSelectDate(dateKey: Date) {
    if (dateKey === this.selectedDate) {
      this.todoList = [];
      this.selectedDate = new Date();
      this.selectedDateString = "";
    }
    else {
      this.selectedDateString = dateKey.toDateString();
      this.selectedDate = dateKey;
      this.todoList = this.getTodos(dateKey);
    }
  }

  getTodos(date: Date): Array<TodoFields> {
    let todoString: string | null = localStorage.getItem("todoList");
    let todoArr: Array<TodoFields> = [];
    if (todoString !== null) {
      Object.values(JSON.parse(todoString)).forEach((todo) => {
        const todoFields = todo as TodoFields;
        if (date.toDateString() === new Date(todoFields.dateCreated).toDateString()) {
          todoArr.push(todoFields);
        }
      })
    }
    let sortedArr = this.sortByTime(todoArr);
    return todoArr;
  }

  updateTodos(todos: TodoFields[]) {
    let arr: Array<TodoFields> = [];
    todos.forEach((todo: TodoFields) => {
      if (this.selectedDate && this.selectedDate.toDateString() === new Date(todo.dateCreated).toDateString()) {
        arr.push(todo);
      }
    })
    this.todoList = arr;
    this.update(0);
  }

  sortByTime(arr: Array<TodoFields>): Array<TodoFields> {

    if (arr.length === 0) { return []; };

    let am: Array<TodoFields> = [];
    let pm: Array<TodoFields> = [];
    
    arr.forEach((todo) => {
      todo.time.ampmOptions.toLocaleLowerCase() === 'am' ? am.push(todo) : pm.push(todo);
    });
    am = am.sort((a, b) => a.time.hours - b.time.hours);
    pm = pm.sort((a, b) => a.time.hours - b.time.hours);
    return am.concat(pm);
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { HackElementText } from 'src/app/shared/utils/hackerText';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title: string = "";

  constructor() {

  }

  ngOnInit(): void {
    HackElementText(this.title, "headerTitle");
  }
}
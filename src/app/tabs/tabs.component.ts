import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Tab } from '../tab/tab.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class Tabs implements OnInit {

  tabs: Tab[] = [];
  @Output() selected = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  addTab(tab:Tab) {
    if (!this.tabs.length) {
      tab.selected = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:Tab) {
    this.tabs.map((tab) => {
      tab.selected = false;
    })
    tab.selected = true;
    this.selected.emit({selectedTab: tab});
  }

}

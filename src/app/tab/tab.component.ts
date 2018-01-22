import { Component, OnInit, Input } from '@angular/core';
import { Tabs} from '../tabs/tabs.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class Tab implements OnInit {

  @Input() tabTitle: string;

  constructor(tabs:Tabs) {
    tabs.addTab(this);
  }
  ngOnInit() {
  }
  selected = false;

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  imagesList = [];
  constructor() {
    for (let i = 0; i < 50; i++) {
      const url = 'https://loremflickr.com/1200/800?cats' + (i + 1);
      this.imagesList[i] = {
        url: url,
        show: false
      };
    }
  }

  ngOnInit() {
  }

}

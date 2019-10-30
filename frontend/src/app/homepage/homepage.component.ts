import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css',]
})
export class HomepageComponent implements OnInit {
  imagesList = [];
  constructor() {
    for (let i = 0; i < 50; i++) {
      const url = 'https://api.unsplash.com/search/photos?page=1&query=office' + (i +1);
      this.imagesList[i] = {
        url: url,
        show: false
    };
  }

   }

  ngOnInit() {
  }

}

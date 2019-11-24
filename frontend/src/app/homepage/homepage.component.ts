import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['../../../node_modules/ng-masonry-grid/ng-masonry-grid.css']
})
export class HomepageComponent implements OnInit {
  apiURL = 'http://34.65.122.100/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  @Input() details = {
    searchValue: '',

  }
  faHeart = faHeart;
  faSearch = faSearch;
  faLogOut = faSignOutAlt;
  userName = '';
  config = {
    'force_pic_config': '',
    'network_status': ''
  };
  imageSize = 400;


  imagesList = [{
    url: 'https://source.unsplash.com/user/erondu/1600x900'
  },
  {
    url: 'https://source.unsplash.com/user/erondu/1600x900'
  },
  {
    url: 'https://source.unsplash.com/user/erondu/600x900'
  },
  {
    url: 'https://source.unsplash.com/user/erondu/600x900'
  },
  {
    url: 'https://source.unsplash.com/user/erondu/600x900'
  }];
  recommendedList = [{
    url: 'https://source.unsplash.com/user/erondu/1000x700'
  },
  {
    url: 'https://source.unsplash.com/user/erondu/1000x700'
  }];
  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
  }
  ngOnInit() {
    this.logNetworkInfo();
    this.userName = localStorage.getItem('userName');
  }
  logNetworkInfo() {
    return navigator['connection'].effectiveType;
  }
  removeItem(e) {
  }
  heartClicked(e, img, i) {
    console.log(img);
    console.log(i);
  }
  recommendedImages() {
    this.http.get(this.apiURL + 'picture/recommend', this.httpOptions)
      .subscribe((data: any) => {
        if (data.msg === 'OK') {

          var i = 0;
          while (i < data.result.pictures.length) {
            this.recommendedList[i].url = data.result.prefix + this.imageSize + data.result.pictures[i].url;
            i++;
          }
        }
        else {
          alert("No Recommendations Found");
        }
      })
  }
  searchClicked(e) {
    this.httpOptions.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('currentUser'),
    });
    if (this.details.searchValue != '') {
      this.http.get(this.apiURL + 'picture/search?search=' + this.details.searchValue, this.httpOptions)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {

            var i = 0;
            while (i < data.result.pictures.length) {
              this.imagesList[i].url = data.result.prefix + this.imageSize + data.result.pictures[i].url;
              i++;
            }
          }
          else {
            alert("No Results Found");
          }
        })
      this.recommendedImages();
    }
    else {
      alert("Enter search value");
    }
  }
  logOutClicked(e) {
    this.userService.logoutUser()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          localStorage.clear();
          this.router.navigate(['/']);
        } else {
          console.log('Logout not successful');
        }
      });
  }
  onResolutionCheckChange(e) {
    if (event.target['checked']) {
      this.config.force_pic_config = 'true';
      this.config.network_status = this.logNetworkInfo();
      this.userService.updateConfig(this.config)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            this.router.navigate(['/home']);
          } else {
            console.log('setting config not successful');
          }
        });
    }
  }
}

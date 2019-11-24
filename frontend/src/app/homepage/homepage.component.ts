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
  @Input() details = {
    searchValue: '',
  };
  faHeart = faHeart;
  faSearch = faSearch;
  faLogOut = faSignOutAlt;
  userName = '';
  config = {
    'force_pic_config': '',
    'network_status': ''
  };
  networkInfo = '';
  imageSize = 600;
  imagesList = [];
  recommendedList = [];
  NetworkMsg = '';
  isHighRes = false;
  constructor(private router: Router, private userService: UserService, private http: HttpClient) {
  }
  ngOnInit() {
    this.logNetworkInfo();
    this.userName = localStorage.getItem('userName');
    this.onHomePageLoad();
  }
  logNetworkInfo() {
    this.networkInfo = navigator['connection'].effectiveType;
    this.setNetworkMsg(this.networkInfo);
  }
  setNetworkMsg(network) {
    if (network === '4g' || this.config.force_pic_config) {
      this.NetworkMsg = 'Loading High Resolution Content';
      this.isHighRes = true;
      this.imageSize = 600;
    } else {
      this.NetworkMsg = 'Loading Low Resolution Content';
      this.isHighRes = false;
      this.imageSize = 100;
    }
  }
  removeItem(e) {
  }
  heartClicked(e, img, i) {
    console.log(img);
    console.log(i);
  }
  onHomePageLoad() {
    this.userService.getSearchedImages()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          let i = 0;
          while (i < data.result.pictures.length) {
            this.imagesList.push({});
            this.imagesList[i]['url'] = data.result.prefix + this.imageSize + data.result.pictures[i].url;
            i++;
          }
        } else {
          console.log('Search not successful');
        }
      });
  }
  loadRecommendedImages() {
    this.userService.getRecommendedImages()
      .subscribe((data: any) => {
        if (data.msg === 'OK') {
          const images = [];
          let i = 0;
          if (this.recommendedList.length === 0) {
            while (i < data.result.pictures.length) {
              this.recommendedList.push({});
              i++;
            }
          }
          let j = 0;
          while (j < data.result.pictures.length) {
            this.recommendedList[j]['url'] = data.result.prefix + this.imageSize + data.result.pictures[j].url;
            j++;
          }
        } else {
          console.log('Recommendation not successful');
        }
      });
  }
  searchClicked(e) {
    if (this.details.searchValue !== '') {
      this.userService.getSearchedImages(this.details.searchValue)
        .subscribe((data: any) => {
          if (data.msg === 'OK') {
            let i = 0;
            while (i < data.result.pictures.length) {
              this.imagesList[i]['url'] = data.result.prefix + this.imageSize + data.result.pictures[i].url;
              i++;
            }
          } else {
            console.log('Search not successful');
          }
        });
      this.loadRecommendedImages();
    } else {
      console.log('Enter search value');
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
      this.imageSize = 600;
      this.config.force_pic_config = 'true';
      this.config.network_status = this.networkInfo;
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

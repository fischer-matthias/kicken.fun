import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'soccer-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public displayClose: boolean = false;

  constructor(private router: Router) { 
    this.router.events.subscribe((event) => {

      if(event instanceof NavigationEnd) {
        if (event.url === "/club-selection") {
          this.displayClose = false;
        } else {
          this.displayClose = true;
        }
      }
    })
  }

  ngOnInit() {
  }

  public closePage(): void {
    this.router.navigate(['/club-selection']);
  }
}

import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {

  }

  onClick() {
    this.router.navigate(["add-report"]) 
  }
}

import { AppRoutingModule } from './../app-routing.module';
import { Component, Input } from '@angular/core';
import { Report } from '../report';
import { ActivatedRoute, Router } from '@angular/router';

import { ReportService } from '../report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  bname: string = this.ActivatedRoute.snapshot.params['name'] 
  report!: Report 

  constructor(private ActivatedRoute: ActivatedRoute, private rs: ReportService, private router: Router) {
    this.report = rs.getReport(this.bname) 
  }

  onClick() {
    this.router.navigate(["home"])
  }
}


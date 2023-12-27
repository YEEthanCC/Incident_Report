import { ReportService } from './../report.service';
import { Component, OnInit } from '@angular/core';
import { Report } from '../report';
import { Observable, of } from 'rxjs';
import { LocationsService } from '../locations.service';
import {MD5} from 'crypto-js'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent implements OnInit {
  reports$: Observable<Report[]> = of([])

  constructor(private rs:ReportService, private ls: LocationsService) {

  }

  async onDelete(name: string, placeName: string) {
    console.log("onDelete function called")
    const password = window.prompt("Enter the password: ", "") || ""
    const hash = MD5(password.replace(/\s+/g, '')).toString()
    if(hash != "fcab0453879a2b2281bc5073e3f5fe54") return window.alert("Wrong Password")
    this.rs.delete(name, password) 

    this.ls.delete(placeName)  
    this.reports$ = this.rs.get();
    
  }

  ngOnInit(): void {
    this.reports$ = this.rs.get() 

    console.log(this.reports$)
  }

  onStatusChange(name: string) {
    const password = window.prompt("Enter the password: ", "") || ""
    this.rs.changeReportStatus(name, password) 
  }

}

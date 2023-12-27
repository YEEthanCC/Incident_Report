import { Injectable } from '@angular/core';
import { Report } from './report';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {MD5} from 'crypto-js'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  reports: Report[]

  constructor(private http: HttpClient) { 
    this.reports = [] 
    // this.http.get<{ key: string; data: string }>('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/reports/')
    // .subscribe(response=> {
    //   if (response.data && Array.isArray(response.data)) {
    //     // Use the received array directly
    //     this.reports = response.data;
    //     console.log(this.reports);
    //   } else {
    //     console.error('Invalid response format: missing "data" property or data is not an array');
    //   }
    // });
    
  }

  get(): Observable<Report[]> {
    return this.http.get<{ key: string; data: Report[] }>('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/reports/')
    .pipe(
      map(response => {
        if(response.data && Array.isArray(response.data)) {
          this.reports = response.data 
          return response.data
        } else {
          return this.reports 
        }
      })
    )
  }

  

  getReport(name: string) {
    console.log("getReport is called") 
    let report 
    for(let i = 0; i < this.reports.length; i++) {
      if(this.reports[i].name == name) {
        console.log("report is found") 
        return this.reports[i] 
      }
    }
    return this.reports[0] 
    console.log("report not found") 
  }

  changeReportStatus(name: string, password: string) {
    const hash = MD5(password.replace(/\s+/g, '')).toString()
    if(hash != "fcab0453879a2b2281bc5073e3f5fe54") return window.alert("Wrong Password")
    let report 
    for(let i = 0; i < this.reports.length; i++) {
      if(this.reports[i].name == name) {
        if(this.reports[i].status == "OPEN") {
          this.reports[i].status = "RESOLVED" 
        } else {
          this.reports[i].status = "OPEN" 
        } 
      }
    }
    const updateData = {key: 'reports', "data": this.reports}
    this.http.put('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/reports/', updateData).subscribe(response=>{console.log(response)})
  }

  add(report: Report) {
    console.log('report service add function is called') 
    this.reports.push(report) 
    console.log('report is pushed successfully')
    const updateData = {key: 'reports', "data": this.reports}
    this.http.put('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/reports/', updateData).subscribe(response=>{console.log(response)})
    console.log('data is changed successfully') 
  }

  delete(del_report: string, password: string) {
    // const hash = MD5(password.replace(/\s+/g, '')).toString()
    // if(hash != "fcab0453879a2b2281bc5073e3f5fe54") return window.alert("Wrong Password")
    this.reports = this.reports.filter((r) => r.name != del_report)
    const updateData = {key: 'reports', "data": this.reports}

    this.http.put('https://272.selfip.net/apps/06DbTWpWIT/collections/data1/documents/reports/', updateData).subscribe(response=>{console.log(response)})
  }
}

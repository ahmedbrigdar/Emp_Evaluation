import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NotficationService } from '../../services/notfication.service';
import { ApiService } from '../../services/api.service';

import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  emps = [];
  @ViewChild('pdfTable') pdfTable: ElementRef;

  constructor(private api: ApiService, private router: Router,
    private notification: NotficationService) { }


  public downloadAsPDF() {
    const doc = new jsPDF();

    const pdfTable = this.pdfTable.nativeElement;

    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();

  }
  ngOnInit(): void {
    this.getAllEmployees();
  }
  getAllEmployees() {
    this.emps = [];
    this.api.getusers().subscribe((res: []) => {
      res.forEach(e => {
        this.emps.push(e);
      })
    })
  }
  edit(id) {
    this.router.navigate(['addUser'], { queryParams: { empID: id } })
  }
  evaluate(id) {
    this.router.navigate(['evaluate'], { queryParams: { empID: id } })
  }
  delete(id, name) {
    if (confirm(`Are you sure you want to delete ${name} ?`)) {
      if (localStorage.getItem('id') === id) {
        this.notification.notfiy('warning', 'you cant delete logged in account !!', 'top', 'right');
      } else {
        this.api.deleteuser(id).subscribe((res) => {
          if (res.status == 0) {//not deleted
            this.notification.notfiy('error', res.message, 'top', 'right');
          } else {
            this.notification.notfiy('success', res.message, 'top', 'right');
            this.getAllEmployees();
          }
        })
      }
    }
  }
}

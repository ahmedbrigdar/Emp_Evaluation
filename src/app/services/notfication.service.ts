import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotficationService {

  constructor(private toastr: ToastrService) { }

  notfiy(type, message,from = 'top', align = 'right') {
    switch (type) {
      case 'info':
        this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span>', message, {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 'success':
        this.toastr.success('<span class="now-ui-icons ui-1_bell-53"></span>', message, {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 'warning':
        this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span>', message, {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 'error':
        this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>', message, {
          timeOut: 8000,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      case 'show':
        this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span>', message, {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' + align
        });
        break;
      default:
        break;
    }
  }
}

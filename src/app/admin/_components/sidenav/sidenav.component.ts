import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { tap } from 'rxjs';
import { SidenavService } from 'src/app/core/_services/sidenav.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav') sidenav?: MatSidenav;

  constructor(
    private sidenavService: SidenavService
  ) { }

  ngOnInit(): void {
    this.sidenavService.isOpen.pipe(
      tap((value: boolean) => {
        if(this.sidenav) {
          if(value) {
            this.sidenav.open();
          } else {
            this.sidenav.close();
          }
        }
      })
    ).subscribe();
  }

  close(reason: string) {
    this.sidenavService.reason.next(reason);
    this.sidenavService.isOpen.next(false);
  }


}

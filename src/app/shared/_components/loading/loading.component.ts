import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { LoadingService } from 'src/app/core/_services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.sass']
})
export class LoadingComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loading.pipe(
      tap(loading => this.loading = loading)
    ).subscribe()
  }

}

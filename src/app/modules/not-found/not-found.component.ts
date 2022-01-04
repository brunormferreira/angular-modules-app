import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent implements OnInit {
  public hasErrorFromService: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const validation = this.router.url.includes('unavailable');
    if (validation) this.hasErrorFromService = true;
  }
}

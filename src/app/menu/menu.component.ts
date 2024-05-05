import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../shared/services/loading.service';
import { SharedService } from '../shared/services/shared.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  nombreUsuario: string = "";


  constructor(private router: Router,
    private sharedService: SharedService
    ) {}

    ngOnInit() {

     this.nombreUsuario = this.sharedService.nombreUsuario;
    }

}




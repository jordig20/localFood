import { Component, OnInit, Renderer2 } from '@angular/core';
import { NgbAccordionConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as Rellax from 'rellax';
import { Router } from '@angular/router';
import { SenderService } from '../core/services/sender.service';
import { ApiService } from '../core/services/api.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styles: [
      `
      ngb-progressbar {
        margin-top: 5rem;
      }
    `,
  ],
})

export class ComponentsComponent implements OnInit {
  data: Date = new Date();

  page = 4;
  page1 = 5;
  page2 = 3;
  focus;
  focus1;
  focus2;

  date: { year: number, month: number };
  model: NgbDateStruct;

  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  public search: any;
  public productos: any[] = [];
  public cocineros: any[] = [];

  state_icon_primary = true;

  constructor(private renderer: Renderer2,
              config: NgbAccordionConfig,
              private _router: Router,
              private _api: ApiService,
              private _sender: SenderService,
              public authService: AuthService,
  ) {
    config.closeOthers = true;
    config.type = 'info';
  }

  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    this.search = this._sender.serviceData;
  }

  onLogin(): any {
    this._router.navigate(['login']);
  }

  onKey(event) {
    this.search = event.target.value;
    this._sender.serviceData = this.search;
    if (this.search !== '') {
      this._api.get('product/' + this.search.toLowerCase()).subscribe(r => {
        this.productos = r;
      });
    }
  }

  onSubmit() {
    this._router.navigate(['productos']);
  }
}

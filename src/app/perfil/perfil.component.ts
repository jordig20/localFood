import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingColor } from '../star-rating/star-rating.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/core/services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  public data: any = {};
  public productos: any[] = [];

  public updated: boolean;
  public edit: boolean;
  public oldData: any;
  public new: boolean;
  public type: string;
  public form: FormGroup;

  constructor(
    private _api: ApiService,
    private _fb: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
  ) {
  }

  ngOnInit(): void {
    const id: string = this._route.snapshot.paramMap.get('id');

    this._api.get('user/getone/' + id).subscribe(d => {
      this.data = d[0];
      this.buildForm();
    });

    this._api.get('product/all/' + id).subscribe(r => {
      this.productos = r;
    });


    this.edit = false;
    this.buildForm();

  }


  onCancel(): void {
    this.data = JSON.parse(JSON.stringify(this.oldData));
    this.buildForm();
    this.edit = false;
  }

  onEdit(): void {
    this.edit = !this.edit;
    if (!this.edit) {
      this.onCancel();
    }
  }

  onSave(): void {
    const values: any = this.form.getRawValue();

    this.data.name = values.name;
    this.data.adress = values.adress;
    this.data.city = values.city.toLowerCase();
    this.data.type = values.type;
    this.data.telf = values.telf;

    console.log(this.data);
    this._api.put('user/update/' + this.data._id, this.data).subscribe(d => console.log('PUT', d));
    this.updated = true;
    this.edit = false;
  }


  onCook() {
    this._router.navigate(['cocineros']);

  }

  onProducts() {
    this._router.navigate(['productos']);

  }


  onSelect(id: any): void {
    this._router.navigate(['productos/' + id]);
  }


  private buildForm(): void {
    this.oldData = JSON.parse(JSON.stringify(this.data));
    this.form = this._fb.group({
      name: [this.data.name, Validators.required],
      city: [this.data.city, Validators.required],
      type: [this.data.type, Validators.required],
      adress: [this.data.adress, Validators.required],
      telf: [this.data.telf, Validators.required],

    });
  }
}


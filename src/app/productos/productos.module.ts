import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductosViewComponent } from './productos-view/productos-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: ProductosComponent },
  { path: ':id', component: ProductosViewComponent },

];

@NgModule({
  declarations: [ProductosComponent, ProductosViewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
  ],

  exports: [
    ProductosComponent,
    RouterModule,
  ],
})
export class ProductosModule {
}

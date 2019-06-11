import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {NewProductComponent} from './new-product/new-product.component';
import {SearchProductComponent} from './search-product/search-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'new-product', component: NewProductComponent
  },
  {
    path: 'search-product', component: SearchProductComponent
  },
  {
    path: '', redirectTo: 'products', pathMatch: 'full'
  },
  {
    path: 'edit-product/:id', component: EditProductComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
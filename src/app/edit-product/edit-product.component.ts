import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private currentProduct: Product;
  private url: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute
  , private catService: CatalogueService) { }

  ngOnInit() {
    // atob(...) décode l'url en base 64
    this.url = atob(this.activatedRoute.snapshot.params.id);
    this.catService.getResource(this.url)
      .subscribe(data => {
        this.currentProduct = data;
      }, err => {
        console.log(err);
      })
  }

  onUpdateProduct(value: any) {
    this.catService.updateResource(this.url, value)
      .subscribe(date => {
        alert('Product successfully updated!');
        this.router.navigateByUrl('products');
      }, err => {
        console.log(err);
      })
  }
}

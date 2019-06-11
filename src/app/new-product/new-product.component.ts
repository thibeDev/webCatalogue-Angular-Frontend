import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../models/product.model';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  private currentProduct: Product;
  created: boolean = false;

  constructor(private catService: CatalogueService) { }

  ngOnInit() {
  }

  onSaveProduct(data: any) {
    this.catService.saveProduct(this.catService.host + '/products', data)
      .subscribe(resp => {
        this.created = true;
        this.currentProduct = resp;
      }, err => {
        console.log(err);
      })
  }

  onNewProduct() {
    this.created = false;
  }
}

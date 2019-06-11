import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: any;
  public size = 5;
  public currentPage = 0;
  public totalPages: number;
  public pages: Array<number>;
  public currentKeyword = '';

  constructor(private catService: CatalogueService, private router: Router ) { }

  ngOnInit() {
    this.onGetProducts();
  }

  onGetProducts() {
    this.catService.getProduits(this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onPageProduct(i: number) {
    this.currentPage = i;
    this.searchProduct();
  }

  onSearch(form: any) {
    this.currentKeyword = form.keyword;
    this.currentPage = 0;
    this.searchProduct();
  }

  searchProduct() {
    this.catService.getProductsByKeyword(this.currentKeyword, this.currentPage, this.size)
      .subscribe(data => {
        this.totalPages = data["page"].totalPages;
        this.pages = new Array<number>(this.totalPages);
        this.products = data;
      }, error => {
        console.log(error);
      });
  }

  onDelete(p) {
    console.log(p);
    let conf = confirm('Delete this product?');
    if (conf) {
      this.catService.deleteProduct(p._links.self.href)
        .subscribe(data =>{
          this.searchProduct();
        }, err =>{
          console.log(err);
        })
    }
  }

  onEdit(p: any) {
    let url = p._links.self.href;
    // btoa(url) = base 64 encode pour ne pas transmettre l'url en get
    this.router.navigateByUrl('edit-product/' + btoa(url));
  }
}

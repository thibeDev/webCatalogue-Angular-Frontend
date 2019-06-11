import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  public host = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  public getProduits(page: number, size: number) {
    return this.httpClient.get(this.host + '/products?page=' + page + '&size=' + size);
  }

  public getProductsByKeyword(keyword: string, page: number, size: number) {
    return this.httpClient.get(this.host + '/products/search/byDesignationPage?mc=' + keyword +'&page=' + page + '&size=' + size);
  }

  public deleteProduct(url){
    return this.httpClient.delete(url);
  }

  public saveProduct(url, data): Observable<Product> {

    return this.httpClient.post<Product>(url, data);
  }

  public getResource(url): Observable<Product> {

    return this.httpClient.get<Product>(url);
  }

  public updateResource(url, data): Observable<Product> {

    return this.httpClient.put<Product>(url, data);
  }

}

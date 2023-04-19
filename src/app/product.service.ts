import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of } from 'rxjs';
import products from "src/assets/products.json"

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(){}
  
  public getProductList(): Observable<any>{
    return of(products).pipe(delay(1000));
  }

  public getModifiedProduct(product: any): Observable<any> {
    throw Error("Faulty")
    product.name = "New " + product.name;
    return of(product).pipe(delay(500));
  }
  
  public getFinishedProduct(product: any): Observable<any> {
    product.name = "Finishedd " + product.name
    return of(product).pipe(delay(500));
  }
}

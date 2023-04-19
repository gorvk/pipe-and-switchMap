import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  finishedProduct: any;
  productSub: any;
  loader = {loading: false, message: "Loading..."}
  
  constructor(private productService: ProductService){}
  
  ngOnInit(){
    this.loader.loading = true;
    this.createNewProduct();
  }
  
  private createNewProduct(): void {
    this.productSub = this.productService.getProductList()
    .pipe(
      switchMap(productList => this.productService.getModifiedProduct(productList[0]).pipe()),
      catchError(_ => of({name : "faulty modified", price : 0}))
    )
    .pipe(
      switchMap(modifiedProduct => this.productService.getFinishedProduct(modifiedProduct)),
      catchError(_ => of({name : "faulty finished", price : 0}))
    )
    .subscribe({
      next : (finishedProduct) => { this.finishedProduct = finishedProduct },
      error : (_) => { alert("error occured") } /* handle error here */,
      complete : () => { this.loader.loading = false } /* stop loader here */,
    })
  }
  
  ngOnDestroy() {
    this.productSub.unsubscribe();
  }
}

// private setProductStatusWithSubscription(): void {
//   this.productService.getProductList().subscribe(productList => {
//     this.productService.getModifiedProduct(productList[0].name).subscribe(res => {
//       this.productService.getModifiedProduct(`${res} & shop`).subscribe(status => {
//         this.finishedProduct = status
//       })
//     })
//   })
// }
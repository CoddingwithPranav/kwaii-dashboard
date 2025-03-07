import { Component, inject } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.scss'
})
export class ListProductComponent {
productService = inject(ProductService);
router = inject(Router);
productData!:Array<any>;
ngOnInit(){
  this.productService.loadData().subscribe((res)=>{
    this.productData = res;
  })
}


NavigateToEdit(event:any){
  this.router.navigate(['product-edit/'+ event])

}
NavigateToAdd(){
  this.productService.productObj.next(null);
  this.router.navigate(['/product-add'])
}

deleteProduct(id:string){
  this.productService.deleteData(id)
}
}

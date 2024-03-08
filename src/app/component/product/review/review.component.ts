import { Component, HostListener, inject } from '@angular/core';
import { ProductService } from '../../../shared/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = true;
  }
  productService = inject(ProductService);
  router = inject(Router);
  productId:string = '';
  formStatus = 'create'

  constructor(private actvieRoute: ActivatedRoute){
    this.productId = this.actvieRoute.snapshot.paramMap.get('id') ?? '';
    if(this.productId != ''){
      this.formStatus = "Edit"
    }
    if(this.productService.productObj.value  == null){
      this.router.navigate(['/product-list'])
    }
  }
  submit(){
    this.productService.uploadImg(this.formStatus, this.productId);

  }
}

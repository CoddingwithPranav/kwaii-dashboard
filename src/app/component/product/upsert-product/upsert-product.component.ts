import { Component, inject } from '@angular/core';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductService } from '../../../shared/service/product.service';
import { Product } from '../../../shared/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
@Component({
  selector: 'app-upsert-product',
  templateUrl: './upsert-product.component.html',
  styleUrl: './upsert-product.component.scss',
})
export class UpsertProductComponent {
  productService = inject(ProductService);
  toast = inject(HotToastService);
  router = inject(Router);
  fb = inject(FormBuilder);
  events: string[];
  isInDom: boolean = false;

  productForm!:FormGroup;
  // Form Constant
  title!:string
  description!:string
  details: string = 'Product Details';
  price!:number;
  discount!:number;
  isActive!: boolean;
  featured: boolean = false;

  productId:string = '';


  countries: any[] | undefined;

    selectedCountry: any | undefined;



  productObj!:Product;
  imageChangedEvent: any = '';
  croppedImage: any = '../../../../assets/default.jpg';
  constructor(private sanitizer: DomSanitizer, private activeRoute : ActivatedRoute) {
    this.events = ['Basic Info', 'Review'];
    this.activeRoute.paramMap.subscribe((prams)=>{
      this.productId = prams.get('id') ?? '';
    })


  }

  ngOnInit(): void {
    this.loadForm();
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
  ];
    if (typeof document !== 'undefined') {
      this.isInDom = true;
    }
    if(this.productId != ""){
      this.productService.loadOneData(this.productId).subscribe({next:(res:any)=>{
        this.productForm.patchValue({
          title : res['title'],
          description: res.description,
          details: res.details,
          price:res.price,
          discount:res.discount,
          isActive:res.isActive,
          featured:res.isFeatured,
        })
        this.croppedImage = res.productImgPath;
      }})
    }
    if(this.productService.productObj.value !=null){

      this.productForm.patchValue({
        title : this.productService.productObj.value?.title,
        description: this.productService.productObj.value?.description,
        details: this.productService.productObj.value?.details,
        price:this.productService.productObj.value?.price,
        discount:this.productService.productObj.value?.discount,
        isActive:this.productService.productObj.value?.isActive,
        featured:this.productService.productObj.value?.isFeatured,
      })
      this.croppedImage = this.productService.productObj.value?.selectedImage;

    }
  }
  loadForm(){
    this.productForm = this.fb.group({
      title:['', Validators.required],
      description:['', Validators.required],
      details:['', Validators.required],
      price:['', Validators.required],
      discount:['', Validators.required],
      isActive:['', Validators.required],
      featured:['', Validators.required],
    })
  }
get fs(){
  return this.productForm.controls;
}
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64
  }
  imageLoaded(image: LoadedImage) {
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  review() {

    if(this.productForm.invalid == true){
      this.toast.error('Provide All Input');
      this.productForm.markAllAsTouched();
      return;
    }
    this.productObj ={
      title : this.productForm.value.title,
      description: this.productForm.value.description,
      details: this.productForm.value.details,
      price:this.productForm.value.price,
      discount:this.productForm.value.discount,
      isActive:this.productForm.value.isActive,
      productImgPath:'',
      selectedImage:this.croppedImage,
      isFeatured:this.productForm.value.featured,

    }
   this.router.navigate(['/product-review/'+ this.productId]);
    this.productService.updateProduct(this.productObj);
  }
}

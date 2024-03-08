import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HotToastService } from '@ngneat/hot-toast';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  docData,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  toast = inject(HotToastService);
  showToast() {
    this.toast.show('Hello World!');
    this.toast.loading('Lazyyy...');
    this.toast.success('Yeah!!');
    this.toast.warning('Boo!');
    this.toast.error('Oh no!');
    this.toast.info('Something...');
  }
  public productObj: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);

  updateProduct(newProduct: Product): void {
    this.productObj.next(newProduct);
  }
  constructor(
    private storage: AngularFireStorage,
    private firestore: Firestore,
    private router: Router
  ) {}
  // uploadImg(formStatus: string, id: string) {
  //   const currentValue = this.productObj.getValue();

  //   if (currentValue && currentValue.selectedImage) {
  //     let file;

  //     // Check if the selected image is in base64 format
  //     if (currentValue.selectedImage.startsWith('data:image')) {
  //       const filePath = `poductIMG/${currentValue.title}${Date.now()}`;
  //       file = this.base64ToBlob(currentValue.selectedImage);

  //       console.log(filePath);
  //       this.storage
  //         .upload(filePath, file)
  //         .then(() => {
  //           this.toast.loading('Uploading');
  //           this.storage
  //             .ref(filePath)
  //             .getDownloadURL()
  //             .subscribe( (URL) => {
  //               currentValue.productImgPath =  URL;

  //             });
  //         });
  //     }else{
  //     currentValue.productImgPath = currentValue.selectedImage;

  //     }
  //     this.productObj.next(currentValue);

  //     if (formStatus === 'Edit') {
  //       this.updateData(id);
  //    } else {
  //      this.UploadDataToServer();
  //    }


  //   }
  // }
  uploadImg(formStatus: string, id: string) {
    // this.toast.loading('Uploading', {duration: 3000,});

    const currentValue = this.productObj.getValue();

    if (currentValue && currentValue.selectedImage) {
      let file;

      // Check if the selected image is in base64 format
      if (currentValue.selectedImage.startsWith('data:image')) {
        const filePath = `productIMG/${currentValue.title}${Date.now()}`;
        file = this.base64ToBlob(currentValue.selectedImage);

        console.log(filePath);
        this.storage
          .upload(filePath, file)
          .then(() => {
            this.storage
              .ref(filePath)
              .getDownloadURL().pipe(  this.toast.observe({
                loading: 'uploading...',
                success: 'Image Uploaded',
                error: 'Could not save.',
              }))
              .subscribe((URL) => {
                currentValue.productImgPath = URL;
                this.productObj.next(currentValue); // Move here to ensure productImgPath is set before emitting
                if (formStatus === 'Edit') {
                  this.updateData(id);
                } else {
                  this.UploadDataToServer();
                }
              });
          });
      } else {
        currentValue.productImgPath = currentValue.selectedImage;
        this.productObj.next(currentValue); // Move here if the selected image is not in base64 format

        if (formStatus === 'Edit') {
          this.updateData(id);
        } else {
          this.UploadDataToServer();
        }
      }
    }
  }

  base64ToBlob(base64Data: string): Blob {
    const byteString = atob(base64Data.split(',')[1]);
    const mimeType = base64Data.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
        uintArray[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeType });
}

  UploadDataToServer() {
    const currentValue = this.productObj.getValue();
    const data = {
      title:currentValue?.title,
      description:currentValue?.description,
      details:currentValue?.details,
      price:currentValue?.price,
      discount:currentValue?.discount,
      isActive:currentValue?.isActive,
      productImgPath:currentValue?.productImgPath,
      isFeatured:currentValue?.isFeatured,
    }
    const collectionInstance = collection(this.firestore, 'products');
    addDoc(collectionInstance, data).then((res) => {
      this.toast.success('Successfully Added');
      this.router.navigate(['/product-list'])
    });
  }

  loadData() {
    const collectionInstance = collection(this.firestore, 'products');

    return collectionData(collectionInstance, { idField: 'id' });
  }
  loadOneData(id: string) {

    const docInstance = doc(this.firestore, 'products', id);
    return docData(docInstance);
  }
  updateData(id: string) {
    const currentValue = this.productObj.getValue();
    const data = {
      title:currentValue?.title,
      description:currentValue?.description,
      details:currentValue?.details,
      price:currentValue?.price,
      discount:currentValue?.discount,
      isActive:currentValue?.isActive,
      productImgPath:currentValue?.productImgPath,
      isFeatured:currentValue?.isFeatured,
    }
    const docInstance = doc(this.firestore, 'products', id);
    updateDoc(docInstance, data).then(() => {
      this.toast.success('Successfully Updated');
      this.router.navigate(['/product-list'])
    });
  }

  deleteImg(postImgPath: any, id: string) {
    this.storage.storage
      .refFromURL(postImgPath)
      .delete()
      .then(() => {
        //// this line will delete img
        this.deleteData(id);
      });
  }
  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'posts', id);
    deleteDoc(docInstance).then(() => {
      ///this line will delete doc
    });
  }

  markFeatured(id: string, featuredData: object) {
    const docInstance = doc(this.firestore, 'posts', id);
    updateDoc(docInstance, featuredData).then(() => {});
  }
}

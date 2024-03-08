import { Injectable, OnInit } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore } from '@angular/fire/firestore';
import { updateDoc } from '@firebase/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements OnInit {
  categoriesData!:Observable<any>;

  constructor(private firestore:Firestore, private toastr:HotToastService) {
    this.loadData()
   }

  ngOnInit(): void {
  }
  saveData(categoryData:any){
    const collectionInstance = collection(this.firestore, 'categories');
    addDoc(collectionInstance, categoryData).then((docref)=>{

      this.toastr.success('Data Insert Successfully...!')


     }).catch((err)=>{
      console.log(err);

     })
  }
  loadData(){
  const collectionInstance = collection(this.firestore, 'categories');

  this.categoriesData= collectionData(collectionInstance, {idField:'id'})

  return this.categoriesData
  }

  updateData(id:string, EditData:any){
      const docInstance = doc(this.firestore, 'categories', id);
      updateDoc(docInstance, EditData).then((report)=>{
          this.toastr.success('Data Updated Successfully')
      })
  }
  deleteData(id:any){
    const docInstance = doc(this.firestore, 'categories', id);
    deleteDoc(docInstance).then(()=>{
      this.toastr.warning("Data Deleted Successfully")
    })
  }
}

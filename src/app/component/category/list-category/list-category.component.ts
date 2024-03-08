import { Component } from '@angular/core';
import { CategoriesService } from '../../../shared/service/categories.service';
@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss'
})
export class ListCategoryComponent {

  constructor(private categoryService: CategoriesService) {}

  categoryArray!:Array<any>;
formCategiory!:string;
formStatus:string = "Add";
categoryId!:any;


ngOnInit(): void {
  this.categoryService.loadData().subscribe((value)=>{
    this.categoryArray = value


  })

  }
onSubmit(formData:any){
  let categoryData:any ={
    category:formData.value,
  }
  if(this.formStatus=='Add'){
    this.categoryService.saveData(categoryData)
    formData.reset();

  }
  else if(this.formStatus =="Edit"){
    this.categoryService.updateData(this.categoryId, categoryData)
    formData.reset()
    this.formStatus ='Add'
  }

}
onEdit(category:string, id:any){
  this.formCategiory = category
  this.categoryId = id
  this.formStatus = 'Edit'

}

onDelete(id:string){
  this.categoryService.deleteData(id)
}

visible: boolean = false;

showDialog() {
  this.visible = true;
}
}

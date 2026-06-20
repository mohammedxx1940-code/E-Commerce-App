import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IResponse, IResponseSingleData, ISubcategory } from '../../core/model/api.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  http = inject(HttpClient);
  getAllCategories() : Observable<IResponse<ICategory>>{
    return this.http.get<IResponse<ICategory>>(environment.baseURL + '/api/v1/categories');
  }
  getSubCategories(categoryId : string) : Observable<IResponseSingleData<ISubcategory[]>>{
      return this.http.get<IResponseSingleData<ISubcategory[]>>(environment.baseURL 
        + '/api/v1/categories/' + categoryId + '/subcategories');
  }
  getCategoryDetail(id : string) : Observable<IResponseSingleData<ICategory>>{
      return this.http.get<IResponseSingleData<ICategory>>(environment.baseURL + '/api/v1/categories/' 
        + id);
  }
  getSubcategoryDetail(subId : string) : Observable<IResponseSingleData<ISubcategory[]>>{
      return this.http.get<IResponseSingleData<ISubcategory[]>>
      (`${environment.baseURL}/api/v1/subcategories?_id=${subId}`);
  }
}
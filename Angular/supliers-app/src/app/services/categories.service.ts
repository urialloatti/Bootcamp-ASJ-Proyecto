import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CategoryInterface } from '../interfaces/smallCrudsInterfaces';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService implements OnInit {
  constructor(private http: HttpClient) {}

  private URL_API: string = 'http://localhost:3000/categories';
  private counter!: number;

  ngOnInit(): void {
    let subscription = this.getList().subscribe(
      (response) => (this.counter = response.length + 1)
    );
    subscription.unsubscribe();
  }

  public getList(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(this.URL_API).pipe(
      map((list: CategoryInterface[]) => {
        return list.sort((a, b) =>
          a.category.toLowerCase().localeCompare(b.category.toLowerCase())
        );
      })
    );
  }

  public addElement(category: string): Observable<CategoryInterface> {
    let newCategory: CategoryInterface = {
      id: this.counter,
      category: category,
    };
    this.counter++;
    return this.http.post<CategoryInterface>(this.URL_API, newCategory);
  }

  public deleteElement(id: number): Observable<CategoryInterface> {
    return this.http.delete<CategoryInterface>(this.URL_API + '/' + id);
  }
}

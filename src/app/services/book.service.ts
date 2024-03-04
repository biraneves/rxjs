import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item, ResultBooks } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiURI = 'https://www.googleapis.com/books/v1/volumes';

  constructor(private http: HttpClient) {}

  search(searchTerm: string): Observable<ResultBooks> {
    const params: HttpParams = new HttpParams().append('q', searchTerm);

    return this.http.get<ResultBooks>(this.apiURI, { params });
  }
}

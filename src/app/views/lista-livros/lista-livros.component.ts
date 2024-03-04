import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EMPTY, catchError, debounceTime, filter, map, of, switchMap, throwError } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/book-volume-info';
import { Book, Item, ResultBooks } from 'src/app/models/interfaces';
import { BookService } from 'src/app/services/book.service';

const PAUSE = 500;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  searchField: FormControl = new FormControl();
  errorMessage: string = '';
  resultBooks: ResultBooks;
  booksList: Book[];

  constructor(private service: BookService) {}

  // totalOfBooks$ = this.searchField.valueChanges.pipe(
  //   debounceTime(PAUSE),
  //   filter(typedValue => typedValue.length >= 3),
  //   switchMap(typedValue => this.service.search(typedValue)),
  //   map(result => this.resultBooks = result),
  //   catchError(error => {
  //     console.error(error);
  //     return of();
  //   })
  // );

  foundBooks$ = this.searchField.valueChanges.pipe(
    debounceTime(PAUSE),
    filter(typedValue => typedValue.length >= 3),
    switchMap(typedValue => this.service.search(typedValue)),
    map(result => this.resultBooks = result),
    map((result) => result.items ?? []), 
    map(items => this.booksList = this.resultBooksToBooks(items),
    catchError(() => {
      this.errorMessage = 'Ocorreu um erro. Recarregue a aplicação.'
      return EMPTY;
    })
  ));

  resultBooksToBooks(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => new BookVolumeInfo(item));
  }
}

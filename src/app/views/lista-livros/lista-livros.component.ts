import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/book-volume-info';
import { Item } from 'src/app/models/interfaces';
import { BookService } from 'src/app/services/book.service';

const PAUSE = 3000;

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent {
  searchField: FormControl = new FormControl();

  constructor(private service: BookService) {}

  foundBooks$ = this.searchField.valueChanges.pipe(
    debounceTime(PAUSE),
    filter(typedValue => typedValue.length >= 3),
    switchMap(typedValue => this.service.search(typedValue)), 
    map(items => this.resultBooksToBooks(items)
  ));

  resultBooksToBooks(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => new BookVolumeInfo(item));
  }
}

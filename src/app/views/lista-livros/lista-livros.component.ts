import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/book-volume-info';
import { Book, Item } from 'src/app/models/interfaces';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
})
export class ListaLivrosComponent implements OnDestroy {
  listaLivros: Book[];
  searchField: string = '';
  subscription: Subscription;
  book: Book;

  constructor(private service: BookService) {}

  searchBooks() {
    this.subscription = this.service.search(this.searchField).subscribe({
      next: (items) => {
        this.listaLivros = this.resultBooksToBooks(items);
      },
      error: (error) => console.error(error),
    });
  }

  resultBooksToBooks(items: Item[]): BookVolumeInfo[] {
    return items.map((item) => new BookVolumeInfo(item));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Book, BookDetails } from "../interfaces/book.interface";

export interface State {
  books: Book[];
  bookDetails: BookDetails | null;
}

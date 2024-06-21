import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { Book, BookDetails } from "../interfaces/book.interface";
import { State } from "../interfaces/store.interface";
import createPersistedState from "vuex-persistedstate";

const state: State = {
  books: [],
  bookDetails: null,
};

const mutations = {
  setBooks(state: State, books: Book[]) {
    state.books = books;
  },
  addBook(state: State, book: Book) {
    state.books.push(book);
  },
  setBookDetails(state: State, bookDetails: BookDetails) {
    state.bookDetails = bookDetails;
  },
};

const actions = {
  initializeBooks({ commit }: any, books: Book[]) {
    commit("setBooks", books);
  },
  addBook({ commit }: any, book: Book) {
    commit("addBook", book);
  },
  setBookDetails({ commit }: any, bookDetails: BookDetails) {
    commit("setBookDetails", bookDetails);
  },
};

const getters = {
  books: (state: State): Book[] => state.books,
  bookDetails: (state: State): BookDetails | null => state.bookDetails,
};
const plugins = [createPersistedState({ storage: window.sessionStorage })];

export type Store = Omit<VuexStore<State>, "commit" | "dispatch"> & {
  commit<
    K extends keyof typeof mutations,
    P extends Parameters<typeof mutations[K]>[1]
  >(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<typeof mutations[K]>;
} & {
  dispatch<K extends keyof typeof actions>(
    key: K,
    payload?: Parameters<typeof actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<typeof actions[K]>;
};

// Create store
export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
  plugins,
});

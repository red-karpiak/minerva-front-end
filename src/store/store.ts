import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import { Book } from "../interfaces/book.interface";
import { State } from "../interfaces/store.interface";

const state: State = {
  books: [],
};

const mutations = {
  setBooks(state: State, books: Book[]) {
    state.books = books;
  },
  addBook(state: State, book: Book) {
    state.books.push(book);
  },
};

const actions = {
  initializeBooks({ commit }: any, books: Book[]) {
    commit("setBooks", books);
  },
  addBook({ commit }: any, book: Book) {
    commit("addBook", book);
  },
};

const getters = {
  books: (state: State): Book[] => state.books,
};

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
});

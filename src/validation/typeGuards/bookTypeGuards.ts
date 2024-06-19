import { Book, BookDetails } from "@/interfaces/book.interface";

export const isBook = (data: any): data is Book => {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.authors === "string" &&
    typeof data.image === "string"
  );
};

export const isBookDetails = (data: any): data is BookDetails => {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.author === "string"
    // Add other property checks as needed
  );
};

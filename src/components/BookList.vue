<template>
  <div class="scrollable-container">
    <ion-content role="feed">
      <ion-list>
        <BookListItem
          v-for="book in books"
          :key="book.id"
          :book="book"
          @select="handleSelect"
        />
      </ion-list>
    </ion-content>
  </div>
</template>

<script setup lang="ts">
import BookListItem from "@/components/BookListItem.vue";
import { IonList, IonContent } from "@ionic/vue";
import { Book, BookDetails } from "@/interfaces/book.interface";
import { isBook } from "@/validation/typeGuards/bookTypeGuards";
import axios from "axios";
import { PropType, ref, Ref } from "vue";

const props = defineProps({
  books: {
    type: Object as PropType<Book[]>,
    required: true,
  },
  selectAction: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select"]);

const selectedBook: Ref<Book> = ref({} as Book);

const handleSelect = async (id: string) => {
  if (props.selectAction === "bookDetails") {
    await getDetails(id);
    close();
  } else if (props.selectAction === "addToLibrary") {
    await getMinimal(id);
    close();
  }
};

const getMinimal = async (id: string) => {
  const query = `${import.meta.env.VITE_HOST}/api/books/volumes/${id}/true`;

  try {
    const response = await axios.get<Book>(query);
    if (isBook(response.data)) {
      selectedBook.value = response.data as Book;
      console.log(`Found ${selectedBook.value.title}.`);
      emit("select", selectedBook.value);
    } else {
      console.error("Unexpected response structure:", response.data);
    }
  } catch (error) {
    console.error(`Error attempting to get book with id: ${id}.`, error);
  }
};

const getDetails = async (id: string) => {
  console.log("Getting details for book with id:", id);
  const query = `${import.meta.env.VITE_HOST}/api/books/volumes/${id}`;
  try {
    const response = await axios.get<BookDetails>(query);
    if (isBook(response.data)) {
      const details = response.data as BookDetails;
      console.log(`Retrieved details for ${details.title}.`);
      emit("select", details);
    } else {
      console.error("Unexpected response structure:", response.data);
    }
  } catch (error) {
    console.error(`Error attempting to get book with id: ${id}.`, error);
  }
};
</script>

<style scoped>
.scrollable-container {
  flex: 1;
  overflow-y: auto;
}

ion-list {
  flex: 1;
  overflow-y: auto;
}

ion-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

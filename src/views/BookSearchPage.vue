<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="modal-container">
        <SearchBar @search="handleSearch"></SearchBar>
        <BookList
          v-if="results.length > 0"
          :books="results"
          selectAction="addToLibrary"
          @select="close"
        ></BookList>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/vue";
import { Ref, ref } from "vue";
import axios from "axios";
import SearchBar from "../components/SearchBar.vue";
import { Book } from "../interfaces/book.interface";
import BookList from "../components/BookList.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const results: Ref<Book[]> = ref([]);
const store = useStore();
const handleSearch = async (value: string) => {
  const query = `${
    import.meta.env.VITE_HOST
  }/api/books/volumes?q=${encodeURIComponent(value)}`;
  console.log(query);
  //client side error handling
  try {
    const response = await axios.get<{ results: Book[] }>(query);
    if (Array.isArray(response.data)) {
      results.value = response.data;
      console.log(`Found ${results.value.length} results:`);
    } else {
      console.error("Unexpected response structure:", response.data);
    }
  } catch (error) {
    console.error("Error performing search:", error);
  }
};
const close = (value: Book) => {
  store.dispatch("addBook", value);
  router.push("/tabs/tab2");
};
</script>
<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

SearchBar {
  flex: 1;
}
</style>

<template>
  <ion-modal :is-open="true">
    <ion-button @click="closeModal"></ion-button>
    <SearchBar @search="handleSearch"></SearchBar>
    <ion-list v-if="results.length > 0">
      <ion-item v-for="result in results" :key="result.id">{{
        result.title
      }}</ion-item>
    </ion-list>
  </ion-modal>
</template>

<script setup lang="ts">
import { IonModal, IonList, IonItem, IonButton } from "@ionic/vue";
import { ref, Ref } from "vue";
import axios from "axios";
import SearchBar from "@/components/SearchBar.vue";
import { Book } from "@/interfaces/book.interface";
const emit = defineEmits(["close"]);
const results: Ref<Book[]> = ref([]);

const handleSearch = async (value: string) => {
  console.log("Search value:", value);
  console.log(import.meta.env.VITE_HOST);
  const query = `${
    import.meta.env.VITE_HOST
  }/api/books/volumes?q=${encodeURIComponent(value)}`;
  console.log(query);
  //client side error handling
  try {
    const response = await axios.get<{ results: Book[] }>(query);
    results.value = response.data.results;
  } catch (error) {
    console.error("Error performing search:", error);
  }
};
const closeModal = () => {
  emit("close");
};
</script>

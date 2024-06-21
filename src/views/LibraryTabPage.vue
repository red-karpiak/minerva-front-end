<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Library</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="navigateToSearch">
            <ion-icon :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="modal-container">
        <BookList
          v-if="books.length > 0"
          :books="books"
          selectAction="bookDetails"
          @select="navigateToBookDetails"
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
  IonButton,
  IonButtons,
  IonIcon,
} from "@ionic/vue";
import { search } from "ionicons/icons";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import BookList from "../components/BookList.vue";
import { BookDetails } from "@/interfaces/book.interface";
import { Store } from "../store/store";

const router = useRouter();
const store = useStore<Store>();
const books = computed(() => store.getters.books);

const navigateToSearch = () => {
  router.push("/bookSearch");
};
const navigateToBookDetails = (book: BookDetails) => {
  console.log("Navigating to book details:", book.title);
  store.commit("setBookDetails", book);
  router.push("/bookDetails");
};
</script>
<style scoped>
.modal-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>

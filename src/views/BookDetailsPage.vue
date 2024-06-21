<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ bookDetails.title }}</ion-title>
        <ion-buttons slot="end">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" id="main-content"> </ion-content>
    <ion-menu side="end" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button @click="addBookToReadingList">
            <ion-label>Add To Reading List</ion-label>
          </ion-item>
          <ion-item button @click="deleteBook">
            <ion-label>Delete</ion-label>
          </ion-item>
          <ion-item button @click="navigateToLibrary">
            <ion-label>Library</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  </ion-page>
</template>
<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonButtons,
  IonList,
  IonLabel,
  IonItem,
} from "@ionic/vue";

import { useRouter } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const id = router.currentRoute.value.params.id;
const bookDetails = computed(() => store.getters.bookDetails);

const navigateToLibrary = () => {
  console.log("Navigating to library page.");
  router.go(-1);
};

const deleteBook = () => {
  console.log("Deleting book:", id);
};

const addBookToReadingList = () => {
  console.log("Adding book to reading list:", id);
};
</script>

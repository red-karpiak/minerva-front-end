<template>
  <ion-content>
    <ion-searchbar inputmode="search" v-model="searchValue"></ion-searchbar>
    <ion-button @click="search">Search</ion-button>
  </ion-content>
</template>

<script setup lang="ts">
import { IonSearchbar, IonContent, IonButton } from "@ionic/vue";
import { ref } from "vue";
const searchValue = ref("");
const emit = defineEmits(["search"]);

const search = () => {
  console.log(`Searching for item: ${searchValue.value}`);
  emit("search", searchValue.value);
};
</script>

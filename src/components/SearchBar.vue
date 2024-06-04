<template>
  <ion-searchbar
    inputmode="search"
    @keydown.enter="search"
    v-model="searchValue"
  ></ion-searchbar>
</template>

<script setup lang="ts">
import { IonSearchbar } from "@ionic/vue";
import { ref } from "vue";
const searchValue = ref("");
const emit = defineEmits(["search"]);

const search = () => {
  console.log(`Searching for item: ${searchValue.value}`);
  emit("search", searchValue.value);
};
</script>

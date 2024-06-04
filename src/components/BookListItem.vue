<template>
  <ion-item @click="select" role="article">
    <ion-thumbnail slot="start">
      <ion-img :src="props.book.thumbnail" :alt="props.book.title"></ion-img>
    </ion-thumbnail>
    <ion-label>
      <h4>{{ props.book.title }}</h4>
      <p>{{ props.book.authors }}</p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonThumbnail, IonLabel, IonImg } from "@ionic/vue";
import { PropType } from "vue";
import { Book } from "@/interfaces/book.interface";
const emit = defineEmits(["select"]);
const props = defineProps({
  book: {
    type: Object as PropType<Book>,
    required: true,
  },
});

console.log("BookListItem props:", props.book);
const select = () => {
  console.log("Selecting book:", props.book.id);
  emit("select", props.book.id);
};
</script>

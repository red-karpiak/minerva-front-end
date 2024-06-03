<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Library</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="isModalOpen = true">
            <ion-icon :icon="search"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Library</ion-title>
        </ion-toolbar>
      </ion-header>
      <ExploreContainer name="Library page" />
    </ion-content>
    <SearchModal v-if="isModalOpen" @close="isModalOpen = false"></SearchModal>
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
import ExploreContainer from "@/components/ExploreContainer.vue";
import SearchModal from "@/components/modals/SearchModal.vue";
import { Ref, ref } from "vue";
import { search } from "ionicons/icons";
const isModalOpen: Ref<boolean> = ref(false);
</script>

<template>
    <v-dialog v-model="isDialogOpen" max-width="600px">
      <template #activator="{ props }">
        <v-btn color="primary" v-bind="props">Add Asset</v-btn>
      </template>
      <v-card>
        <v-card-title>Add New Asset</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveAsset">
            <v-text-field
              v-model="newAsset.name"
              label="Name"
              required
            ></v-text-field>
            <v-text-field
              v-model="newAsset.tickerSymbol"
              label="Ticker Symbol"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="newAsset.shares"
              label="Shares"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="newAsset.shareValue"
              label="Share Value"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="newAsset.tax.capitalGains"
              label="Capital Gains Tax"
              type="number"
              required
            ></v-text-field>
            <v-text-field
              v-model.number="newAsset.tax.withholding"
              label="Withholding Tax"
              type="number"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn color="primary" @click="saveAsset">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { useAssetsStore } from '@/stores/assets';
  import type { Asset } from '@/models/Asset';
  
  // Reactive state for the dialog visibility
  const isDialogOpen = ref(false);
  
  // Reactive state for the new asset
  const newAsset = reactive<Asset>({
    id: Date.now(),
    name: '',
    tickerSymbol: '',
    shares: 0,
    shareValue: 0,
    tax: {
      capitalGains: 0,
      withholding: 0,
    },
  });
  
  // Access the assets store
  const assetsStore = useAssetsStore();
  
  // Close the dialog
  const closeDialog = () => {
    isDialogOpen.value = false;
  };
  
  // Save the asset directly into the store and reset the form
  const saveAsset = () => {
    assetsStore.addAsset({ ...newAsset });
    closeDialog();
    resetForm();
  };
  
  // Reset the form fields
  const resetForm = () => {
    newAsset.id = Date.now();
    newAsset.name = '';
    newAsset.tickerSymbol = '';
    newAsset.shares = 0;
    newAsset.shareValue = 0;
    newAsset.tax.capitalGains = 0;
    newAsset.tax.withholding = 0;
  };
  </script>
<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Assets</h1>
          <AddAssetDialog />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :items="assetsStore.assets"
            :headers="headers"
            item-value="id"
            class="elevation-1"
          >
            <template #item.totalValue="{ item }">
              ${{ (item.shares * item.shareValue).toFixed(2) }}
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { useAssetsStore } from '@/stores/assets';
  import AddAssetDialog from '@/components/AddAssetDialog.vue';
  
  const assetsStore = useAssetsStore();
  
  const headers = [
    { title: 'Name', value: 'name' },
    { title: 'Ticker Symbol', value: 'tickerSymbol' },
    { title: 'Shares', value: 'shares' },
    { title: 'Share Value', value: 'shareValue' },
    { title: 'Total Value', value: 'totalValue' },
  ];
  </script>
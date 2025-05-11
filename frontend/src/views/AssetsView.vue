<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1>Assets</h1>
          <v-form @submit.prevent="addNewAsset">
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
            <v-btn type="submit" color="primary" class="mt-4">Add Asset</v-btn>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-list>
            <v-list-item
              v-for="asset in assets"
              :key="asset.id"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ asset.name }} ({{ asset.tickerSymbol }})
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ asset.shares }} shares @ ${{ asset.shareValue }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { useAssetsStore } from '@/stores/assets';
  import type { Asset } from '@/models/Asset';
  
  export default defineComponent({
    name: 'AssetsView',
    setup() {
      const assetsStore = useAssetsStore();
      const newAsset = reactive<Asset>({
        id: 1, // Unique ID for the asset
        name: '',
        tickerSymbol: '',
        shares: 0,
        shareValue: 0,
        tax: {
          capitalGains: 0,
          withholding: 0,
        },
      });
  
      const addNewAsset = () => {
        assetsStore.addAsset({ ...newAsset });
        newAsset.id =  2 // Date.now().toString(); // Reset ID for the next asset
        newAsset.name = '';
        newAsset.tickerSymbol = '';
        newAsset.shares = 0;
        newAsset.shareValue = 0;
        newAsset.tax.capitalGains = 0;
        newAsset.tax.withholding = 0;
      };
  
      return {
        assets: assetsStore.assets,
        newAsset,
        addNewAsset,
      };
    },
  });
</script>
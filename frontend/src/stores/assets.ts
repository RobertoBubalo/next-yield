import { defineStore } from 'pinia';
import type { Asset } from '../models/Asset';

export const useAssetsStore = defineStore('assets', {
  state: () => ({
    assets: [] as Asset[],
  }),
  actions: {
    addAsset(asset: Asset) {
      this.assets.push(asset);
    },
  },
});
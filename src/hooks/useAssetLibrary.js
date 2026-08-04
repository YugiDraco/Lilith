import { useState, useMemo } from 'react';
import { ASSET_CATALOG, getAssetById } from '../data/assetsCatalog';

export function useAssetLibrary(category = 'hair') {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('all');

  const assets = useMemo(() => {
    return ASSET_CATALOG[category] || [];
  }, [category]);

  const filteredAssets = useMemo(() => {
    return assets.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prompt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = activeTag === 'all' || (item.tags && item.tags.includes(activeTag));
      return matchesSearch && matchesTag;
    });
  }, [assets, searchTerm, activeTag]);

  const allTags = useMemo(() => {
    const set = new Set(['all']);
    assets.forEach(item => {
      if (item.tags) item.tags.forEach(t => set.add(t));
    });
    return Array.from(set);
  }, [assets]);

  return {
    assets: filteredAssets,
    totalCount: assets.length,
    searchTerm,
    setSearchTerm,
    activeTag,
    setActiveTag,
    allTags,
    getAsset: (id) => getAssetById(category, id)
  };
}

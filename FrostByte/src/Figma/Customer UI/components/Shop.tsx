import React, { useState } from 'react';
import { Search, Filter, Grid, List, Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { products } from '../data/mockData';

interface ShopProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Shop({ onNavigate }: ShopProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'CPU', 'GPU', 'RAM', 'Storage', 'Motherboard', 'PSU', 'Case'];
  const brands = ['All', 'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Samsung', 'ASUS', 'NZXT'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1>Shop Products</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' : 'bg-[#2F353F]'}`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' : 'bg-[#2F353F]'}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-4">
          {/* Search */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#E7ECF1]/40" size={16} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2F353F] border border-[#3A4047] rounded pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
            <h4 className="mb-3 flex items-center gap-2">
              <Filter size={16} />
              Category
            </h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]'
                      : 'hover:bg-[#2F353F]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4">
            <h4 className="mb-3">Brand</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                    selectedBrand === brand
                      ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]'
                      : 'hover:bg-[#2F353F]'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-4 mb-4 flex items-center justify-between">
            <div className="text-sm text-[#E7ECF1]/60">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#E7ECF1]/60">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#2F353F] border border-[#3A4047] rounded px-3 py-1.5 text-sm focus:outline-none focus:border-[#5EC8FF]"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#171B21] border border-[#3A4047] rounded overflow-hidden hover:border-[#5EC8FF]/30 transition-all group"
                >
                  <div className="relative aspect-square bg-[#2F353F] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.stock < 10 && (
                      <span className="absolute top-2 left-2 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
                        Low Stock
                      </span>
                    )}
                    <div className="absolute inset-0 bg-[#0E1114]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button className="p-2 bg-[#171B21] rounded hover:bg-[#5EC8FF] hover:text-[#0E1114] transition-colors">
                        <Heart size={18} />
                      </button>
                      <button
                        onClick={() => onNavigate('product-detail', { productId: product.id })}
                        className="p-2 bg-[#171B21] rounded hover:bg-[#5EC8FF] hover:text-[#0E1114] transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button className="p-2 bg-[#171B21] rounded hover:bg-[#5EC8FF] hover:text-[#0E1114] transition-colors">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-[#E7ECF1]/60 mb-1">{product.brand}</div>
                    <h4 className="mb-2 line-clamp-2 cursor-pointer hover:text-[#5EC8FF]" onClick={() => onNavigate('product-detail', { productId: product.id })}>
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 mb-3">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{product.rating}</span>
                      <span className="text-xs text-[#E7ECF1]/60">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg text-[#5EC8FF]">₱{product.price.toLocaleString()}</div>
                      <div className="text-xs text-[#E7ECF1]/60">{product.stock} in stock</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-[#171B21] border border-[#3A4047] rounded p-4 hover:border-[#5EC8FF]/30 transition-all flex gap-4"
                >
                  <div className="w-32 h-32 bg-[#2F353F] rounded overflow-hidden flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs text-[#E7ECF1]/60 mb-1">{product.brand} • {product.category}</div>
                        <h4 className="mb-2 cursor-pointer hover:text-[#5EC8FF]" onClick={() => onNavigate('product-detail', { productId: product.id })}>
                          {product.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{product.rating}</span>
                          <span className="text-xs text-[#E7ECF1]/60">({product.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl text-[#5EC8FF] mb-1">₱{product.price.toLocaleString()}</div>
                        <div className="text-xs text-[#E7ECF1]/60">{product.stock} in stock</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button className="px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                        Add to Cart
                      </button>
                      <button className="p-2 bg-[#2F353F] rounded hover:bg-[#3A4047] transition-colors">
                        <Heart size={18} />
                      </button>
                      <button
                        onClick={() => onNavigate('product-detail', { productId: product.id })}
                        className="px-4 py-2 bg-[#2F353F] rounded text-sm hover:bg-[#3A4047] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

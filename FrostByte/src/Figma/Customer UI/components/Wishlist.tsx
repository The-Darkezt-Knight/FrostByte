import React from 'react';
import { Heart, ShoppingCart, X, AlertCircle } from 'lucide-react';
import { products } from '../data/mockData';

interface WishlistProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Wishlist({ onNavigate }: WishlistProps) {
  const wishlistProducts = products.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>My Wishlist</h1>
        <div className="text-sm text-[#E7ECF1]/60">{wishlistProducts.length} items</div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#171B21] border border-[#3A4047] rounded overflow-hidden hover:border-[#5EC8FF]/30 transition-all"
          >
            <div className="relative">
              <div className="aspect-square bg-[#2F353F] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => onNavigate('product-detail', { productId: product.id })}
                />
              </div>
              <button className="absolute top-2 right-2 p-2 bg-[#171B21]/90 rounded hover:bg-red-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
              {product.stock < 10 && (
                <div className="absolute bottom-2 left-2 right-2 bg-yellow-500/90 text-[#0E1114] text-xs px-2 py-1 rounded flex items-center gap-1">
                  <AlertCircle size={14} />
                  Low Stock: {product.stock} left
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="text-xs text-[#E7ECF1]/60 mb-1">{product.brand}</div>
              <h4
                className="mb-3 line-clamp-2 cursor-pointer hover:text-[#5EC8FF]"
                onClick={() => onNavigate('product-detail', { productId: product.id })}
              >
                {product.name}
              </h4>
              <div className="text-lg text-[#5EC8FF] mb-3">₱{product.price.toLocaleString()}</div>
              <button className="w-full bg-[#5EC8FF] text-[#0E1114] rounded py-2 flex items-center justify-center gap-2 hover:bg-[#5EC8FF]/90 transition-colors">
                <ShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {wishlistProducts.length === 0 && (
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-12 text-center">
          <Heart size={48} className="mx-auto mb-4 text-[#E7ECF1]/20" />
          <h3 className="mb-2">Your wishlist is empty</h3>
          <p className="text-[#E7ECF1]/60 mb-6">Start adding products you love!</p>
          <button
            onClick={() => onNavigate('shop')}
            className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
}

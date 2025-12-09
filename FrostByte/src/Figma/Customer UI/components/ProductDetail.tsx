import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, ShoppingCart, Minus, Plus, Share2, Package, Shield, Truck } from 'lucide-react';
import { products } from '../data/mockData';

interface ProductDetailProps {
  productId: number;
  onNavigate: (page: string, params?: any) => void;
}

export function ProductDetail({ productId, onNavigate }: ProductDetailProps) {
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('shop')}
        className="flex items-center gap-2 text-[#E7ECF1]/60 hover:text-[#5EC8FF] transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Shop
      </button>

      {/* Product Main */}
      <div className="grid grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-8">
          <div className="aspect-square bg-[#2F353F] rounded overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-[#2F353F] rounded overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#5EC8FF] transition-all">
                <img
                  src={product.image}
                  alt={`${product.name} ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-[#E7ECF1]/60 mb-2">{product.brand} • {product.category}</div>
            <h1 className="mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={star <= Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-[#3A4047]'}
                  />
                ))}
              </div>
              <span className="text-sm">{product.rating}</span>
              <span className="text-sm text-[#E7ECF1]/60">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price & Stock */}
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
            <div className="flex items-baseline gap-2 mb-3">
              <div className="text-3xl text-[#5EC8FF]">₱{product.price.toLocaleString()}</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Package size={16} className="text-green-400" />
              <span className={product.stock < 10 ? 'text-yellow-400' : 'text-green-400'}>
                {product.stock} units in stock
              </span>
            </div>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm">Quantity:</span>
              <div className="flex items-center border border-[#3A4047] rounded">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-[#2F353F] transition-colors"
                >
                  <Minus size={16} />
                </button>
                <div className="px-4 py-2 border-x border-[#3A4047] min-w-[60px] text-center">{quantity}</div>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 hover:bg-[#2F353F] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-[#5EC8FF] text-[#0E1114] rounded py-3 flex items-center justify-center gap-2 hover:bg-[#5EC8FF]/90 transition-colors">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button className="p-3 bg-[#171B21] border border-[#3A4047] rounded hover:border-[#5EC8FF] hover:text-[#5EC8FF] transition-colors">
                <Heart size={18} />
              </button>
              <button className="p-3 bg-[#171B21] border border-[#3A4047] rounded hover:border-[#5EC8FF] hover:text-[#5EC8FF] transition-colors">
                <Share2 size={18} />
              </button>
            </div>

            <button className="w-full bg-[#171B21] border border-[#3A4047] rounded py-3 text-sm hover:border-[#5EC8FF] hover:text-[#5EC8FF] transition-colors">
              Buy Now
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#171B21] border border-[#3A4047] rounded p-3 text-center">
              <Truck size={20} className="mx-auto mb-2 text-[#5EC8FF]" />
              <div className="text-xs">Free Delivery</div>
            </div>
            <div className="bg-[#171B21] border border-[#3A4047] rounded p-3 text-center">
              <Shield size={20} className="mx-auto mb-2 text-[#5EC8FF]" />
              <div className="text-xs">Warranty</div>
            </div>
            <div className="bg-[#171B21] border border-[#3A4047] rounded p-3 text-center">
              <Package size={20} className="mx-auto mb-2 text-[#5EC8FF]" />
              <div className="text-xs">7-Day Return</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#171B21] border border-[#3A4047] rounded">
        <div className="border-b border-[#3A4047] flex">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-sm ${
              activeTab === 'specs'
                ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]'
                : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
            }`}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-sm ${
              activeTab === 'reviews'
                ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]'
                : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
            }`}
          >
            Ratings & Reviews ({product.reviews})
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="text-xs text-[#E7ECF1]/60 mb-1 uppercase tracking-wide">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-sm">{value}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#2F353F] border border-[#3A4047] rounded p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm mb-1">Anonymous User</div>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-[#E7ECF1]/60">2 days ago</div>
                  </div>
                  <p className="text-sm text-[#E7ECF1]/80">
                    Excellent product! Works perfectly as expected. Installation was straightforward and performance is outstanding.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h3 className="mb-4">Related Products</h3>
          <div className="grid grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                className="bg-[#171B21] border border-[#3A4047] rounded overflow-hidden hover:border-[#5EC8FF]/30 transition-all cursor-pointer"
                onClick={() => onNavigate('product-detail', { productId: relProduct.id })}
              >
                <div className="aspect-square bg-[#2F353F] overflow-hidden">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="text-sm mb-2 line-clamp-2">{relProduct.name}</div>
                  <div className="text-sm text-[#5EC8FF]">₱{relProduct.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

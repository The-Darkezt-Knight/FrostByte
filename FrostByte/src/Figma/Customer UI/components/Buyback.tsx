import React, { useState } from 'react';
import { DollarSign, Plus, Upload, CheckCircle, Clock, X } from 'lucide-react';
import { buybackRequests } from '../data/mockData';

interface BuybackProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Buyback({ onNavigate }: BuybackProps) {
  const [showSubmit, setShowSubmit] = useState(false);
  const [componentType, setComponentType] = useState('');
  const [productName, setProductName] = useState('');
  const [condition, setCondition] = useState('');

  const componentTypes = ['CPU', 'GPU', 'RAM', 'Motherboard', 'Storage', 'PSU', 'Case', 'Monitor', 'Peripherals'];
  const conditions = [
    { value: 'excellent', label: 'Excellent', desc: 'Like new, no visible wear' },
    { value: 'good', label: 'Good', desc: 'Minor signs of use, fully functional' },
    { value: 'fair', label: 'Fair', desc: 'Visible wear, but works properly' },
    { value: 'poor', label: 'Poor', desc: 'Heavy wear or minor defects' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-400';
      case 'Offer Received':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-yellow-500/10 text-yellow-400';
    }
  };

  const handleSubmit = () => {
    setShowSubmit(false);
    setComponentType('');
    setProductName('');
    setCondition('');
  };

  if (showSubmit) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Submit Item for Buyback</h1>
          <button
            onClick={() => setShowSubmit(false)}
            className="px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="bg-[#171B21] border border-[#3A4047] rounded p-6 space-y-6">
          {/* Component Type */}
          <div>
            <label className="block text-sm mb-3">Component Type *</label>
            <div className="grid grid-cols-3 gap-3">
              {componentTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setComponentType(type)}
                  className={`px-4 py-3 rounded border text-sm transition-all ${
                    componentType === type
                      ? 'border-[#5EC8FF] bg-[#5EC8FF]/10 text-[#5EC8FF]'
                      : 'border-[#3A4047] hover:border-[#5EC8FF]/50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <label className="block text-sm mb-2">Product Name *</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., NVIDIA GeForce RTX 3080 Ti"
              className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Purchase Date (Optional)</label>
              <input
                type="date"
                className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Original Price (Optional)</label>
              <input
                type="number"
                placeholder="₱ 0.00"
                className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF]"
              />
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm mb-3">Condition *</label>
            <div className="grid grid-cols-2 gap-3">
              {conditions.map((cond) => (
                <button
                  key={cond.value}
                  onClick={() => setCondition(cond.value)}
                  className={`p-4 rounded border text-left transition-all ${
                    condition === cond.value
                      ? 'border-[#5EC8FF] bg-[#5EC8FF]/5'
                      : 'border-[#3A4047] hover:border-[#5EC8FF]/50'
                  }`}
                >
                  <div className="text-sm mb-1">{cond.label}</div>
                  <div className="text-xs text-[#E7ECF1]/60">{cond.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Photos */}
          <div>
            <label className="block text-sm mb-3">Product Photos *</label>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className="aspect-square bg-[#2F353F] border-2 border-dashed border-[#3A4047] rounded hover:border-[#5EC8FF] transition-colors flex items-center justify-center"
                >
                  <Upload size={24} className="text-[#E7ECF1]/40" />
                </button>
              ))}
            </div>
            <p className="text-xs text-[#E7ECF1]/60 mt-2">Upload clear photos from multiple angles (minimum 2 photos required)</p>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm mb-2">Additional Information (Optional)</label>
            <textarea
              rows={4}
              placeholder="Warranty status, included accessories, known issues, etc."
              className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF] resize-none"
            />
          </div>

          {/* Info Box */}
          <div className="bg-[#5EC8FF]/5 border border-[#5EC8FF]/30 rounded p-4">
            <h4 className="text-[#5EC8FF] mb-2">How it works</h4>
            <ul className="text-sm text-[#E7ECF1]/80 space-y-1">
              <li>1. Submit your item details and photos</li>
              <li>2. Our team will review and provide an offer within 24-48 hours</li>
              <li>3. Accept the offer and schedule a pickup</li>
              <li>4. Get paid via your preferred payment method</li>
            </ul>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!componentType || !productName || !condition}
            className="w-full bg-[#5EC8FF] text-[#0E1114] rounded py-3 hover:bg-[#5EC8FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Appraisal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Sell Your PC Parts</h1>
        <button
          onClick={() => setShowSubmit(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors"
        >
          <Plus size={18} />
          Submit New Item
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
        <div className="flex items-start gap-4">
          <DollarSign size={32} className="text-[#5EC8FF] flex-shrink-0" />
          <div>
            <h3 className="mb-2">Turn your old PC parts into cash</h3>
            <p className="text-sm text-[#E7ECF1]/60">
              We buy used components in good condition. Get a fair price and free pickup service. Perfect for upgrading your rig!
            </p>
          </div>
        </div>
      </div>

      {/* Buyback Requests */}
      <div className="space-y-4">
        <h3>My Buyback Requests</h3>
        {buybackRequests.map((request) => (
          <div key={request.id} className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-4 border-b border-[#3A4047]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{request.productName}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#E7ECF1]/60">
                    <span>{request.id}</span>
                    <span>•</span>
                    <span>{request.componentType}</span>
                    <span>•</span>
                    <span>Submitted {request.submittedDate}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-3">
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">Condition</div>
                  <div className="text-sm capitalize">{request.condition}</div>
                </div>
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-3">
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">Estimated Value</div>
                  <div className="text-sm">₱{request.estimatedValue}</div>
                </div>
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-3">
                  <div className="text-xs text-[#E7ECF1]/60 mb-1">Photos Uploaded</div>
                  <div className="text-sm">{request.images} images</div>
                </div>
              </div>

              {request.status === 'Offer Received' && request.offer && (
                <div className="bg-[#5EC8FF]/5 border border-[#5EC8FF]/30 rounded p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xs text-[#E7ECF1]/60 mb-1">Our Offer</div>
                      <div className="text-2xl text-[#5EC8FF]">₱{request.offer.toLocaleString()}</div>
                    </div>
                    <CheckCircle size={32} className="text-[#5EC8FF]" />
                  </div>
                  <p className="text-xs text-[#E7ECF1]/60">Offer valid for 7 days. Free pickup available.</p>
                </div>
              )}

              {request.status === 'Completed' && request.paidAmount && (
                <div className="bg-green-500/5 border border-green-500/30 rounded p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#E7ECF1]/60 mb-1">Payment Completed</div>
                      <div className="text-xl text-green-400">₱{request.paidAmount.toLocaleString()}</div>
                    </div>
                    <CheckCircle size={24} className="text-green-400" />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {request.status === 'Offer Received' && (
                  <>
                    <button className="flex-1 bg-[#5EC8FF] text-[#0E1114] rounded py-2 text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                      Accept Offer
                    </button>
                    <button className="flex-1 bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                      Decline
                    </button>
                  </>
                )}
                {request.status === 'Under Review' && (
                  <button className="flex-1 bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors flex items-center justify-center gap-2">
                    <Clock size={16} />
                    Waiting for Appraisal
                  </button>
                )}
                {request.status === 'Completed' && (
                  <button className="flex-1 bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                    View Receipt
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

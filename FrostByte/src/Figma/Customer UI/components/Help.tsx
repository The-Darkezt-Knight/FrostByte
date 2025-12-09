import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, Send } from 'lucide-react';
import { faqData } from '../data/mockData';

interface HelpProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Help({ onNavigate }: HelpProps) {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'faq' | 'contact' | 'ticket'>('faq');

  const toggleFaq = (question: string) => {
    setExpandedFaq(expandedFaq === question ? null : question);
  };

  return (
    <div className="space-y-6">
      <h1>Help Center</h1>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#3A4047]">
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-6 py-3 text-sm transition-all ${
            activeTab === 'faq'
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]'
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Frequently Asked Questions
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 text-sm transition-all ${
            activeTab === 'contact'
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]'
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Contact Us
        </button>
        <button
          onClick={() => setActiveTab('ticket')}
          className={`px-6 py-3 text-sm transition-all ${
            activeTab === 'ticket'
              ? 'border-b-2 border-[#5EC8FF] text-[#5EC8FF]'
              : 'text-[#E7ECF1]/60 hover:text-[#E7ECF1]'
          }`}
        >
          Submit a Ticket
        </button>
      </div>

      {/* FAQ */}
      {activeTab === 'faq' && (
        <div className="space-y-6">
          {faqData.map((category) => (
            <div key={category.category} className="bg-[#171B21] border border-[#3A4047] rounded">
              <div className="p-4 border-b border-[#3A4047]">
                <h3>{category.category}</h3>
              </div>
              <div className="divide-y divide-[#3A4047]">
                {category.questions.map((item, idx) => (
                  <div key={idx}>
                    <button
                      onClick={() => toggleFaq(`${category.category}-${idx}`)}
                      className="w-full p-4 flex items-start justify-between text-left hover:bg-[#2F353F]/50 transition-colors"
                    >
                      <span className="text-sm pr-4">{item.q}</span>
                      {expandedFaq === `${category.category}-${idx}` ? (
                        <ChevronUp size={18} className="flex-shrink-0 text-[#5EC8FF]" />
                      ) : (
                        <ChevronDown size={18} className="flex-shrink-0 text-[#E7ECF1]/40" />
                      )}
                    </button>
                    {expandedFaq === `${category.category}-${idx}` && (
                      <div className="px-4 pb-4 text-sm text-[#E7ECF1]/70 border-t border-[#3A4047] pt-4">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contact */}
      {activeTab === 'contact' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-[#171B21] border border-[#3A4047] rounded p-6 text-center hover:border-[#5EC8FF]/30 transition-all">
            <div className="w-16 h-16 bg-[#5EC8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle size={32} className="text-[#5EC8FF]" />
            </div>
            <h4 className="mb-2">Live Chat</h4>
            <p className="text-sm text-[#E7ECF1]/60 mb-4">
              Chat with our support team in real-time
            </p>
            <button className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-[#171B21] border border-[#3A4047] rounded p-6 text-center hover:border-[#5EC8FF]/30 transition-all">
            <div className="w-16 h-16 bg-[#5EC8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail size={32} className="text-[#5EC8FF]" />
            </div>
            <h4 className="mb-2">Email Support</h4>
            <p className="text-sm text-[#E7ECF1]/60 mb-4">
              We'll respond within 24 hours
            </p>
            <a
              href="mailto:support@techstore.com"
              className="inline-block px-6 py-2 bg-[#2F353F] border border-[#3A4047] rounded hover:border-[#5EC8FF] transition-colors"
            >
              Send Email
            </a>
          </div>

          <div className="bg-[#171B21] border border-[#3A4047] rounded p-6 text-center hover:border-[#5EC8FF]/30 transition-all">
            <div className="w-16 h-16 bg-[#5EC8FF]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone size={32} className="text-[#5EC8FF]" />
            </div>
            <h4 className="mb-2">Phone Support</h4>
            <p className="text-sm text-[#E7ECF1]/60 mb-4">
              Mon-Fri, 9AM-6PM
            </p>
            <a
              href="tel:+6321234567"
              className="inline-block px-6 py-2 bg-[#2F353F] border border-[#3A4047] rounded hover:border-[#5EC8FF] transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      )}

      {/* Submit Ticket */}
      {activeTab === 'ticket' && (
        <div className="max-w-2xl">
          <div className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-6 border-b border-[#3A4047]">
              <h3>Submit a Support Ticket</h3>
              <p className="text-sm text-[#E7ECF1]/60 mt-2">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm mb-2">Subject *</label>
                <input
                  type="text"
                  placeholder="Brief description of your issue"
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Category *</label>
                <select className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]">
                  <option value="">Select a category</option>
                  <option value="order">Order Issue</option>
                  <option value="product">Product Question</option>
                  <option value="service">Service Request</option>
                  <option value="buyback">Buyback Inquiry</option>
                  <option value="payment">Payment Issue</option>
                  <option value="technical">Technical Problem</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Order ID (if applicable)</label>
                <input
                  type="text"
                  placeholder="e.g., ORD-2024-001234"
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF]"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Priority</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Low', 'Medium', 'High'].map((priority) => (
                    <button
                      key={priority}
                      className="px-4 py-2.5 rounded border border-[#3A4047] hover:border-[#5EC8FF] hover:bg-[#5EC8FF]/5 transition-all text-sm"
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Description *</label>
                <textarea
                  rows={6}
                  placeholder="Please provide as much detail as possible about your issue..."
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-2.5 focus:outline-none focus:border-[#5EC8FF] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-[#3A4047] rounded p-8 text-center hover:border-[#5EC8FF] transition-colors cursor-pointer">
                  <div className="text-[#E7ECF1]/40 mb-2">
                    Click to upload or drag and drop
                  </div>
                  <div className="text-xs text-[#E7ECF1]/60">
                    PNG, JPG, PDF up to 10MB
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-[#3A4047]">
                <button className="px-6 py-2 bg-[#2F353F] border border-[#3A4047] rounded hover:bg-[#3A4047] transition-colors">
                  Cancel
                </button>
                <button className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors flex items-center gap-2">
                  <Send size={16} />
                  Submit Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Help */}
      <div className="bg-[#5EC8FF]/5 border border-[#5EC8FF]/30 rounded p-6">
        <div className="flex items-start gap-4">
          <HelpCircle size={32} className="text-[#5EC8FF] flex-shrink-0" />
          <div>
            <h4 className="text-[#5EC8FF] mb-2">Need immediate assistance?</h4>
            <p className="text-sm text-[#E7ECF1]/70 mb-4">
              Our live chat support is available Monday to Friday, 9:00 AM to 6:00 PM (PHT). 
              For urgent matters outside business hours, please submit a ticket and we'll respond as soon as possible.
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Start Live Chat
              </button>
              <button className="px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

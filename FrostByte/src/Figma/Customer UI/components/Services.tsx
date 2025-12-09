import React, { useState } from 'react';
import { Wrench, Plus, Calendar, MapPin, User, Clock, CheckCircle, Phone } from 'lucide-react';
import { services } from '../data/mockData';

interface ServicesProps {
  onNavigate: (page: string, params?: any) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const serviceTypes = [
    { id: 'assembly', name: 'PC Assembly', price: 1500, description: 'Full system build and cable management' },
    { id: 'office-setup', name: 'Office Setup', price: 3000, description: 'Multi-workstation installation' },
    { id: 'school-lab', name: 'School Lab Setup', price: 5000, description: 'Complete lab deployment' },
    { id: 'diagnostics', name: 'Diagnostics / Repair', price: 500, description: 'Troubleshooting and repair services' }
  ];

  const timeSlots = ['09:00 - 11:00', '11:00 - 13:00', '14:00 - 16:00', '16:00 - 18:00'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-400';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-400';
      default:
        return 'bg-yellow-500/10 text-yellow-400';
    }
  };

  const handleSubmitBooking = () => {
    setShowBooking(false);
    setStep(1);
    setSelectedService('');
    setSelectedDate('');
    setSelectedTime('');
  };

  if (showBooking) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1>Book a Service</h1>
          <button
            onClick={() => setShowBooking(false)}
            className="px-4 py-2 bg-[#2F353F] border border-[#3A4047] rounded text-sm hover:bg-[#3A4047] transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Progress Steps */}
        <div className="bg-[#171B21] border border-[#3A4047] rounded p-6">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                    s <= step
                      ? 'border-[#5EC8FF] bg-[#5EC8FF]/10 text-[#5EC8FF]'
                      : 'border-[#3A4047] text-[#E7ECF1]/40'
                  }`}>
                    {s < step ? <CheckCircle size={20} /> : s}
                  </div>
                  <span className={`text-sm ${s <= step ? 'text-[#E7ECF1]' : 'text-[#E7ECF1]/40'}`}>
                    {s === 1 && 'Service Type'}
                    {s === 2 && 'Schedule'}
                    {s === 3 && 'Location'}
                    {s === 4 && 'Confirm'}
                  </span>
                </div>
                {s < 4 && <div className={`flex-1 h-0.5 mx-4 ${s < step ? 'bg-[#5EC8FF]' : 'bg-[#3A4047]'}`} />}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Service Type */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="mb-4">Select Service Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`p-6 rounded border-2 text-left transition-all ${
                      selectedService === service.id
                        ? 'border-[#5EC8FF] bg-[#5EC8FF]/5'
                        : 'border-[#3A4047] hover:border-[#5EC8FF]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4>{service.name}</h4>
                      <Wrench size={20} className="text-[#5EC8FF]" />
                    </div>
                    <p className="text-sm text-[#E7ECF1]/60 mb-3">{service.description}</p>
                    <div className="text-sm text-[#5EC8FF]">Starting at ₱{service.price.toLocaleString()}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="space-y-6">
              <h3>Choose Date & Time</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Select Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-4 py-3 rounded border text-sm transition-all ${
                          selectedTime === slot
                            ? 'border-[#5EC8FF] bg-[#5EC8FF]/10 text-[#5EC8FF]'
                            : 'border-[#3A4047] hover:border-[#5EC8FF]/50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="mb-4">Service Location</h3>
              <div>
                <label className="block text-sm mb-2">Address</label>
                <textarea
                  rows={3}
                  placeholder="Enter complete address..."
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Contact Number</label>
                <input
                  type="tel"
                  placeholder="+63 XXX XXX XXXX"
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Additional Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions..."
                  className="w-full bg-[#2F353F] border border-[#3A4047] rounded px-4 py-3 focus:outline-none focus:border-[#5EC8FF] resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="mb-4">Confirm Booking</h3>
              <div className="bg-[#2F353F] border border-[#3A4047] rounded p-6 space-y-4">
                <div className="flex justify-between pb-4 border-b border-[#3A4047]">
                  <span className="text-[#E7ECF1]/60">Service Type</span>
                  <span>{serviceTypes.find(s => s.id === selectedService)?.name}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#3A4047]">
                  <span className="text-[#E7ECF1]/60">Date & Time</span>
                  <span>{selectedDate} • {selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#E7ECF1]/60">Service Fee</span>
                  <span className="text-lg text-[#5EC8FF]">
                    ₱{serviceTypes.find(s => s.id === selectedService)?.price.toLocaleString()}
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#E7ECF1]/60">
                A technician will contact you to confirm the appointment and provide additional details.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#3A4047]">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-[#2F353F] border border-[#3A4047] rounded hover:bg-[#3A4047] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedService) ||
                  (step === 2 && (!selectedDate || !selectedTime))
                }
                className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmitBooking}
                className="px-6 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors"
              >
                Confirm Booking
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Services & Installation</h1>
        <button
          onClick={() => setShowBooking(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5EC8FF] text-[#0E1114] rounded hover:bg-[#5EC8FF]/90 transition-colors"
        >
          <Plus size={18} />
          Book New Service
        </button>
      </div>

      {/* Service Requests */}
      <div className="space-y-4">
        <h3>My Service Requests</h3>
        {services.map((service) => (
          <div key={service.id} className="bg-[#171B21] border border-[#3A4047] rounded">
            <div className="p-4 border-b border-[#3A4047]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4>{service.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                  <div className="text-xs text-[#E7ECF1]/60">{service.id}</div>
                </div>
              </div>
            </div>

            <div className="p-4">
              {service.status === 'In Progress' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-[#E7ECF1]/60 mb-2">
                    <span>Progress</span>
                    <span>{service.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#2F353F] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5EC8FF] rounded-full transition-all"
                      style={{ width: `${service.progress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-3">
                  <div className="flex items-center gap-2 text-[#E7ECF1]/60 mb-2">
                    <Calendar size={14} />
                    <span className="text-xs">Schedule</span>
                  </div>
                  <div className="text-sm">{service.scheduledDate}</div>
                  <div className="text-xs text-[#E7ECF1]/60">{service.scheduledTime}</div>
                </div>

                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-3">
                  <div className="flex items-center gap-2 text-[#E7ECF1]/60 mb-2">
                    <MapPin size={14} />
                    <span className="text-xs">Location</span>
                  </div>
                  <div className="text-sm">{service.address}</div>
                </div>
              </div>

              {service.technician && (
                <div className="bg-[#2F353F] border border-[#3A4047] rounded p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#171B21] rounded-full flex items-center justify-center">
                        <User size={18} />
                      </div>
                      <div>
                        <div className="text-sm mb-1">{service.technician.name}</div>
                        <div className="text-xs text-[#E7ECF1]/60 flex items-center gap-1">
                          <Phone size={12} />
                          {service.technician.phone}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#E7ECF1]/60">
                      Rating: {service.technician.rating}/5.0
                    </div>
                  </div>
                </div>
              )}

              {service.notes && (
                <div className="text-sm text-[#E7ECF1]/60 mb-4">
                  <span className="text-[#E7ECF1]">Notes:</span> {service.notes}
                </div>
              )}

              <div className="flex gap-2">
                {service.status === 'Completed' && (
                  <button className="flex-1 bg-[#5EC8FF]/10 text-[#5EC8FF] border border-[#5EC8FF]/30 rounded py-2 text-sm hover:bg-[#5EC8FF]/20 transition-colors">
                    Download Report
                  </button>
                )}
                <button className="flex-1 bg-[#2F353F] border border-[#3A4047] rounded py-2 text-sm hover:bg-[#3A4047] transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

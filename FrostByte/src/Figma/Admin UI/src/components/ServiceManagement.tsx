import { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';

const services = [
  { id: 'SVC-428', customer: 'Robert Taylor', service: 'Custom PC Build', technician: 'Tech-A', date: '2025-11-28', time: '10:00 AM', status: 'Scheduled', priority: 'High' },
  { id: 'SVC-427', customer: 'Linda Martinez', service: 'GPU Installation', technician: 'Tech-B', date: '2025-11-27', time: '02:30 PM', status: 'In Progress', priority: 'Medium' },
  { id: 'SVC-426', customer: 'David Anderson', service: 'Water Cooling Setup', technician: 'Tech-C', date: '2025-11-27', time: '09:00 AM', status: 'Completed', priority: 'High' },
  { id: 'SVC-425', customer: 'Patricia Moore', service: 'System Diagnostic', technician: 'Unassigned', date: '2025-11-28', time: '01:00 PM', status: 'Pending', priority: 'Low' },
  { id: 'SVC-424', customer: 'Christopher Lee', service: 'Cable Management', technician: 'Tech-A', date: '2025-11-29', time: '11:00 AM', status: 'Scheduled', priority: 'Medium' },
];

const technicians = [
  { id: 'TECH-A', name: 'Alex Thompson', specialization: 'Custom Builds', activeJobs: 3, availability: 'Busy' },
  { id: 'TECH-B', name: 'Brian Foster', specialization: 'Hardware Installation', activeJobs: 1, availability: 'Available' },
  { id: 'TECH-C', name: 'Catherine Wong', specialization: 'Water Cooling', activeJobs: 2, availability: 'Busy' },
  { id: 'TECH-D', name: 'Daniel Rivera', specialization: 'Diagnostics', activeJobs: 0, availability: 'Available' },
];

export function ServiceManagement() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl tracking-tight">Service & Installation Management</h1>
          <p className="text-sm text-[#E7ECF1]/60 mt-1">Manage service appointments and technician assignments</p>
        </div>
        <div className="flex gap-3">
          <div className="flex border border-[#2F353F]">
            <button 
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm transition-colors ${
                view === 'list' ? 'bg-[#5EC8FF] text-[#171B21]' : 'hover:bg-[#2F353F]'
              }`}
            >
              List View
            </button>
            <button 
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm transition-colors ${
                view === 'calendar' ? 'bg-[#5EC8FF] text-[#171B21]' : 'hover:bg-[#2F353F]'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Total Requests</div>
          <div className="text-2xl mt-2">428</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Pending</div>
          <div className="text-2xl mt-2">23</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Scheduled</div>
          <div className="text-2xl mt-2">48</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">In Progress</div>
          <div className="text-2xl mt-2">12</div>
        </div>
        <div className="bg-[#20252D] border border-[#2F353F] p-5">
          <div className="text-xs text-[#E7ECF1]/60">Completed</div>
          <div className="text-2xl mt-2">345</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#20252D] border border-[#2F353F] p-5">
        <div className="grid grid-cols-4 gap-4">
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Services</option>
            <option value="build">Custom PC Build</option>
            <option value="install">Component Installation</option>
            <option value="cooling">Water Cooling</option>
            <option value="diagnostic">Diagnostic</option>
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Technicians</option>
            {technicians.map(tech => (
              <option key={tech.id} value={tech.id}>{tech.name}</option>
            ))}
          </select>
          <select className="px-4 py-2.5 bg-[#171B21] border border-[#2F353F] text-sm text-[#E7ECF1] focus:outline-none focus:border-[#5EC8FF]">
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {view === 'list' ? (
        /* Services List */
        <div className="bg-[#20252D] border border-[#2F353F]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2F353F]">
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Service ID</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Customer</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Service Type</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Technician</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Date & Time</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Priority</th>
                <th className="text-left px-5 py-4 text-xs text-[#E7ECF1]/60">Status</th>
                <th className="text-right px-5 py-4 text-xs text-[#E7ECF1]/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-[#2F353F]/50 hover:bg-[#2F353F]/30">
                  <td className="px-5 py-4 text-sm">{service.id}</td>
                  <td className="px-5 py-4 text-sm">{service.customer}</td>
                  <td className="px-5 py-4 text-sm">{service.service}</td>
                  <td className="px-5 py-4 text-sm">{service.technician}</td>
                  <td className="px-5 py-4">
                    <div className="text-sm">{service.date}</div>
                    <div className="text-xs text-[#E7ECF1]/50">{service.time}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2 py-1 text-xs ${
                      service.priority === 'High' ? 'bg-red-500/10 text-red-400' :
                      service.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {service.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-block px-2 py-1 text-xs ${
                      service.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-400' :
                      service.status === 'Scheduled' ? 'bg-[#5EC8FF]/10 text-[#5EC8FF]' :
                      service.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400' :
                      'bg-green-500/10 text-green-400'
                    }`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end">
                      <button 
                        onClick={() => {
                          setSelectedService(service.id);
                          setShowAssignModal(true);
                        }}
                        className="px-3 py-1 text-xs border border-[#2F353F] hover:bg-[#2F353F] transition-colors"
                      >
                        {service.technician === 'Unassigned' ? 'Assign' : 'Reassign'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-[#20252D] border border-[#2F353F] p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3>November 2025</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">Previous</button>
                <button className="px-3 py-1.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors">Next</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-[#E7ECF1]/60 py-2">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {Array.from({ length: 35 }, (_, i) => {
              const day = i - 2; // Starting offset
              const hasService = [26, 27, 28, 29].includes(day);
              
              return (
                <div 
                  key={i} 
                  className={`aspect-square border border-[#2F353F] p-2 ${
                    day < 1 || day > 30 ? 'bg-[#171B21]' : 'bg-[#20252D] hover:border-[#5EC8FF]/50'
                  } transition-colors`}
                >
                  {day > 0 && day <= 30 && (
                    <>
                      <div className="text-xs mb-1">{day}</div>
                      {hasService && (
                        <div className="w-full h-1 bg-[#5EC8FF] rounded"></div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Technician Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAssignModal(false)}>
          <div className="w-[600px] bg-[#20252D] border border-[#2F353F] p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl mb-6">Assign Technician</h2>
            
            <div className="space-y-6">
              {/* Service Info */}
              <div className="bg-[#171B21] border border-[#2F353F] p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Service</div>
                    <div className="text-sm mt-1">Custom PC Build</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Customer</div>
                    <div className="text-sm mt-1">Robert Taylor</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Date</div>
                    <div className="text-sm mt-1">2025-11-28</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#E7ECF1]/60">Time</div>
                    <div className="text-sm mt-1">10:00 AM</div>
                  </div>
                </div>
              </div>

              {/* Technician Selection */}
              <div>
                <div className="text-xs text-[#E7ECF1]/60 mb-3">Select Technician</div>
                <div className="space-y-2">
                  {technicians.map((tech) => (
                    <div 
                      key={tech.id}
                      className="flex items-center justify-between p-4 border border-[#2F353F] hover:border-[#5EC8FF]/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#2F353F] rounded flex items-center justify-center">
                          <User className="w-5 h-5 text-[#5EC8FF]" />
                        </div>
                        <div>
                          <div className="text-sm">{tech.name}</div>
                          <div className="text-xs text-[#E7ECF1]/50">{tech.specialization}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-[#E7ECF1]/60">Active Jobs: {tech.activeJobs}</div>
                        <span className={`inline-block px-2 py-1 text-xs mt-1 ${
                          tech.availability === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {tech.availability}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAssignModal(false)}
                className="flex-1 px-4 py-2.5 border border-[#2F353F] text-sm hover:bg-[#2F353F] transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2.5 bg-[#5EC8FF] text-[#171B21] text-sm hover:bg-[#5EC8FF]/90 transition-colors">
                Assign Technician
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

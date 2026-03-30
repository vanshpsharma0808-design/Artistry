import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Calendar, LogOut, CheckCircle, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import StaffManagement from '../components/StaffManagement';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const AdminDashboard = () => {
  const { user, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/admin/login');
    } else if (user) {
      fetchBookings();
    }
  }, [user, authLoading, navigate]);

  const fetchBookings = async (date = '') => {
    setLoading(true);
    try {
      const url = date ? `${BACKEND_URL}/api/bookings?date=${date}` : `${BACKEND_URL}/api/bookings`;
      const { data } = await axios.get(url, { withCredentials: true });
      setBookings(data);
    } catch (error) {
      console.error('Failed to fetch bookings', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/bookings/${bookingId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchBookings(filterDate);
    } catch (error) {
      console.error('Failed to update status', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  if (authLoading || !user) {
    return (
      <div className="bg-salon-black min-h-screen flex items-center justify-center">
        <div className="text-salon-gold font-sans">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-salon-black min-h-screen">
      <div className="bg-salon-charcoal border-b border-salon-gold/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-2xl text-salon-gold" data-testid="admin-dashboard-title">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            data-testid="admin-logout-btn"
            className="flex items-center gap-2 text-salon-cream hover:text-salon-gold transition-colors font-sans text-sm"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="bg-salon-card border border-salon-gold/20 p-2 rounded-sm mb-8">
              <TabsTrigger
                value="bookings"
                data-testid="tab-bookings"
                className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans px-6"
              >
                Bookings
              </TabsTrigger>
              <TabsTrigger
                value="staff"
                data-testid="tab-staff"
                className="data-[state=active]:bg-salon-gold data-[state=active]:text-salon-black font-sans px-6"
              >
                Staff
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bookings">
              <div className="mb-8 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-salon-gold" />
                  <label className="text-salon-champagne font-sans text-sm">Filter by Date:</label>
                </div>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => {
                    setFilterDate(e.target.value);
                    fetchBookings(e.target.value);
                  }}
                  data-testid="admin-date-filter"
                  className="min-h-[48px] bg-salon-card border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none"
                />
                {filterDate && (
                  <button
                    onClick={() => {
                      setFilterDate('');
                      fetchBookings('');
                    }}
                    data-testid="admin-clear-filter"
                    className="text-salon-gold hover:text-salon-champagne font-sans text-sm"
                  >
                    Clear
                  </button>
                )}
              </div>

              {loading ? (
                <div className="text-center text-salon-cream/60 font-sans">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="text-center text-salon-cream/60 font-sans" data-testid="admin-no-bookings">
                  No bookings found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full bg-salon-card border border-salon-gold/20 rounded-sm">
                    <thead className="bg-salon-charcoal border-b border-salon-gold/20">
                      <tr>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Date</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Time</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Customer</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Service</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Stylist</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Status</th>
                        <th className="px-4 py-3 text-left font-sans text-sm text-salon-champagne">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, idx) => (
                        <tr key={booking.id} className="border-t border-salon-gold/10" data-testid={`admin-booking-row-${idx}`}>
                          <td className="px-4 py-3 font-sans text-sm text-salon-cream">{booking.date}</td>
                          <td className="px-4 py-3 font-sans text-sm text-salon-cream">{booking.time}</td>
                          <td className="px-4 py-3 font-sans text-sm text-salon-cream">
                            {booking.customer_name}<br />
                            <span className="text-xs text-salon-cream/60">{booking.customer_phone}</span>
                          </td>
                          <td className="px-4 py-3 font-sans text-sm text-salon-cream">{booking.service_name}</td>
                          <td className="px-4 py-3 font-sans text-sm text-salon-cream">{booking.stylist}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 px-3 py-1 rounded-sm text-xs font-sans ${
                                booking.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : booking.status === 'confirmed'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}
                            >
                              {booking.status === 'pending' && <Clock size={14} />}
                              {booking.status === 'confirmed' && <CheckCircle size={14} />}
                              {booking.status === 'completed' && <CheckCircle size={14} />}
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              {booking.status === 'pending' && (
                                <button
                                  onClick={() => updateStatus(booking.id, 'confirmed')}
                                  data-testid={`admin-confirm-btn-${idx}`}
                                  className="px-3 py-1 bg-green-500/20 text-green-400 rounded-sm text-xs hover:bg-green-500/30 transition-colors"
                                >
                                  Confirm
                                </button>
                              )}
                              {booking.status === 'confirmed' && (
                                <button
                                  onClick={() => updateStatus(booking.id, 'completed')}
                                  data-testid={`admin-complete-btn-${idx}`}
                                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-sm text-xs hover:bg-blue-500/30 transition-colors"
                                >
                                  Complete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            <TabsContent value="staff">
              <StaffManagement />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

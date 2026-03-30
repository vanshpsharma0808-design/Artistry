import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StaffManagement = () => {
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingStylist, setEditingStylist] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    photo_url: '',
    specialty: '',
    is_available: true,
  });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchStylists();
  }, []);

  const fetchStylists = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/stylists`);
      setStylists(data);
    } catch (error) {
      console.error('Failed to fetch stylists', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingStylist(null);
    setFormData({
      name: '',
      photo_url: '',
      specialty: '',
      is_available: true,
    });
    setShowDialog(true);
  };

  const handleEdit = (stylist) => {
    setEditingStylist(stylist);
    setFormData({
      name: stylist.name,
      photo_url: stylist.photo_url,
      specialty: stylist.specialty,
      is_available: stylist.is_available,
    });
    setShowDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStylist) {
        await axios.patch(
          `${BACKEND_URL}/api/stylists/${editingStylist.id}`,
          formData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${BACKEND_URL}/api/stylists`,
          formData,
          { withCredentials: true }
        );
      }
      setShowDialog(false);
      fetchStylists();
    } catch (error) {
      console.error('Failed to save stylist', error);
      alert('Failed to save stylist. Please try again.');
    }
  };

  const handleDelete = async (stylistId) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/stylists/${stylistId}`, {
        withCredentials: true,
      });
      setDeleteConfirm(null);
      fetchStylists();
    } catch (error) {
      console.error('Failed to delete stylist', error);
      alert('Failed to delete stylist. Please try again.');
    }
  };

  const toggleAvailability = async (stylist) => {
    try {
      await axios.patch(
        `${BACKEND_URL}/api/stylists/${stylist.id}`,
        { is_available: !stylist.is_available },
        { withCredentials: true }
      );
      fetchStylists();
    } catch (error) {
      console.error('Failed to update availability', error);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-salon-cream/60 font-sans py-12">
        Loading staff...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl text-salon-gold" data-testid="staff-title">
          Staff Management
        </h2>
        <button
          onClick={handleAdd}
          data-testid="add-staff-btn"
          className="flex items-center gap-2 bg-salon-gold text-salon-black font-semibold min-h-[48px] px-6 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300"
        >
          <Plus size={20} /> Add Stylist
        </button>
      </div>

      {stylists.length === 0 ? (
        <div className="text-center text-salon-cream/60 font-sans py-12" data-testid="no-staff">
          No stylists found. Add your first stylist to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stylists.map((stylist, idx) => (
            <div
              key={stylist.id}
              className="bg-salon-card border border-salon-gold/20 rounded-sm overflow-hidden"
              data-testid={`staff-card-${idx}`}
            >
              <div className="relative h-48 bg-salon-charcoal">
                {stylist.photo_url ? (
                  <img
                    src={stylist.photo_url}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={64} className="text-salon-gold/30" />
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => toggleAvailability(stylist)}
                    data-testid={`toggle-availability-${idx}`}
                    className={`px-3 py-1 rounded-sm text-xs font-sans font-semibold ${
                      stylist.is_available
                        ? 'bg-green-500/80 text-white'
                        : 'bg-red-500/80 text-white'
                    }`}
                  >
                    {stylist.is_available ? 'Available' : 'Unavailable'}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-salon-cream mb-2">
                  {stylist.name}
                </h3>
                <p className="text-salon-cream/80 font-sans text-sm mb-4">
                  {stylist.specialty}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(stylist)}
                    data-testid={`edit-staff-${idx}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-salon-charcoal text-salon-gold border border-salon-gold/30 min-h-[40px] px-4 py-2 rounded-sm hover:border-salon-gold/50 transition-colors text-sm"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(stylist)}
                    data-testid={`delete-staff-${idx}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/30 min-h-[40px] px-4 py-2 rounded-sm hover:bg-red-500/20 transition-colors text-sm"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-salon-card border-salon-gold/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-salon-gold">
              {editingStylist ? 'Edit Stylist' : 'Add Stylist'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-salon-champagne font-sans text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                data-testid="staff-input-name"
                className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all"
                placeholder="Enter stylist name"
                required
              />
            </div>
            <div>
              <label className="block text-salon-champagne font-sans text-sm mb-2">
                Photo URL
              </label>
              <input
                type="url"
                value={formData.photo_url}
                onChange={(e) =>
                  setFormData({ ...formData, photo_url: e.target.value })
                }
                data-testid="staff-input-photo"
                className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all"
                placeholder="https://example.com/photo.jpg"
                required
              />
              <p className="text-salon-cream/40 text-xs mt-1 font-sans">
                Paste a direct image URL (e.g., from Unsplash or Pexels)
              </p>
            </div>
            <div>
              <label className="block text-salon-champagne font-sans text-sm mb-2">
                Specialty
              </label>
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                data-testid="staff-input-specialty"
                className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all"
                placeholder="e.g., Hair Specialist"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={formData.is_available}
                onChange={(e) =>
                  setFormData({ ...formData, is_available: e.target.checked })
                }
                data-testid="staff-input-available"
                className="w-5 h-5"
              />
              <label className="text-salon-cream font-sans text-sm">
                Available for bookings
              </label>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowDialog(false)}
                className="flex-1 bg-salon-charcoal text-salon-cream border border-salon-gold/30 min-h-[48px] px-6 py-3 rounded-sm hover:border-salon-gold/50 transition-colors font-sans"
              >
                Cancel
              </button>
              <button
                type="submit"
                data-testid="staff-submit-btn"
                className="flex-1 bg-salon-gold text-salon-black font-semibold min-h-[48px] px-6 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300"
              >
                {editingStylist ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="bg-salon-card border-salon-gold/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-red-400">
              Confirm Delete
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-salon-cream/80 font-sans mb-6">
              Are you sure you want to delete{' '}
              <strong className="text-salon-gold">{deleteConfirm?.name}</strong>?
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-salon-charcoal text-salon-cream border border-salon-gold/30 min-h-[48px] px-6 py-3 rounded-sm hover:border-salon-gold/50 transition-colors font-sans"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm.id)}
                data-testid="confirm-delete-btn"
                className="flex-1 bg-red-500/20 text-red-400 border border-red-500/30 min-h-[48px] px-6 py-3 rounded-sm hover:bg-red-500/30 transition-all duration-300 font-sans font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StaffManagement;

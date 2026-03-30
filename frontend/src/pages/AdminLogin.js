import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      const detail = err.response?.data?.detail;
      if (typeof detail === 'string') {
        setError(detail);
      } else if (Array.isArray(detail)) {
        setError(detail.map(e => e.msg || JSON.stringify(e)).join(' '));
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-salon-black min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-salon-card border border-salon-gold/20 p-8 sm:p-12 rounded-sm">
          <div className="w-16 h-16 bg-salon-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} className="text-salon-gold" />
          </div>
          <h1 className="font-serif text-3xl text-salon-gold mb-2 text-center" data-testid="admin-login-title">
            Admin Login
          </h1>
          <p className="text-salon-cream/60 font-sans text-sm text-center mb-8">
            Access the admin dashboard
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6 text-sm" data-testid="admin-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-salon-champagne font-sans text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="admin-login-email"
                className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                placeholder="admin@artistrysalon.com"
                required
              />
            </div>
            <div>
              <label className="block text-salon-champagne font-sans text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="admin-login-password"
                className="min-h-[48px] w-full bg-salon-black border border-salon-gold/30 rounded-sm px-4 py-2 text-salon-cream focus:border-salon-gold focus:ring-1 focus:ring-salon-gold outline-none transition-all placeholder:text-salon-cream/30"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              data-testid="admin-login-submit"
              className="bg-salon-gold text-salon-black font-semibold min-h-[48px] px-8 py-3 rounded-sm hover:bg-[#DFC06E] transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import UserSidebar from '../components/UserSidebar';
import './AdminDashboard.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/tickets', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data);
      } catch (err) {
        setError('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="admin-dashboard-root">
      <Navbar />
      <div className="admin-dashboard-content">
        <UserSidebar />
        <main className="admin-dashboard-main">
          <h1 className="admin-dashboard-title">My Tickets</h1>
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>
          ) : (
            <div className="admin-dashboard-table-section">
              <table className="admin-dashboard-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(ticket => (
                    <tr key={ticket._id}>
                      <td>{ticket.title}</td>
                      <td>{ticket.description}</td>
                      <td>{ticket.status}</td>
                      <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MyTickets; 
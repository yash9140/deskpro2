const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Ticket = require('../models/Ticket');

// Create ticket (user only)
router.post('/', auth('user'), async (req, res) => {
  const { title, description } = req.body;
  try {
    const ticket = new Ticket({
      title,
      description,
      createdBy: req.user.id,
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// List tickets (user: own, admin: all)
router.get('/', auth(), async (req, res) => {
  try {
    let tickets;
    if (req.user.role === 'admin') {
      tickets = await Ticket.find().populate('createdBy', 'name email');
    } else {
      tickets = await Ticket.find({ createdBy: req.user.id });
    }
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get ticket by ID (owner or admin)
router.get('/:id', auth(), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('createdBy', 'name email');
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    if (req.user.role !== 'admin' && ticket.createdBy._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update ticket (owner or admin)
router.put('/:id', auth(), async (req, res) => {
  const { title, description, status } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    if (req.user.role !== 'admin' && ticket.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status && ['open', 'in progress', 'closed'].includes(status)) ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete ticket (admin only)
router.delete('/:id', auth('admin'), async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ msg: 'Ticket not found' });
    await ticket.remove();
    res.json({ msg: 'Ticket deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router; 
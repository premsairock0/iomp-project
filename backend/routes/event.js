const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const adminAuth = require("../middlewares/admin");

// POST /api/event/addevent
router.post('/addevent', async (req, res) => {
  const { eventtitle, eventimageurl, insidetitle, description, mainimageUrl } = req.body;

  try {
    const newEvent = new Event({
      eventtitle,
      eventimageurl,
      insidetitle,
      description,
      mainimageUrl,
    });

    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ message: 'Server error while adding event' });
  }
});

// GET /api/event/getevent
router.get('/getevent', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    // Always return an array in a consistent shape
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error while fetching events' });
  }
});

// GET /api/event/getevent/:id
router.get('/getevent/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Server error while fetching event' });
  }
});

// PUT /api/event/getevent/:id
router.put('/getevent/:id',  async (req, res) => {
  const { eventtitle, eventimageurl, insidetitle, description, mainimageUrl } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { eventtitle, eventimageurl, insidetitle, description, mainimageUrl },
      { new: true }
    );

    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server error while updating event' });
  }
});

// DELETE /api/event/getevent/:id
router.delete('/getevent/:id',adminAuth, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Server error while deleting event' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Photo = require('../models/photo'); // Adjust path as per your project

// POST /photos - Add a new photo
router.post('/', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'Photo URL is required' });
    }

    const newPhoto = new Photo({ url });
    await newPhoto.save();

    res.status(201).json({ message: 'Photo uploaded successfully', photo: newPhoto });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading photo', error });
  }
});

// GET /photos - Get all uploaded photos
router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find().sort({ uploadedAt: -1 }); // latest first
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching photos', error });
  }
});

module.exports = router;

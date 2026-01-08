const express = require('express');
const router = express.Router();
const {
    createNote,
    getNotes,
    updateNotes,
    deleteNote,
} = require('../controllers/noteController');

// CRUD routes
router.post('/notes', createNote);
router.get('/notes', getNotes);
router.put('/notes/:id', updateNotes);
router.delete('/notes/:id', deleteNote);

module.exports = router;
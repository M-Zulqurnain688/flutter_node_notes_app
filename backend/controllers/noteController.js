const Note = require('../models/Note');

// CREATE note
exports.createNote = async (req, res) => {
    try {

        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                error: 'Title and content are required',
            });
        }
        // const newNote = {
        //     id: Date.now(),
        //     title,
        //     content,
        // };

        const note = await Note.create({ title, content });

        notes.push(newNote);

        res.status(201).json({
            // message: 'Note created successfully',
            message: message.message,
            notes: note,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        // error.statusCode = 500;
        // throw error;
    }
};

// READ all notes
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.json(notes)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // res.json(notes);
};

// UPDATE note
exports.updateNotes = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                error: 'Title and content are required',
            });
        }

        const note = await Note.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );

        if (!note) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }

        res.json({
            message: 'Note updated successfully',
            note,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    // const { id } = req.params;

    // const note = notes.find(note => note.id == id);



    // note.title = title;
    // note.content = content;

};

// DELETE note
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndUpdate(req.params.id);
        // const { id } = req.params;

        // const index = notes.findIndex(note => note.id == id);

        if (!note) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }
        // if (index === -1) {
        //     return res.status(404).json({
        //         error: 'Note not found',
        //     });
        // }

        // notes.splice(index, 1);

        res.json({
            message: 'Note deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        // error.statusCode = 500;
        // throw error;
    }
};
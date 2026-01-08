const notes = require('../data/notes');

// CREATE note
exports.createNote = (req, res) => {

    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({
                error: 'Title and content are required',
            });
        }
        const newNote = {
            id: Date.now(),
            title,
            content,
        };

        notes.push(newNote);

        res.status(201).json({
            message: 'Note created successfully',
            notes: newNote,
        });
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
};

// READ all notes
exports.getNotes = (req, res) => {
    res.json(notes);
};

exports.updateNotes = (req, res) =>{
    const { id } = req.params;
    const { title, content } = req.body;

    const note = notes.find(note => note.id == id);

    if (!note){
        return res.status(404).json({
            error: 'Note not found',
        })
    }

    if (!title || !content) {
        return res.status(400).json({
            error: 'Title and content are required',
        });
    }

    note.title = title;
    note.content = content;

    res.json({
        message: 'Note updated successfully',
        note,
    });

};

// DELETE note
exports.deleteNote = (req, res) => {
    try {
        const { id } = req.params;

        const index = notes.findIndex(note => note.id == id);

        if (index === -1) {
            return res.status(404).json({
                error: 'Note not found',
            });
        }

        notes.splice(index, 1);

        res.json({
            message: 'Note deleted successfully',
        });
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }
};
import 'package:flutter/material.dart';
import 'package:notes_app/models/note_model.dart';
import 'package:notes_app/services/note_service.dart';

class NotesScreen extends StatefulWidget {
  const NotesScreen({super.key});

  @override
  State<NotesScreen> createState() => _NotesScreenState();
}

class _NotesScreenState extends State<NotesScreen> {
  List<Note> notes = [];
  final titleCtrl = TextEditingController();
  final contentCtrl = TextEditingController();

  Future<void> loadNotes() async {
    notes = await NoteService.getNotes();
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    loadNotes();
  }

  void showNoteDialog({Note? note}) {
    if (note != null) {
      titleCtrl.text = note.title;
      contentCtrl.text = note.content;
    }

    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: Text(note == null ? 'Add Note' : 'Update Note'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: titleCtrl),
            TextField(controller: contentCtrl),
          ],
        ),
        actions: [
          TextButton(
            onPressed: () async {
              if (note == null) {
                await NoteService.addNote(
                    titleCtrl.text, contentCtrl.text);
              } else {
                await NoteService.updateNote(
                    note.id, titleCtrl.text, contentCtrl.text);
              }

              titleCtrl.clear();
              contentCtrl.clear();
              Navigator.pop(context);
              loadNotes();
            },
            child: const Text('Save'),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Notes App')),
      floatingActionButton: FloatingActionButton(
        onPressed: () => showNoteDialog(),
        child: const Icon(Icons.add),
      ),
      body: ListView.builder(
        itemCount: notes.length,
        itemBuilder: (_, i) {
          final note = notes[i];
          return ListTile(
            title: Text(note.title),
            subtitle: Text(note.content),
            trailing: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  icon: const Icon(Icons.edit),
                  onPressed: () => showNoteDialog(note: note),
                ),
                IconButton(
                  icon: const Icon(Icons.delete),
                  onPressed: () async {
                    await NoteService.deleteNote(note.id);
                    loadNotes();
                  },
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

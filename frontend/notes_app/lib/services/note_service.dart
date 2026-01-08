import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:notes_app/config/api_config.dart';
import 'package:notes_app/models/note_model.dart';

class NoteService {
  static Future<List<Note>> getNotes() async {
    final response =
        await http.get(Uri.parse('${ApiConfig.baseUrl}/notes'));

    final List data = jsonDecode(response.body);
    return data.map((e) => Note.fromJson(e)).toList();
  }

  static Future<void> addNote(String title, String content) async {
    await http.post(
      Uri.parse('${ApiConfig.baseUrl}/notes'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'title': title, 'content': content}),
    );
  }

  static Future<void> updateNote(
      int id, String title, String content) async {
    await http.put(
      Uri.parse('${ApiConfig.baseUrl}/notes/$id'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'title': title, 'content': content}),
    );
  }

  static Future<void> deleteNote(int id) async {
    await http.delete(
      Uri.parse('${ApiConfig.baseUrl}/notes/$id'),
    );
  }
}

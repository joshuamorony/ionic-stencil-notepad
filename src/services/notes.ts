import { set, get } from "./storage";
import { Note } from "../interfaces/note";

class NotesServiceController {
  public notes: Note[];

  async load(): Promise<Note[]> {
    if (this.notes) {
      return this.notes;
    } else {
      this.notes = (await get("notes")) || [];
      return this.notes;
    }
  }

  async save(): Promise<void> {
    return await set("notes", this.notes);
  }

  getNote(id): Note {
    return this.notes.find(note => note.id === id);
  }

  createNote(title): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.notes.map(note => parseInt(note.id)), 0) + 1;

    this.notes.push({
      id: id.toString(),
      title: title,
      content: ""
    });

    this.save();
  }

  updateNote(note, content): void {
    // Get the index in the array of the note that was passed in
    let index = this.notes.indexOf(note);

    this.notes[index].content = content;
    this.save();
  }

  deleteNote(note): void {
    // Get the index in the array of the note that was passed in
    let index = this.notes.indexOf(note);

    // Delete that element of the array and resave the data
    if (index > -1) {
      this.notes.splice(index, 1);
      this.save();
    }
  }
}

export const NotesService = new NotesServiceController();

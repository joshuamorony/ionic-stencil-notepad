import { Component, State, Prop, h } from "@stencil/core";
import { Note } from "../../interfaces/note";
import { NotesService } from "../../services/notes";

@Component({
  tag: "app-detail",
  styleUrl: "app-detail.css"
})
export class AppDetail {
  public navCtrl = document.querySelector("ion-router");

  @Prop() id: string;

  @State() note: Note = {
    id: null,
    title: "",
    content: ""
  };

  async componentDidLoad() {
    await NotesService.load();
    this.note = await NotesService.getNote(this.id);
  }

  noteChanged(ev) {
    NotesService.updateNote(this.note, ev.target.value);
    NotesService.save();
  }

  deleteNote() {
    setTimeout(() => {
      NotesService.deleteNote(this.note);
    }, 300);
    this.navCtrl.back();
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/notes" />
          </ion-buttons>
          <ion-title>{this.note.title}</ion-title>
          <ion-buttons slot="end">
            <ion-button onClick={() => this.deleteNote()}>
              <ion-icon slot="icon-only" name="trash" />
            </ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-textarea
          onInput={ev => this.noteChanged(ev)}
          value={this.note.content}
          placeholder="...something on your mind?"
        />
      </ion-content>
    ];
  }
}

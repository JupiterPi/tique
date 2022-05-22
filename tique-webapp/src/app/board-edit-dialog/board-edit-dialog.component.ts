import {Component, Inject, Input, ViewChild} from '@angular/core';
import {Board, DataService, Tag} from "../data.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSelect} from "@angular/material/select";

export interface BoardEditDialogData {
  availableTags: Tag[],
  createNew: boolean,
  board: Board
}

@Component({
  selector: 'app-board-edit-dialog',
  templateUrl: './board-edit-dialog.component.html',
  styleUrls: ['./board-edit-dialog.component.css']
})
export class BoardEditDialogComponent {
  availableTags: Tag[] = [];

  previousName: string;
  name: string;
  total: number;
  tags: Tag[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BoardEditDialogData,
    public dataService: DataService
  ) {
    this.availableTags = data.availableTags;

    this.previousName = this.data.board.name;
    this.name = this.data.createNew ? "" : this.data.board.name;
    this.total = this.data.createNew ? 4 : this.data.board.total;
    this.tags = [];
    if (!this.data.createNew) {
      for (let tag of this.data.board.tags) {
        this.tags.push(this.availableTags.find(availableTag => availableTag._id == tag) as Tag);
      }
    }
  }

  leftTags() {
    return this.availableTags.filter(aTag => !this.tags.includes(aTag));
  }

  @ViewChild("addTagSelect") addTagSelect!: MatSelect;
  // used only in template
  openSelect = false;

  removeTag(tagToRemove: Tag) {
    console.log("removing tag: " + tagToRemove._id);
    console.log(this.tags);
    this.tags = this.tags.filter(tag => tag != tagToRemove);
    console.log(this.tags);
  }

  openAddTagSelect() {
    this.openSelect = true;
    setTimeout(() => {
      this.addTagSelect.open();
      setTimeout(() => {
        this.openSelect = false;
      }, 1);
    }, 1);
  }

  addTag(tag: Tag) {
    this.tags.push(tag);
    console.log("adding tag");
  }

  validateInput() {
    if (this.name == "") return false;
    if (this.total == 0) return false;
    return true;
  }

  assembleBoard() {
    const tagIds: string[] = [];
    for (let tag of this.tags) {
      tagIds.push(tag._id);
    }
    return {
      name: this.name,
      total: this.total,
      progress: this.data.board.progress,
      tags: tagIds,
      _id: ""
    };
  }
}

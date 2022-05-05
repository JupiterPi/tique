import {Component, Inject} from '@angular/core';
import {DataService, Tag} from "../data.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface TagEditDialogData {
  createNew: boolean,
  tag: Tag
}

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.css']
})
export class TagEditDialogComponent {
  previousName: string;
  name: string;
  icon: string;
  iconUnset: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TagEditDialogData,
    public dataService: DataService
  ) {
    this.previousName = this.data.tag.name;
    this.name = this.data.createNew ? "" : this.data.tag.name;
    this.icon = this.data.createNew ? "" : this.data.tag.icon;
    this.iconUnset = this.data.createNew;
  }

  onFileSelected(event: any) {
    this.dataService.uploadUserImage(event.target.files[0]).subscribe((id) => {
      this.icon = id;
      this.iconUnset = false;
    });
  }

  validateInput() {
    if (this.name == "") return false;
    if (this.iconUnset) return false;
    return true;
  }

  assembleTag() {
    return {
      name: this.name,
      icon: this.icon,
      _id: ""
    };
  }
}

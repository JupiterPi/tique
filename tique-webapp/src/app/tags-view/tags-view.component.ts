import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {DataService, Tag} from "../data.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TagEditDialogComponent, TagEditDialogData} from "../tag-edit-dialog/tag-edit-dialog.component";

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.css']
})
export class TagsViewComponent {
  @Input() tags: Tag[] = [];
  @Output("filterTags") filterTagsEvent: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  @Input("filterTags") filterTags: Tag[] = [];

  constructor(private dialog: MatDialog, public dataService: DataService) {}

  toggleFilterTag(tag: Tag) {
    if(this.filterTags.includes(tag)) {
      this.filterTags.splice(this.filterTags.indexOf(tag), 1);
    } else {
      this.filterTags.push(tag);
    }
    this.filterTagsEvent.emit(this.filterTags);
  }

  editTag(tag: Tag) {
    this.openDialog(tag);
  }

  createNewTag() {
    this.openDialog(null);
  }

  openDialog(tag: Tag | null) {
    const data: TagEditDialogData = {
      createNew: tag == null,
      tag: tag != null ? tag : {
        name: "New Tag",
        icon: "",
        _id: ""
      }
    };
    const dialog = this.dialog.open(TagEditDialogComponent, { data: data });
    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result != "cancel" && result != "") {
        if (result === "delete") {
          tag = tag as Tag;
          this.dataService.deleteTag(tag._id).subscribe(result => {
            this.dataService.refresh();
          });
        } else {
          const newTag = result as Tag;
          if (tag == null) {
            this.dataService.addTag(newTag).subscribe(result => {
              this.dataService.refresh();
            });
          } else {
            this.dataService.updateTag(tag._id, newTag).subscribe(result => {
              this.dataService.refresh();
            });
          }
        }
      }
    });
  }
}

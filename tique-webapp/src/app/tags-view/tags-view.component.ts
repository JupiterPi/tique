import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tag} from "../data.service";

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.css']
})
export class TagsViewComponent {
  @Input() tags: Tag[] = [];
  @Output("filterTags") filterTagsEvent: EventEmitter<Tag[]> = new EventEmitter<Tag[]>();

  @Input("filterTags") filterTags: Tag[] = [];

  toggleFilterTag(tag: Tag) {
    if(this.filterTags.includes(tag)) {
      this.filterTags.splice(this.filterTags.indexOf(tag), 1);
    } else {
      this.filterTags.push(tag);
    }
    this.filterTagsEvent.emit(this.filterTags);
  }

  editTag(tag: Tag) {
    console.log("edit tag: " + tag.name);
  }

  createNewTag() {
    console.log("create new tag");
  }
}

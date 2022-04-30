import {Component, Input} from '@angular/core';
import {Board, Tag} from "../data.service";

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.css']
})
export class BoardsViewComponent {
  @Input() tags: Tag[] = [];
  @Input() boards: Board[] = [];

  getTags(tags: string[]) {
    return this.tags.filter(tag => tags.includes(tag._id));
  }
}

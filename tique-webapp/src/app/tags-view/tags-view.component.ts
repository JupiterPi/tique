import {Component, Input} from '@angular/core';
import {Tag} from "../data.service";

@Component({
  selector: 'app-tags-view',
  templateUrl: './tags-view.component.html',
  styleUrls: ['./tags-view.component.css']
})
export class TagsViewComponent {
  @Input() tags: Tag[] = [];
}

import {Component, OnInit} from '@angular/core';
import {Board, DataService, Tag} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tique-webapp';

  tags: Tag[] = [];
  boards: Board[] = [];

  filterTags: string[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.refreshHook.subscribe({
      next: () => {
        this.dataService.getTags().subscribe((tags) => {
          this.tags = tags;
          this.dataService.getBoards().subscribe((boards) => {
            this.boards = boards;
          });
        });
      }
    });
  }

  updateFilterTags($event: Tag[]) {
    this.filterTags = [];
    for (let tag of $event) {
      this.filterTags.push(tag._id);
    }
  }

  getFilterTags() {
    const filterTags: Tag[] = [];
    const filterTagsToRemove: string[] = [];
    for (let id of this.filterTags) {
      const filterTag = this.tags.find(tag => tag._id == id);
      if (filterTag == undefined) {
        filterTagsToRemove.push(id);
      } else {
        filterTags.push(filterTag as Tag);
      }
    }
    for (let idToRemove of filterTagsToRemove) {
      this.filterTags.splice(this.filterTags.indexOf(idToRemove), 1);
    }
    return filterTags;
  }
}

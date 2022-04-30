import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Board, Tag} from "../data.service";

type FilteringMethod = "exclusive" | "joined";

@Component({
  selector: 'app-boards-view',
  templateUrl: './boards-view.component.html',
  styleUrls: ['./boards-view.component.css']
})
export class BoardsViewComponent implements OnChanges {
  @Input() tags: Tag[] = [];
  @Input() boards: Board[] = [];
  displayBoards: Board[] = [];

  @Output("clearFilter") clearFilterEvent: EventEmitter<void> = new EventEmitter<void>();
  @Input() filterTags: Tag[] = [];
  filteringMethod: FilteringMethod = "exclusive";

  applyFilter(filteringMethod: string) {
    this.filteringMethod = filteringMethod as FilteringMethod;
    this.evaluateFilteredBoards();
  }

  clearFilter() {
    this.clearFilterEvent.emit();
    this.evaluateFilteredBoards();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.evaluateFilteredBoards();
  }

  evaluateFilteredBoards() {
    const filterTags: string[] = [];
    for (let filterTag of this.filterTags) {
      filterTags.push(filterTag._id);
    }

    if (filterTags.length == 0) {
      this.displayBoards = this.boards;
    } else {

      if (this.filteringMethod === "exclusive") {
        this.displayBoards = this.boards.filter(board => {
          for (let filterTag of filterTags) {
            if (!board.tags.includes(filterTag)) return false;
          }
          return true;
        });
      } else if (this.filteringMethod === "joined") {
        this.displayBoards = this.boards.filter(board => {
          for (let filterTag of filterTags) {
            if (board.tags.includes(filterTag)) return true;
          }
          return false;
        });
      }

    }
  }

  getTags(tags: string[]) {
    return this.tags.filter(tag => tags.includes(tag._id));
  }
}

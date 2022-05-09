import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {Board, DataService, Tag} from "../data.service";
import {BoardEditDialogComponent, BoardEditDialogData} from "../board-edit-dialog/board-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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

  constructor(public dataService: DataService, private dialog: MatDialog) {}

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

  tickBoard(board: Board) {
    setTimeout(() => {
      this.dataService.tickBoard(board._id).subscribe(result => {
        this.dataService.refresh();
      });
    }, 150);
  }

  editBoard(board: Board) {
    this.openDialog(board);
  }

  createNewBoard() {
    this.openDialog(null);
  }

  openDialog(board: Board | null) {
    const data: BoardEditDialogData = {
      availableTags: this.tags,
      createNew: board == null,
      board: board != null ? board : {
        name: "New Tag",
        total: 0,
        progress: 0,
        tags: [],
        _id: ""
      }
    };
    const dialog = this.dialog.open(BoardEditDialogComponent, { data: data });
    dialog.afterClosed().subscribe(result => {
      if (result != undefined && result != "cancel" && result != "") {
        if (result === "delete") {
          board = board as Board;
          this.dataService.deleteBoard(board._id).subscribe(result => {
            this.dataService.refresh();
          });
        } else {
          const newBoard = result as Board;
          console.log(newBoard);
          if (board == null) {
            this.dataService.addBoard(newBoard).subscribe(result => {
              this.dataService.refresh();
            });
          } else {
            this.dataService.updateBoard(board._id, newBoard).subscribe(result => {
              this.dataService.refresh();
            });
          }
        }
      }
    });
  }
}

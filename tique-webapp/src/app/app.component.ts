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

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getTags().subscribe((tags) => {
      this.tags = tags;
      this.dataService.getBoards().subscribe((boards) => {
        this.boards = boards;
      });
    });
  }
}

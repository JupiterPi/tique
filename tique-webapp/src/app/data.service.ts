import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppComponent} from "./app.component";

export type Tag = {
  name: string,
  icon: string,
  _id: string
};

/*export class TagRef {
  constructor(
    public name: string,
    public icon: string,
    public _id: string,
    private http: HttpClient
  ) {}

  updateTag(tag: Tag) {
    if (isDevMode()) {
      return new Observable((observer) => {
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.put("/tag/" + this._id, tag);
    }
  }

  deleteTag() {
    if (isDevMode()) {
      return new Observable((observer) => {
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.delete("/tag/" + this._id);
    }
  }
}*/

export type Board = {
  name: string,
  total: number,
  progress: number,
  tags: string[],
  _id: string
};

/*export class BoardRef {
  constructor(
    public name: string,
    public total: number,
    public progress: number,
    public tags: string[],
    public _id: string,
    private http: HttpClient
  ) {}

  updateBoard(board: Board) {
    if (isDevMode()) {
      return new Observable((observer) => {
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.put("/board/" + this._id, board);
    }
  }

  deleteBoard() {
    if (isDevMode()) {
      return new Observable((observer) => {
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.delete("/board/" + this._id);
    }
  }
}*/

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) {}

  devTags: Tag[] = [
    {
      "_id": "626af1aa240b5c935f1cd92f",
      "name": "Tag 1",
      "icon": "default"
    },
    {
      "_id": "626af1ac240b5c935f1cd930",
      "name": "Tag 2",
      "icon": "default"
    },
    {
      "_id": "626af1c8240b5c935f1cd931",
      "name": "Tag 3 with a longer name",
      "icon": "default"
    }
  ];
  devBoards: Board[] = [
    {
      "_id": "626af210240b5c935f1cd939",
      "name": "Board 1",
      "progress": 1,
      "tags": [
        "626af1aa240b5c935f1cd92f"
      ],
      "total": 4
    },
    {
      "_id": "626af24e240b5c935f1cd93c",
      "name": "Board 2",
      "progress": 2,
      "tags": [
        "626af1ac240b5c935f1cd930",
        "626af1c8240b5c935f1cd931"
      ],
      "total": 4
    },
    {
      "_id": "626af2d4240b5c935f1cd93e",
      "name": "Board 3",
      "total": 4,
      "progress": 3,
      "tags": [
        "626af1aa240b5c935f1cd92f",
        "626af1c8240b5c935f1cd931"
      ]
    },
    {
      "_id": "626af301240b5c935f1cd940",
      "name": "Board 4",
      "total": 4,
      "progress": 4,
      "tags": [
        "626af1aa240b5c935f1cd92f",
        "626af1ac240b5c935f1cd930",
        "626af1c8240b5c935f1cd931"
      ]
    }
  ];

  // tags

  // GET /tag
  getTags() {
    if (isDevMode()) {
      return new Observable<Tag[]>((observer) => {
        observer.next(this.devTags);
        observer.complete();
      });
    } else {
      return this.http.get<Tag[]>("/tag");
    }
  }

  // POST /tag
  addTag(tag: Tag) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        this.devTags.push(tag);
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.post("/tag", tag, {responseType: "text"});
    }
  }

  // PUT /tag
  updateTag(id: string, newTag: Tag) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        this.devTags.filter(tag => tag._id == id).forEach(tag => {
          tag.name = newTag.name;
          tag.icon = newTag.icon;
        });
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.put("/tag/" + id, newTag, {responseType: "text"});
    }
  }

  // DELETE /tag
  deleteTag(id: string) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        const tag = this.devTags.find(tag => tag._id == id) as Tag;
        this.devTags.splice(this.devTags.indexOf(tag), 1);
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.delete("/tag/" + id, {responseType: "text"});
    }
  }

  // boards

  // GET /board
  getBoards() {
    if (isDevMode()) {
      return new Observable<Board[]>((observer) => {
        observer.next(this.devBoards);
        observer.complete();
      });
    } else {
      return this.http.get<Board[]>("/board");
    }
  }

  // POST /board
  addBoard(board: Board) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        this.devBoards.push(board);
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.post("/board", board, {responseType: "text"});
    }
  }

  // PUT /board
  updateBoard(id: string, newBoard: Board) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        this.devBoards.filter(board => board._id == id).forEach(board => {
          board.name = newBoard.name;
          board.total = newBoard.total;
          board.progress = newBoard.progress;
          board.tags = newBoard.tags;
        });
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.put("/board/" + id, newBoard, {responseType: "text"});
    }
  }

  // DELETE /board
  deleteBoard(id: string) {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        const board = this.devBoards.find(tag => tag._id == id) as Board;
        this.devBoards.splice(this.devBoards.indexOf(board), 1);
        observer.next("ok");
        observer.complete();
      });
    } else {
      return this.http.delete("/board/" + id, {responseType: "text"});
    }
  }

  // user images

  getUserImageUrl(id: string) {
    if (isDevMode()) {
      return id == "default"
      ? "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
      : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/C_Hampel_-_Landscape.jpg/320px-C_Hampel_-_Landscape.jpg";
    } else {
      return "/userImage/" + id;
    }
  }

  // POST /uploadUserImage
  uploadUserImage(file: File): Observable<string> {
    if (isDevMode()) {
      return new Observable<string>((observer) => {
        observer.next("the_user_image_id");
        observer.complete();
      });
    } else {
      const formData = new FormData();
      formData.append("image", file);
      return this.http.post("/uploadUserImage", formData, {responseType: "text"});
    }
  }

  refreshHook: Observable<void> = new Observable<void>((observer) => {
    observer.next();
    this.refresh = () => {
      observer.next();
    };
  });
  refresh() {
    console.log("no refresher subscribed");
  }
}

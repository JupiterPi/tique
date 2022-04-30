import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export type Tag = {
  name: string,
  icon: string,
  _id: string
};

export type Board = {
  name: string,
  total: number,
  progress: number,
  tags: string[],
  _id: string
};

@Injectable({
  providedIn: 'root'
})
export class DataService {
  tags: Tag[] | null = null;
  boards: Board[] | null = null;

  constructor(private http: HttpClient) {}

  getTags() {
    if (isDevMode()) {
      return new Observable<Tag[]>((observer) => {
        observer.next([
          {
            "_id": "626af1aa240b5c935f1cd92f",
            "name": "Tag 1",
            "icon": "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
          },
          {
            "_id": "626af1ac240b5c935f1cd930",
            "name": "Tag 2",
            "icon": "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
          },
          {
            "_id": "626af1c8240b5c935f1cd931",
            "name": "Tag 3 with a longer name",
            "icon": "https://yt3.ggpht.com/rSnBWUuLW4lx6XzE5itmDGniKW7rTH-HxfwGqKjkYqmGc1ocBUl328IIAS3j4_eCi9-zy-j8=s88-c-k-c0x00ffffff-no-rj"
          }
        ]);
        observer.complete();
      });
    } else {
      return this.http.get<Tag[]>("/tag");
    }
  }

  getBoards() {
    if (isDevMode()) {
      return new Observable<Board[]>((observer) => {
        observer.next([
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
        ]);
        observer.complete();
      });
    } else {
      return this.http.get<Board[]>("/board");
    }
  }
}

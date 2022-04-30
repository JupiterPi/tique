import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
    return this.http.get<Tag[]>("/tag");
  }

  getBoards() {
    return this.http.get<Board[]>("/board");
  }
}

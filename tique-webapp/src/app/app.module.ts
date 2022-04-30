import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { TagsViewComponent } from './tags-view/tags-view.component';
import { BoardsViewComponent } from './boards-view/boards-view.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatRippleModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {HttpClientModule} from "@angular/common/http";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    TagsViewComponent,
    BoardsViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: "", component: AppComponent},
    ]),
    MatCardModule,
    MatGridListModule,
    MatRippleModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardEditDialogComponent } from './board-edit-dialog.component';

describe('BoardEditDialogComponent', () => {
  let component: BoardEditDialogComponent;
  let fixture: ComponentFixture<BoardEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecaladasPage } from './recaladas.page';

describe('RecaladasPage', () => {
  let component: RecaladasPage;
  let fixture: ComponentFixture<RecaladasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaladasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

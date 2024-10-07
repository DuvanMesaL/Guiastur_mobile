import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuquesPage } from './buques.page';

describe('BuquesPage', () => {
  let component: BuquesPage;
  let fixture: ComponentFixture<BuquesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuquesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

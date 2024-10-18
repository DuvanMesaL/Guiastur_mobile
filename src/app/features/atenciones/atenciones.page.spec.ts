import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtencionesPage } from './atenciones.page';

describe('AtencionesPage', () => {
  let component: AtencionesPage;
  let fixture: ComponentFixture<AtencionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

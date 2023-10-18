import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesComponent } from './styles.component';

describe('StylesComponent', () => {
  let component: StylesComponent;
  let fixture: ComponentFixture<StylesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StylesComponent]
    });
    fixture = TestBed.createComponent(StylesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

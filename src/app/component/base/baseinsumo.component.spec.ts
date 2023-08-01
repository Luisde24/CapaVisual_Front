import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseinsumoComponent } from './baseinsumo.component';

describe('BaseinsumoComponent', () => {
  let component: BaseinsumoComponent;
  let fixture: ComponentFixture<BaseinsumoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseinsumoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseinsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

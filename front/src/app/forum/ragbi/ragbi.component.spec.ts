import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RagbiComponent } from './ragbi.component';

describe('RagbiComponent', () => {
  let component: RagbiComponent;
  let fixture: ComponentFixture<RagbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RagbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RagbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

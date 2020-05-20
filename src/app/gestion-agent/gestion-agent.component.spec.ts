import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAgentComponent } from './gestion-agent.component';

describe('GestionAgentComponent', () => {
  let component: GestionAgentComponent;
  let fixture: ComponentFixture<GestionAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

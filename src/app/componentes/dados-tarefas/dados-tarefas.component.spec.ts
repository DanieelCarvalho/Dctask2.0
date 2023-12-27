import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosTarefasComponent } from './dados-tarefas.component';

describe('DadosTarefasComponent', () => {
  let component: DadosTarefasComponent;
  let fixture: ComponentFixture<DadosTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosTarefasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DadosTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

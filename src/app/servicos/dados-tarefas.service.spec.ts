import { TestBed } from '@angular/core/testing';

import { DadosTarefasService } from './dados-tarefas.service';

describe('DadosTarefasService', () => {
  let service: DadosTarefasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosTarefasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

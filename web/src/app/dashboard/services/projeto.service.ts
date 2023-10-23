import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Projeto } from '../models/projeto';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(projeto: Projeto): Observable<any> {
    return this.httpClient.post<Projeto>(
      `${this.servicesRootUrl}/projetos/new?user=${localStorage.getItem('usu_id')}`,
      projeto,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(projeto: Projeto): Observable<any> {
    return this.httpClient.patch<Projeto>(
      `${this.servicesRootUrl}/projetos/update?projeto=${projeto.id}`,
      projeto,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idProjeto: number): Observable<any> {
    return this.httpClient.delete<Projeto>(
      `${this.servicesRootUrl}/projetos/delete?projeto=${idProjeto}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findById(idProjeto: number, idColaborador: number): Observable<any> {
    return this.httpClient.get<Projeto>(
      `${this.servicesRootUrl}/projetos/findById?projeto=${idProjeto}&colaborador=${idColaborador}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findByIdStakeholder(idStakeholder: number): Observable<any> {
    return this.httpClient.get<Projeto>(
      `${this.servicesRootUrl}/projetos/findByIdStakeholder?stakeholder=${idStakeholder}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findByColaborador(): Observable<GetResponseProjetos[]> {
    return this.httpClient.get<GetResponseProjetos[]>(
      `${this.servicesRootUrl}/projetos/findByColaborador?user=${localStorage.getItem('usu_id')}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findByNome(
    id: number,
    nome: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseProjetos[]> {
    return this.httpClient.get<GetResponseProjetos[]>(
      `${this.servicesRootUrl}/projetos/findByNome?user=${id}&nome=${nome}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getColaboradoresByProjeto(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseColaboradores[]> {
    return this.httpClient.get<GetResponseColaboradores[]>(
      `${this.servicesRootUrl}/projetos/colaboradores?projeto=${id}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getColaboradoresByProjetoAndNome(
    id: number,
    nome: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseColaboradores[]> {
    return this.httpClient.get<GetResponseColaboradores[]>(
      `${this.servicesRootUrl}/projetos/colaboradores/findByNome?projeto=${id}&nome=${nome}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  addColaborador(
    idProjeto: number,
    idColaborador: number
  ): Observable<any> {
    return this.httpClient.post<any>(
      `${this.servicesRootUrl}/projetos/addColaborador?projeto=${idProjeto}&colaborador=${idColaborador}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  removeColaborador(
    idProjeto: number,
    idColaborador: number
  ): Observable<any> {
    return this.httpClient.delete<any>(
      `${this.servicesRootUrl}/projetos/removeColaborador?projeto=${idProjeto}&colaborador=${idColaborador}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfProjetos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/projetos/metrics/total?user=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfNovosProjetos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/projetos/metrics/new?user=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfProjetosEmAndamento(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/projetos/metrics/ongoing?user=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfProjetosConcluidos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/projetos/metrics/finished?user=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getProjetosRecentes(id: number): Observable<Projeto[]> {
    return this.httpClient.get<Projeto[]>(
      `${this.servicesRootUrl}/projetos/recentes?user=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseProjetos {
  items: Projeto[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface EntityCount {
  totalCount: number;
}

interface GetResponseColaboradores {
  items: Colaborador[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

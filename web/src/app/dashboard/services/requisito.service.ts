import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Requisito } from '../models/requisito';
import { ResultadoRequisito } from '../models/resultadoRequisito';

@Injectable({
  providedIn: 'root',
})
export class RequisitoService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(requisito: Requisito, projeto: number): Observable<any> {
    return this.httpClient.post<Requisito>(
      `${this.servicesRootUrl}/requisitos/new?projeto=${projeto}`,
      requisito,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(requisito: Requisito, projeto: number): Observable<any> {
    return this.httpClient.patch<Requisito>(
      `${this.servicesRootUrl}/requisitos/update?requisito=${requisito.id}&projeto=${projeto}`,
      requisito,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idRequisito: number): Observable<any> {
    return this.httpClient.delete<Requisito>(
      `${this.servicesRootUrl}/requisitos/delete?requisito=${idRequisito}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getById(idRequisito: number): Observable<Requisito> {
    return this.httpClient.get<Requisito>(
      `${this.servicesRootUrl}/requisitos/findById?id=${idRequisito}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  list(idProjeto: number, page: number, pageSize: number): Observable<GetResponseRequisitos[]> {
    return this.httpClient.get<GetResponseRequisitos[]>(
      `${this.servicesRootUrl}/requisitos?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listByName(idProjeto: number, nome: string, page: number, pageSize: number): Observable<GetResponseRequisitos[]> {
    return this.httpClient.get<GetResponseRequisitos[]>(
      `${this.servicesRootUrl}/requisitos/findByNome?projeto=${idProjeto}&nome=${nome}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listResultado(idProjeto: number, page: number, pageSize: number): Observable<GetResponseResultados[]> {
    return this.httpClient.get<GetResponseResultados[]>(
      `${this.servicesRootUrl}/requisitos/resultados/list?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listResultadoByName(idProjeto: number, nome: string, page: number, pageSize: number): Observable<GetResponseRequisitos[]> {
    return this.httpClient.get<GetResponseRequisitos[]>(
      `${this.servicesRootUrl}/requisitos/resultados/findByNome?projeto=${idProjeto}&nome=${nome}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseRequisitos {
  items: Requisito[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseResultados {
  items: ResultadoRequisito[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}


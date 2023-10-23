import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cenarios } from '../shared/models/cenarios';

@Injectable({
  providedIn: 'root',
})
export class CenarioService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(cenario: Cenarios, caso: number): Observable<any> {
    return this.httpClient.post<Cenarios>(
      `${this.servicesRootUrl}/cenarios/new?caso=${caso}`,
      cenario,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(cenario: Cenarios, caso: number): Observable<any> {
    return this.httpClient.patch<Cenarios>(
      `${this.servicesRootUrl}/cenarios/update?cenario=${cenario.id}&caso=${caso}`,
      cenario,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idCenario: number): Observable<any> {
    return this.httpClient.delete<Cenarios>(
      `${this.servicesRootUrl}/cenarios/delete?cenario=${idCenario}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getById(idCen: number): Observable<Cenarios> {
    return this.httpClient.get<Cenarios>(
      `${this.servicesRootUrl}/cenarios/findById?id=${idCen}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  list(idPro: number, idReq: number, idCaso: number, page: number, pageSize: number): Observable<GetResponseCenario[]> {
    return this.httpClient.get<GetResponseCenario[]>(
      `${this.servicesRootUrl}/cenarios?projeto=${idPro}&requisito=${idReq}&caso=${idCaso}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listByName(idCen: number, nome: string, page: number, pageSize: number): Observable<GetResponseCenario[]> {
    return this.httpClient.get<GetResponseCenario[]>(
      `${this.servicesRootUrl}/cenarios/findByNome?caso=${idCen}&nome=${nome}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseCenario {
  items: Cenarios[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

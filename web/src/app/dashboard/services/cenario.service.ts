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

  create(cenario: Cenarios): Observable<any> {
    return this.httpClient.post<Cenarios>(
      `${this.servicesRootUrl}/cenarios/new?cenarios=${localStorage.getItem('cen_id')}`,
      cenario,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(cenario: Cenarios): Observable<any> {
    return this.httpClient.patch<Cenarios>(
      `${this.servicesRootUrl}/cenarios/update?cenario=${cenario.id}`,
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
      `${this.servicesRootUrl}/cenario/delete?cenario=${idCenario}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findById(idCenario: number): Observable<any> {
    return this.httpClient.get<Cenarios>(
      `${this.servicesRootUrl}/cenarios/findById?caso=${idCenario}`,
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
  ): Observable<GetResponseCenario[]> {
    return this.httpClient.get<GetResponseCenario[]>(
      `${this.servicesRootUrl}/cenarios/findByNome?cenarios=${id}&nome=${nome}&page=${page}&pageSize=${pageSize}`, //Verificar com o Bruno sobre a rotas dos requisitsos
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

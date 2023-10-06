import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { casoUso } from '../shared/models/casoUso';

@Injectable({
  providedIn: 'root',
})
export class CasoUsoService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(casoUso: casoUso): Observable<any> {
    return this.httpClient.post<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/new?caso=${localStorage.getItem('cas_id')}`,
      casoUso,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(casoUso: casoUso): Observable<any> {
    return this.httpClient.patch<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/update?caso=${casoUso.id}`,
      casoUso,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idCaso: number): Observable<any> {
    return this.httpClient.delete<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/delete?casoUso=${idCaso}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  findById(idCaso: number): Observable<any> {
    return this.httpClient.get<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/findById?caso=${idCaso}`,
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
  ): Observable<GetResponseCaso[]> {
    return this.httpClient.get<GetResponseCaso[]>(
      `${this.servicesRootUrl}/caso-de-uso/findByNome?requisitos=${id}&nome=${nome}&page=${page}&pageSize=${pageSize}`, //Verificar com o Bruno sovre a rotas dos requisitsos
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfCasos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/caso-de-uso/metrics/total?caso=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfCasosSimples(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/caso-de-uso/metrics/simples?caso=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfCasosMedios(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/caso-de-uso/metrics/medios?caso=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfCasosComplexos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/caso-de-uso/metrics/complexos?caso=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

}

interface GetResponseCaso {
  items: casoUso[];
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

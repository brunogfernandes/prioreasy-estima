import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { casoUso } from '../models/casoUso';

@Injectable({
  providedIn: 'root',
})
export class CasoUsoService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(casoUso: casoUso, requisito: number): Observable<any> {
    return this.httpClient.post<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/new?requisito=${requisito}`,
      casoUso,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(casoUso: casoUso, requisito: number): Observable<any> {
    return this.httpClient.patch<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/update?caso=${casoUso.id}&requsito=${requisito}`,
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
      `${this.servicesRootUrl}/caso-de-uso/delete?caso=${idCaso}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getById(idCaso: number): Observable<casoUso> {
    return this.httpClient.get<casoUso>(
      `${this.servicesRootUrl}/caso-de-uso/findById?id=${idCaso}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  list(idPro: number, idReq: number, page: number, pageSize: number): Observable<GetResponseCaso[]> {
    return this.httpClient.get<GetResponseCaso[]>(
      `${this.servicesRootUrl}/caso-de-uso?requisito=${idReq}&projeto${idPro}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listByName(idReq: number, nome: string, page: number, pageSize: number): Observable<GetResponseCaso[]> {
    return this.httpClient.get<GetResponseCaso[]>(
      `${this.servicesRootUrl}/caso-de-uso/findByNome?projeto=${idReq}&nome=${nome}&page=${page}&size=${pageSize}`,
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

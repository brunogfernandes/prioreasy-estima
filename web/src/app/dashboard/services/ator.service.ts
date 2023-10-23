import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Atores } from '../shared/models/atores';

@Injectable({
  providedIn: 'root',
})
export class AtorService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  create(atores: Atores, projeto: number): Observable<any> {
    return this.httpClient.post<Atores>(
      `${this.servicesRootUrl}/atores/new?projeto=${projeto}`,
      atores,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(ator: Atores, projeto: number): Observable<any> {
    return this.httpClient.patch<Atores>(
      `${this.servicesRootUrl}/atores/update?atores=${ator.id}&projeto=${projeto}`,
      ator,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idAtor: number): Observable<any> {
    return this.httpClient.delete<Atores>(
      `${this.servicesRootUrl}/atores/delete?atores=${idAtor}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getById(idAtores: number): Observable<Atores> {
    return this.httpClient.get<Atores>(
      `${this.servicesRootUrl}/atores/findById?id=${idAtores}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  list(idProjeto: number, page: number, pageSize: number): Observable<GetResponseAtores[]> {
    return this.httpClient.get<GetResponseAtores[]>(
      `${this.servicesRootUrl}/atores?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listByName(idProjeto: number, nome: string, page: number, pageSize: number): Observable<GetResponseAtores[]> {
    return this.httpClient.get<GetResponseAtores[]>(
      `${this.servicesRootUrl}/atores/findByNome?projeto=${idProjeto}&nome=${nome}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfAtores(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/atores/metrics/total?atores=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfAtoresSimples(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/atores/metrics/simples?atores=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfAtoresMedios(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/atores/metrics/medios?atores=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getNumberOfAtoresComplexos(id: number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/atores/metrics/complexos?atores=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

}

interface GetResponseAtores {
  items: Atores[];
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

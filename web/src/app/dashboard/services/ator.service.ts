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

  create(ator: Atores): Observable<any> {
    return this.httpClient.post<Atores>(
      `${this.servicesRootUrl}/atores/new?atores=${localStorage.getItem('ato_id')}`,
      ator,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(ator: Atores): Observable<any> {
    return this.httpClient.patch<Atores>(
      `${this.servicesRootUrl}/atores/update?atores=${ator.id}`,
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

  findById(idAtores: number): Observable<any> {
    return this.httpClient.get<Atores>(
      `${this.servicesRootUrl}/atores/findById?atores=${idAtores}`,
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
  ): Observable<GetResponseAtores[]> {
    return this.httpClient.get<GetResponseAtores[]>(
      `${this.servicesRootUrl}/atores/findByNome?projetos=${id}&nome=${nome}&page=${page}&pageSize=${pageSize}`,
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

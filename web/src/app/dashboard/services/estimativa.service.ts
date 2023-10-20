import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estimativa } from '../shared/models/estimativa';

@Injectable({
  providedIn: 'root',
})
export class EstimativaService {

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  list(idProjeto: number, page: number, pageSize: number): Observable<GetResponseEstimativa[]> {
    return this.httpClient.get<GetResponseEstimativa[]>(
      `${this.servicesRootUrl}/estimativa?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  create(estimativa: Estimativa, projeto: number): Observable<any> {
    return this.httpClient.post<Estimativa>(
      `${this.servicesRootUrl}/estimativa/new?projeto=${projeto}`,
      estimativa,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getTotalAtores(id:number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/estimativa/totalAtores?total=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  getTotalCasos(id:number): Observable<EntityCount> {
    return this.httpClient.get<EntityCount>(
      `${this.servicesRootUrl}/estimativa/totalCasos?total=${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }


}

interface GetResponseEstimativa {
  items: Estimativa[];
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

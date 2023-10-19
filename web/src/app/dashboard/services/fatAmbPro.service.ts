import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fatAmbPro } from '../shared/models/fatAmbPro';

@Injectable({
  providedIn: 'root',
})
export class FatAmbProService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  list(idPro: number, page: number, pageSize: number): Observable<GetResponseFatores[]> {
    return this.httpClient.get<GetResponseFatores[]>(
      `${this.servicesRootUrl}/fatores-ambientais?projeto=${idPro}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
  create(fatAmb: fatAmbPro, projeto: number): Observable<any> {
    return this.httpClient.post<fatAmbPro>(
      `${this.servicesRootUrl}/fatores-ambientais/new?projeto=${projeto}`,
      fatAmb,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idFat: number): Observable<any> {
    return this.httpClient.delete<fatAmbPro>(
      `${this.servicesRootUrl}/fatores-ambientais/delete?idFat=${idFat}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listById(idFator: number): Observable<any> {
    return this.httpClient.get<fatAmbPro>(
      `${this.servicesRootUrl}/fatores-ambientais/getById?fator=${idFator}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(fatores: fatAmbPro): Observable<any> {
    return this.httpClient.patch<fatAmbPro>(
      `${this.servicesRootUrl}/fatores-ambientais/update?fatores=${fatores.id}`,
      fatores,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseFatores {
  items: fatAmbPro[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

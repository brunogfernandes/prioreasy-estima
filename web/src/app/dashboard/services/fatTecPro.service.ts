import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fatTecPro } from '../shared/models/fatTecPro';


@Injectable({
  providedIn: 'root',
})
export class FatTecProService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  list(idPro: number, page: number, pageSize: number): Observable<GetResponseFatores[]> {
    return this.httpClient.get<GetResponseFatores[]>(
      `${this.servicesRootUrl}/fatores-tecnicos?projeto=${idPro}&page=${page}&size=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
  create(fatTec: fatTecPro, projeto: number): Observable<any> {
    return this.httpClient.post<fatTecPro>(
      `${this.servicesRootUrl}/fatores-tecnicos/new?projeto=${projeto}`,
      fatTec,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idFat: number): Observable<any> {
    return this.httpClient.delete<fatTecPro>(
      `${this.servicesRootUrl}/fatores-tecnicos/delete?idFat=${idFat}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listById(idFator: number): Observable<any> {
    return this.httpClient.get<fatTecPro>(
      `${this.servicesRootUrl}/fatores-tecnicos/getById?fator=${idFator}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  update(fatores: fatTecPro): Observable<any> {
    return this.httpClient.patch<fatTecPro>(
      `${this.servicesRootUrl}/fatores-tecnicos/update?fatores=${fatores.id}`,
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
  items: fatTecPro[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

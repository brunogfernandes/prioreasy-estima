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

  findById(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseFatores[]> {
    return this.httpClient.get<GetResponseFatores[]>(
      `${this.servicesRootUrl}/fatores-tecnicos/findById?fator=${id}&page=${page}&pageSize=${pageSize}`, //Verificar com o Bruno sobre a rotas dos requisitsos
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
      `${this.servicesRootUrl}/fatores-tecnicos/update?fator=${fatores.id}`,
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

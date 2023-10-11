import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fatAmb } from '../shared/models/fatAmb';

@Injectable({
  providedIn: 'root',
})
export class FatAmbService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  findByDescricao(
    id: number,
    descricao: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseFatores[]> {
    return this.httpClient.get<GetResponseFatores[]>(
      `${this.servicesRootUrl}/fatores-ambientais/findByDescricao?fator=${id}&descricao=${descricao}&page=${page}&pageSize=${pageSize}`, //Verificar com o Bruno sobre a rotas dos requisitsos
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseFatores {
  items: fatAmb[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

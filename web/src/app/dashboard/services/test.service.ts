import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teste } from '../models/teste';

@Injectable({
    providedIn: 'root',
})
export class TesteService {
    constructor(
        private httpClient: HttpClient,
        @Inject('servicesRootUrl') private servicesRootUrl: string
    ) {}

    create(testes: Teste, projeto: number): Observable<any> {
        return this.httpClient.post<Teste>(
          `${this.servicesRootUrl}/testes/new?projeto=${projeto}`,
          testes,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
    }

    update(Teste: Teste, projeto: number): Observable<any> {
        return this.httpClient.patch<Teste>(
          `${this.servicesRootUrl}/teste/update?Teste=${Teste.id}&projeto=${projeto}`,
          Teste,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }
    
      delete(idTeste: number): Observable<any> {
        return this.httpClient.delete<Teste>(
          `${this.servicesRootUrl}/teste/delete?Teste=${idTeste}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }
    
      getById(idTeste: number): Observable<Teste> {
        return this.httpClient.get<Teste>(
          `${this.servicesRootUrl}/testes/findById?id=${idTeste}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }
    
      list(
        idProjeto: number,
        page: number,
        pageSize: number
      ): Observable<GetResponseTestes> {
        return this.httpClient.get<GetResponseTestes>(
          `${this.servicesRootUrl}/testes?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }

      listByName(
        idProjeto: number,
        nome: string,
        page: number,
        pageSize: number
      ): Observable<GetResponseTestes> {
        return this.httpClient.get<GetResponseTestes>(
          `${this.servicesRootUrl}/testes/findByNome?projeto=${idProjeto}&nome=${nome}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }

      listResultado(
        idProjeto: number,
        page: number,
        pageSize: number
      ): Observable<GetResponseResultados> {
        return this.httpClient.get<GetResponseResultados>(
          `${this.servicesRootUrl}/testes/resultados/list?projeto=${idProjeto}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }
    
      listResultadoByName(
        idProjeto: number,
        nome: string,
        page: number,
        pageSize: number
      ): Observable<GetResponseResultados> {
        return this.httpClient.get<GetResponseResultados>(
          `${this.servicesRootUrl}/testes/resultados/findByNome?projeto=${idProjeto}&nome=${nome}&page=${page}&size=${pageSize}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
          }
        );
      }
    
    
}
interface GetResponseTestes {
    items: Teste[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }

  interface GetResponseResultados {
    items: Teste[];
    page: {
      size: number;
      totalElements: number;
      totalPages: number;
      number: number;
    };
  }
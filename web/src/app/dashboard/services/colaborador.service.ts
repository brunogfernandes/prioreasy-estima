import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Colaborador } from '../models/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  findByNome(nome: string, projeto: number): Observable<any> {
    return this.httpClient.get<Colaborador[]>(
      `${this.servicesRootUrl}/colaboradores?name=${nome}&projeto=${projeto}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

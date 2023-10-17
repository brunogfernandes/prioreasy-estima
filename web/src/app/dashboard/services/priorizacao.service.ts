import { Inject, Injectable } from '@angular/core';
import { PriorizacaoRequest } from '../models/priorizacaoRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorizacaoService {

  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  insertPriorizacao(priorizacao: PriorizacaoRequest, stakeholder: number): Observable<any> {
    return this.httpClient.post<PriorizacaoRequest>(
      `${this.servicesRootUrl}/priorizacao-stakeholders/new?stakeholder=${stakeholder}`,
      priorizacao,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  completePriorizacao(stakeholder: number): Observable<any> {
    return this.httpClient.patch<PriorizacaoRequest>(
      `${this.servicesRootUrl}/priorizacao-stakeholders/complete?stakeholder=${stakeholder}`,
      null,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

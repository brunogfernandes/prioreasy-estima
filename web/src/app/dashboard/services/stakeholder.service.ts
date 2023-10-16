import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stakeholder } from '../models/stakeholder';
import { StakeholderSignup } from '../models/stakeholderSignup';

@Injectable({
  providedIn: 'root',
})
export class StakeholderService {
  constructor(
    private httpClient: HttpClient,
    @Inject('servicesRootUrl') private servicesRootUrl: string
  ) {}

  listByProjeto(
    id: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseStakeholders[]> {
    return this.httpClient.get<GetResponseStakeholders[]>(
      `${this.servicesRootUrl}/stakeholders/findByProjeto?projeto=${id}&page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  listByName(
    id: number,
    nome: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseStakeholders[]> {
    return this.httpClient.get<GetResponseStakeholders[]>(
      `${this.servicesRootUrl}/stakeholders/findByNome?projeto=${id}&page=${page}&pageSize=${pageSize}&nome=${nome}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  create(stakeholder: StakeholderSignup): Observable<any> {
    return this.httpClient.post<StakeholderSignup>(
      `${this.servicesRootUrl}/create-stakeholder`,
      stakeholder,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  delete(idStakeholder: number): Observable<any> {
    return this.httpClient.delete<Stakeholder>(
      `${this.servicesRootUrl}/stakeholders/delete?stakeholder=${idStakeholder}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }

  alert(idStakeholder: number): Observable<any> {
    return this.httpClient.patch<Stakeholder>(
      `${this.servicesRootUrl}/stakeholders/alert?id=${idStakeholder}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
  }
}

interface GetResponseStakeholders {
  items: Stakeholder[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { DataService } from './data.service';


@Injectable()
export class ApiService extends DataService {

  constructor(http: Http) {
    super('http://localhost:4000/api/birds', http);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Owner } from '../entities/owner.entity';

@Injectable()
export class OwnerService{
    private BASE_URL: string = "https://5c92dbfae7b1a00014078e61.mockapi.io/";
    constructor(
        private httpClient : HttpClient
    ){}

    findAllOwners() {
        return this.httpClient.get(this.BASE_URL + 'owners')
            .toPromise()
            .then(res => res as Owner[]);
    }

}

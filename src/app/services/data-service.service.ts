import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenServiceService} from './token-service.service';

const TOKEN = 'tcTPQJvtb7kAIpqmTZL9hyY22lRkGBU1iysaV3dhi34yidEXmgUujy73NnIlLWJI';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {


  constructor(
    private http: HttpClient,
    private token: TokenServiceService
  ) { }

  login(loginData): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post('http://emphasoft-test-assignment.herokuapp.com/api-token-auth/', loginData).subscribe(response => {
        if (response) {
          if (response.hasOwnProperty('token')) {
            console.log(1);
            this.token.token = response['token'];
            resolve();
          } else {
            console.log(2);
            reject();
          }
        } else {
          console.log(3);
          reject();
        }
      }, error => {
        reject();
      });
    });
  }

  getUsers(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.get('http://emphasoft-test-assignment.herokuapp.com/api/v1/users/', {
        // Это лучше делать через интерцепторы, но так быстрее
        headers: {
          Authorization: 'Token ' + this.token.token,
          'X-CSRFToken': TOKEN
        }
      }).subscribe(response => {
        if (response) {
          resolve(response);
        }
      });
    });
  }
}

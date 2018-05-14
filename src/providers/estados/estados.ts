import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the EstadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstadosProvider {

  constructor(public http: Http) {
    console.log('Hello EstadosProvider Provider');
  }

  getApiEstados(){
    this.http.get('http://datamx.io/dataset/73b08ca8-e955-4ea5-a206-ee618e26f081/resource/9c5e8302-221c-46f2-b9f7-0a93cbe5365b/download/estados.json').map(res => res.json()).subscribe(data => {
        console.log(data);
        
    });
}

getLocalEstados(){
 return this.http.get('assets/data/estados.json').map(res => res.json()).subscribe(data => {
    console.log(data);
});
}
}


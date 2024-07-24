import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { FakeData } from '../../mock/data';
import { DataModel, StatusEntregaEnum } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public groupBy(list: Array<any>, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
  }

  public mapPorStatus(group: Map<any,any>, status: StatusEntregaEnum) {
    return Array
        .from(group, ([nome, valor]) => <any>({ nome, valor }))
        .map((item: any) => {
          return item.valor.reduce((prev: any, curr: any) => {
            return {
              total: prev.total + 1,
              nome: curr.motorista.nome,
              bairro: item.nome,
              quantidadeEntregas: curr.status_entrega === status ? prev.quantidadeEntregas + 1 : prev.quantidadeEntregas
            }
          }, {total: 0, nome: '', quantidadeEntregas: 0})
        });
  }


  public loadData(myDelay = 2000): Observable<Array<DataModel>>{
    // requisição fake com delay de 2 segundos
    return of<any>(FakeData)
      .pipe(delay(myDelay));
  }

}


import { DataService } from './data.service';
import { FakeData } from '../../mock/data';
import { StatusEntregaEnum } from '../models';
import { firstValueFrom } from 'rxjs';

describe('Data Service', () => {
  let service:DataService = <any>null;
  beforeEach(() => {
    service = new DataService();
  });


  describe('groupBy', () => {
    it('devera testar com um array de objetos simples', () => {
      const mockArr = [{name: '1'}, {name: '2'}];

      // act
      const result = service.groupBy(mockArr, (t: any) => t.name);

      // asserts
      expect(result.get('1')[0].name).toBe(mockArr[0].name)
      expect(result.get('2')[0].name).toBe(mockArr[1].name)
    });

    it('devera testar com um array complexo e apontando para cliente_destino.nome', () => {


      // act
      const result = service.groupBy(FakeData, (t: any) => t.cliente_destino.nome);

      // asserts
      expect(result.get('Maria Souza')[0].documento).toBe('01027')
      expect(result.get('Maria Souza')[1].documento).toBe('01034')
    });
  })

  describe('mapPorStatus', () => {

    it('devera mapear com um array complexo com cliente_destino.nome e status PENDENTE', () => {

      // act
      const result = service.groupBy(FakeData, (t: any) => t.cliente_destino.nome);
      const mapped = service.mapPorStatus(result, StatusEntregaEnum.PENDENTE);

      // asserts
      expect(mapped[5].total).toBe(5)
      expect(mapped[5].nome).toBe('Carla Souza')
      expect(mapped[5].quantidadeEntregas).toBe(2)
    });
  });

  describe('loadData', () => {

    it('deverá testar nossa requisição fake', async () => {

      // act
      const result: any = await firstValueFrom(service.loadData(0));

      // act
      expect(result[0]).toBe(FakeData[0])
      expect(result[1]).not.toBe(FakeData[2])
    });
  });
});

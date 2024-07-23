import { Component, OnInit } from '@angular/core';
import { FullLoadingService } from 'src/app/components/full-loading/full-loading.service';
import { AgrupamentoPorBairroEntregaModel, AgrupamentoPorNomeEntregaModel, DataModel, StatusEntregaEnum } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public colunasEntregas: string[] = ['nome', 'total', 'quantidadeEntregas'];
  public listaAndamentoEntregas: Array<AgrupamentoPorNomeEntregaModel> = [];
  public listaAndamentoEntregasSemSucesso: Array<AgrupamentoPorNomeEntregaModel> = [];

  public colunasBairro: string[] = ['bairro', 'total', 'quantidadeEntregas'];
  public listaAndamentoEntregasPorBairro: Array<AgrupamentoPorBairroEntregaModel> = [];

  constructor(
    private loadingService: FullLoadingService,
    private dataService: DataService,
  ) {
  }



  ngOnInit() {
    this.loadingService.setState(true);

    this.dataService.loadData().subscribe(data => {
      this.loadingService.setState(false);

      // Agrupa e conta as entregas por nome
      const groupedByNome = this.dataService.groupBy(data, (p: DataModel) => p.motorista?.nome);

      this.listaAndamentoEntregas = this.dataService.mapPorStatus(groupedByNome, StatusEntregaEnum.ENTREGUE);
      this.listaAndamentoEntregasSemSucesso = this.dataService.mapPorStatus(groupedByNome, StatusEntregaEnum.INSUCESSO);
      // fim de agrupamento por nome

      // Agrupa e conta as entregas por Bairro
      const groupedByBairro = this.dataService.groupBy(data, (p: DataModel) => p.cliente_destino?.bairro || p.cliente_origem?.bairro);
      this.listaAndamentoEntregasPorBairro = this.dataService.mapPorStatus(groupedByBairro, StatusEntregaEnum.ENTREGUE);
     });
  }

}

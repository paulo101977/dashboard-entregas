import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FullLoadingService } from '../../components/full-loading/full-loading.service';
import { ListagemEntregasModel } from 'src/app/models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-lista-entregas',
  templateUrl: './lista-entregas.component.html',
  styleUrls: ['./lista-entregas.component.scss']
})
export class ListaEntregasComponent implements OnInit, AfterViewInit {

  public readonly colunas = ['id', 'documento', 'motorista', 'status_entrega'];
  public listaAndamentoEntregas: MatTableDataSource<ListagemEntregasModel> = <any>null;

  @ViewChild(MatPaginator) paginator: MatPaginator = <any>null;

  constructor(
    private loadingService: FullLoadingService,
    private dataService: DataService,
  ) { }


  ngOnInit() {
    this.loadingService.setState(true);

    this
      .dataService
      .loadData()
      .subscribe(data => {
        this.loadingService.setState(false);

        this.listaAndamentoEntregas = new MatTableDataSource(data.map(d => {
          return {
            id: d.id,
            documento: d.documento,
            status_entrega: d.status_entrega,
            motorista: d.motorista?.nome,
          }
        }));

        this.listaAndamentoEntregas.paginator = this.paginator;

        this.listaAndamentoEntregas.filterPredicate = (data, filter: string): boolean => {
          return data.motorista.toLowerCase().includes(filter) || data.status_entrega.toLowerCase().includes(filter);
        };
    });
  }

  ngAfterViewInit(): void {
    if(this.paginator) {
      this.paginator._intl.itemsPerPageLabel = "Itens por página";
      this.paginator._intl.firstPageLabel = "Primeira página";
      this.paginator._intl.nextPageLabel = "Próxima página";
      this.paginator._intl.previousPageLabel = "Página anterior";
      this.paginator._intl.lastPageLabel = "Última página";
    }

  }

  public aplicarFiltro(event: Event) {
    const valorFiltrado = (event.target as HTMLInputElement)?.value;

    if(!this.listaAndamentoEntregas) {
      return;
    }

    this.listaAndamentoEntregas.filter = valorFiltrado?.trim()?.toLowerCase();


    if (this.listaAndamentoEntregas.paginator) {
      this.listaAndamentoEntregas.paginator.firstPage();
    }
  }

}

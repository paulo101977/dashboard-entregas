import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FullLoadingService } from './full-loading.service';

@Component({
  selector: 'full-loading',
  templateUrl: './full-loading.component.html',
  styleUrls: ['./full-loading.component.scss']
})
export class FullLoadingComponent implements OnDestroy, OnInit {
  /** @ignore */
  public active = false;

  private $subject: Subject<any>;

  /** @ignore */
  public constructor(
    private loadingService: FullLoadingService,
  ) {
    this.$subject = this.loadingService.getSubject();

    this.$subject.subscribe( item => {
      this.active = item.state;
    });
  }

  /** Configura o estado do Componente. Se true, o componente está visível na tela. */
  public setState(_active: boolean) {
    this.active = _active;

    this.active ? this.setScrollBody('hidden') : this.setScrollBody('auto');
  }

  /** @ignore */
  ngOnInit(): void {
    if ( this.active ) {
      this.setScrollBody('hidden');
    }
  }

  /** @ignore */
  private setScrollBody(value: string) {
    document.body.style.overflowY = value;
  }

  /** @ignore */
  ngOnDestroy(): void {
    this.setScrollBody('auto');

    // destroy the subject
    if(this.$subject) {
      this.$subject.complete();
      this.$subject = <any>null;
    }
  }
}

import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FullLoadingService implements OnDestroy {

  private _loadingSubject: Subject<any> = <any>null;

  constructor() {
    if ( !this._loadingSubject ) {
      this._loadingSubject = new Subject<any>();
    }
  }

  public setState( state: boolean ) {
    if ( !this._loadingSubject ) { return; }

    this._loadingSubject.next({
      state,
    });
  }

  public getSubject(): Subject<any>{
    return this._loadingSubject;
  }

  ngOnDestroy(): void {
    if ( this._loadingSubject ) {
      this._loadingSubject.complete();
      this._loadingSubject = <any>null;
    }
  }

}

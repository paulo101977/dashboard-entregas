
import { fakeAsync, tick } from '@angular/core/testing';
import { FullLoadingService } from './full-loading.service';
import { FullLoadingComponent } from './full-loading.component';

describe('FullLoadingComponent', () => {
  let loadingService: FullLoadingService;
  let component: FullLoadingComponent;

  beforeEach(() => {
    loadingService = new FullLoadingService();
    component = new FullLoadingComponent(loadingService);
  });

  it('Deverá criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deverá testar o constructor', fakeAsync(() => {
    component.active = false;
    loadingService.setState(true);
    tick();
    expect(component.active).toEqual(true);
  }));

  it('Deverá testar setState com true', () => {
    component['setScrollBody'] = jest.fn();
    component.setState(true);
    expect(component['setScrollBody']).toHaveBeenCalledWith('hidden');
  });

  it('Deverá testar setState com false', () => {
    component['setScrollBody'] = jest.fn();
    component.setState(false);
    expect(component['setScrollBody']).toHaveBeenCalledWith('auto');
  });

  it('Deverá testar setScrollBody', () => {
    component['setScrollBody']('test');
    expect(document.body.style.overflowY).toEqual('test');
  });

});

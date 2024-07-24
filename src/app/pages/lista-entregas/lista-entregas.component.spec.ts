/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { ListaEntregasComponent } from './lista-entregas.component';
import { SharedModule } from '../../shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import {HarnessLoader} from '@angular/cdk/testing';


describe('ListaEntregasComponent', () => {
  let component: ListaEntregasComponent;
  let fixture: ComponentFixture<ListaEntregasComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ ListaEntregasComponent ],
      imports: [SharedModule, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ListaEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deverá criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deverá testar se há o elemento na linha 2', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListaEntregasComponent);

    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();

    const linhas = fixture.debugElement
        .queryAll(By.css('.mat-mdc-row'));
    const linha = linhas[1].nativeElement.innerHTML;

    expect(linha).toContain('Carla Souza');
    expect(linha).not.toContain('INSUCESSO');
  }));

  it('Deverá testar o filtro aplicado', fakeAsync(() => {
    const fixture = TestBed.createComponent(ListaEntregasComponent);


    fixture.detectChanges();
    tick(3000);
    fixture.detectChanges();

    const el = fixture.debugElement
        .query(By.css('input')).nativeElement;
    el.value = 'Maria Oliveira';
    el.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    const linhas = fixture.debugElement
        .queryAll(By.css('.mat-mdc-row'));
    const linha = linhas[1].nativeElement.innerHTML;

    expect(linha).toContain(el.value);
    expect(linha).toContain('ENTREGUE');
  }));
});

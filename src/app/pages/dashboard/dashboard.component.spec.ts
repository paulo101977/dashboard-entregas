/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const makeTest = (table: number, params: Array<any>) => {
  const fixture = TestBed.createComponent(DashboardComponent);

  fixture.detectChanges();
  tick(3000);
  fixture.detectChanges();

  const tabelas = fixture.debugElement
      .queryAll(By.css('table'));
  const linhas = tabelas[table].nativeElement.querySelectorAll('.mat-mdc-row');
  const linha = linhas[1].innerHTML;

  expect(linha).toContain(params[0]);
  expect(linha).toContain(params[1]);
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule,
      ],
      declarations: [
        DashboardComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deverá criar', () => {
    expect(component).toBeTruthy();
  });

  it('Deverá testar se há o elemento na linha 2 da tabela 1', fakeAsync(() => {
    makeTest(0, ['Carla Souza', '3']);
  }));

  it('Deverá testar se há o elemento na linha 2 da tabela 2', fakeAsync(() => {
    makeTest(1, ['Carla Souza', '3']);
  }));

  it('Deverá testar se há o elemento na linha 2 da tabela 3', fakeAsync(() => {

    makeTest(2, ['Jardins', '6']);
  }));
});

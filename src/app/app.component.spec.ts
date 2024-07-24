import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FullLoadingComponent } from './components/full-loading/full-loading.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule,
      ],
      declarations: [
        FullLoadingComponent,
        AppComponent
      ],
    }).compileComponents();
  });

  it('Deverá criar o app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`Deverá ter um título vazio`,() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('');
  });
});

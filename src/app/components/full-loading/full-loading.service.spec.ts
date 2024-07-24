
import { FullLoadingService } from "./full-loading.service";

describe('Service: FullLoading', () => {
  let service: FullLoadingService;
  beforeEach(() => {
    service  = new FullLoadingService();
    service['_loadingSubject'].next = jest.fn();
  });

  it('Deverá criar ...', () => {
    expect(service).toBeTruthy();
  });

  it('Deverá testar setState', () => {
    service.setState(true);
    expect(service['_loadingSubject'].next).toHaveBeenCalledWith({state: true});
  });
});


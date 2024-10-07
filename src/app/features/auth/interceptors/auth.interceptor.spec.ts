import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';
import { TokenService } from '../services/TokenService/Token.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let tokenService: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header', () => {
    const testUrl = '/test';
    const token = '12345';

    spyOn(tokenService, 'getCookie').and.returnValue(token);

    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should handle 401 errors and refresh the token', () => {
    const testUrl = '/test';
    const newToken = 'newToken';

    spyOn(tokenService, 'refreshToken').and.returnValue(of({ token: newToken }));
    spyOn(tokenService, 'setAuthToken');

    httpClient.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    req.flush(null, { status: 401, statusText: 'Unauthorized' });

    const refreshReq = httpMock.expectOne('/refreshtoken.php');
    refreshReq.flush({ token: newToken });

    const retryReq = httpMock.expectOne(testUrl);
    expect(retryReq.request.headers.get('Authorization')).toBe(`Bearer ${newToken}`);
    expect(tokenService.setAuthToken).toHaveBeenCalledWith(newToken);
  });
});

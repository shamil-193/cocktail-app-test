import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Cocktail, CocktailResponse } from '../interfaces/cocktail.interface';
import { ToastService } from './error-handler.service';
import { ApiEndpoints } from '../../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly apiUrl: string = environment.api.baseUrl;
  private readonly endpoints: ApiEndpoints = environment.api.endpoints;

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastService,
  ) {}

  searchCocktails(name: string): Observable<Cocktail[]> {
    return this.http.get<CocktailResponse>(
      `${this.apiUrl}${this.endpoints.search}`,
      { params: { s: name } })
      .pipe(
        map((response: CocktailResponse) => response.drinks || []),
        catchError(error => {
          this.handleError('searchCocktails', error);
          throw error;
        })
      );
  }

  getRandomCocktail(): Observable<Cocktail> {
    return this.http.get<CocktailResponse>(`${this.apiUrl}${this.endpoints.random}`)
      .pipe(
        map((response: CocktailResponse) => {
          if (!response.drinks?.length) {
            throw new Error('No cocktail found');
          }
          return response.drinks[0];
        }),
        catchError(error => {
          this.handleError('getRandomCocktail', error);
          throw error;
        })
      );
  }

  private handleError(operation: string, error: HttpErrorResponse): void {
    let errorMessage: string;

    if (error.status === 0) {
      errorMessage = 'No internet connection';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    this.toast.showError(`${operation} failed: ${errorMessage}`);
  }
}

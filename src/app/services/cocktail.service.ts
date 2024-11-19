import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Cocktail, CocktailResponse } from '../interfaces/cocktail.interface';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService,
  ) {}

  searchCocktails(name: string): Observable<Cocktail[]> {
    return this.http.get<CocktailResponse>(`${this.apiUrl}/search.php?s=${name}`)
      .pipe(
        map((response: CocktailResponse) => response.drinks || []),
        catchError(error => {
          console.log('errrr');
          this.handleError('searchCocktails', error);
          return of([]);
        })
      );
  }

  getRandomCocktail(): Observable<Cocktail> {
    return this.http.get<any>(`${this.apiUrl}/random.php`)
      .pipe(
        map(response => response.drinks[0])
      );
  }

  private handleError(operation: string, error: any): void {
    let errorMessage = 'An error occurred';

    if (error.status === 0) {
      errorMessage = 'No internet connection';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log('0000');
    this.errorHandler.showError(`${operation} failed: ${errorMessage}`);
  }
}

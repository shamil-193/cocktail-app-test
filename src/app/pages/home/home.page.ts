import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonList, IonModal,
  IonRow,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailService } from '../../services/cocktail.service';
import { ModalController } from '@ionic/angular';
import { CocktailDetailsComponent } from '../../components/cocktail-details/cocktail-details.component';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormsModule,
    IonSearchbar,
    IonGrid,
    IonCol,
    IonRow,
    IonIcon,
    IonButton,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonSpinner,
    IonModal,
    CocktailDetailsComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  protected searchTerm: WritableSignal<string> = signal<string>('');
  protected cocktails: WritableSignal<Cocktail[]> = signal<Cocktail[]>([]);
  protected currentCocktail: WritableSignal<Cocktail | undefined> = signal<Cocktail | undefined>(undefined);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(false);
  protected hasError: WritableSignal<boolean> = signal<boolean>(false);
  protected hasSearched: WritableSignal<boolean> = signal<boolean>(false);
  protected isModalOpen: WritableSignal<boolean> = signal<boolean>(false);
  protected isRandom: WritableSignal<boolean> = signal<boolean>(false);

  protected canSearch: Signal<boolean> = computed<boolean>(() =>
    this.searchTerm().trim().length > 0
  );

  protected showNoResults: Signal<boolean> = computed<boolean>(() =>
    !this.isLoading() &&
    !this.hasError() &&
    this.hasSearched() &&
    this.cocktails().length === 0
  );

  constructor(
    private readonly cocktailService: CocktailService,
  ) {}

  protected search(): void {
    if (this.canSearch()) {
      this.isLoading.set(true);
      this.hasError.set(false);
      this.hasSearched.set(true);

      this.cocktailService.searchCocktails(this.searchTerm())
        .pipe(
          catchError(() => {
            this.hasError.set(true);
            return of([]);
          }),
          finalize(() => this.isLoading.set(false))
        )
        .subscribe(results => {
          this.cocktails.set(results);
        });
    }
  }

  protected onSearchChange(event: any): void {
    this.searchTerm.set(event.detail.value);
  }

  protected async getRandomCocktail(): Promise<void> {
    this.isRandom.set(true);
    this.isModalOpen.set(true);
  }

  protected async showDetails(cocktail: Cocktail): Promise<void> {
    this.isRandom.set(false);
    this.currentCocktail.set(cocktail);
    this.isModalOpen.set(true);
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
    this.hasError.set(false);
    this.hasSearched.set(false);
  }
}

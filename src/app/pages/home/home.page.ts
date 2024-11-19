import { ChangeDetectionStrategy, Component, computed, Signal, signal, WritableSignal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
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
  IonIcon, IonItem,
  IonList,
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
  imports: [ IonContent, IonItem, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSpinner],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  searchTerm: WritableSignal<string> = signal<string>('');
  cocktails: WritableSignal<Cocktail[]> = signal<Cocktail[]>([]);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  hasError: WritableSignal<boolean> = signal<boolean>(false);
  hasSearched: WritableSignal<boolean> = signal<boolean>(false);

  canSearch: Signal<boolean> = computed<boolean>(() =>
    this.searchTerm().trim().length > 0
  );

  showNoResults: Signal<boolean> = computed<boolean>(() =>
    !this.isLoading() &&
    !this.hasError() &&
    this.hasSearched() &&
    this.cocktails().length === 0
  );

  constructor(
    private cocktailService: CocktailService,
    private modalCtrl: ModalController
  ) {}

  search(): void {
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

  onSearchChange(event: any): void {
    this.searchTerm.set(event.detail.value);
  }

  async getRandomCocktail(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CocktailDetailsComponent,
      componentProps: {
        isRandom: true
      }
    });
    return await modal.present();
  }

  async showDetails(cocktail: Cocktail): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: CocktailDetailsComponent,
      componentProps: {
        isRandom: false,
        cocktail
      }
    });
    return await modal.present();
  }

  clearSearch(): void {
    this.searchTerm.set('');
    this.hasError.set(false);
    this.hasSearched.set(false);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed, EventEmitter,
  Input, Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailService } from '../../services/cocktail.service';
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonSpinner, IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cocktail-details',
  templateUrl: './cocktail-details.component.html',
  styleUrls: ['./cocktail-details.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonIcon,
    IonButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonChip,
    IonCardSubtitle,
    IonLabel,
    IonCardContent,
    IonList,
    IonItem,
    IonListHeader,
    IonText,
    IonSpinner,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailDetailsComponent {
  @Input() set cocktail(value: Cocktail | undefined) {
    this.cocktailSignal.set(value);
  }

  @Input() set isRandom(value: boolean) {
    if (value) {
      this.loadRandomCocktail();
    }
  }

  @Output() closeModal = new EventEmitter<boolean>();

  protected cocktailSignal: WritableSignal<Cocktail | undefined> = signal<Cocktail | undefined>(undefined);
  protected errorSignal: WritableSignal<string | null> = signal<string | null>(null);
  protected isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);

  protected ingredients = computed(() => {
    const cocktail = this.cocktailSignal();
    if (!cocktail) return [];

    const ingredients: string[] = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail];

      if (!ingredient) break;

      if (ingredient) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  });

  constructor(
    private readonly cocktailService: CocktailService
  ) {}

  private loadRandomCocktail(): void {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);

    this.cocktailService.getRandomCocktail().subscribe({
      next: (cocktail) => {
        this.cocktailSignal.set(cocktail);
        this.isLoadingSignal.set(false);
      },
      error: (error) => {
        this.errorSignal.set('Failed to load cocktail. Please try again later.');
        this.isLoadingSignal.set(false);
      }
    });
  }

  protected dismiss(): void {
    this.closeModal.emit(true)
  }
  protected retry(): void {
    this.loadRandomCocktail();
  }

}

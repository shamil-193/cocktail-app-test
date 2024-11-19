import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { ModalController } from '@ionic/angular';
import { CocktailService } from '../../services/cocktail.service';
import {
  IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonText,
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailDetailsComponent  implements OnInit {
  @Input() cocktail?: Cocktail;
  @Input() isRandom: boolean = false;

  ingredients: string[] = [];

  constructor(
    private modalCtrl: ModalController,
    private cocktailService: CocktailService
  ) {}

  ngOnInit() {
    if (this.isRandom) {
      this.loadRandomCocktail();
    } else {
      this.extractIngredients();
    }
  }

  private loadRandomCocktail() {
    this.cocktailService.getRandomCocktail().subscribe(cocktail => {
      this.cocktail = cocktail;
      this.extractIngredients();
    });
  }

  private extractIngredients() {
    if (!this.cocktail) return;

    this.ingredients = [];
    for (let i = 1; i <= 15; i++) {
      const ingredient = this.cocktail[`strIngredient${i}` as keyof Cocktail];
      if (ingredient) {
        this.ingredients.push(ingredient);
      }
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}

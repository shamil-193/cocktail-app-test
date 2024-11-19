import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon, IonList,
  IonRow,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Cocktail } from '../../interfaces/cocktail.interface';
import { CocktailService } from '../../services/cocktail.service';
import { ModalController } from '@ionic/angular';
import { CocktailDetailsComponent } from '../../components/cocktail-details/cocktail-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar, IonGrid, IonCol, IonRow, IonIcon, IonButton, IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle],
})
export class HomePage {
  searchTerm: string = '';
  cocktails: Cocktail[] = [];

  constructor(
    private cocktailService: CocktailService,
    private modalCtrl: ModalController
  ) {}

  search() {
    if (this.searchTerm) {
      this.cocktailService.searchCocktails(this.searchTerm)
        .subscribe(results => {
          this.cocktails = results;
        });
    }
  }

  onSearchChange(event: any) {
    this.searchTerm = event.detail.value;
    // Опционально: можно добавить автоматический поиск при вводе
    // if (this.searchTerm && this.searchTerm.length >= 3) {
    //   this.search();
    // }
  }

  async getRandomCocktail() {
    const modal = await this.modalCtrl.create({
      component: CocktailDetailsComponent,
      componentProps: {
        isRandom: true
      }
    });
    return await modal.present();
  }

  async showDetails(cocktail: Cocktail) {
    const modal = await this.modalCtrl.create({
      component: CocktailDetailsComponent,
      componentProps: {
        cocktail: cocktail
      }
    });
    return await modal.present();
  }
}

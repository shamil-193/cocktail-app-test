import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastController: ToastController) {}

  async showError(message: string) {
    console.log('222');
    // const toast = await this.toastController.create({
    //   message,
    //   duration: 3000,
    //   position: 'bottom',
    //   color: 'danger',
    //   buttons: [
    //     {
    //       text: 'OK',
    //       role: 'cancel'
    //     }
    //   ]
    // });
    // await toast.present();
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: 'top',
    });

    await toast.present();
    // }
  }
}

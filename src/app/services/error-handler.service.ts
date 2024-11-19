import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

export interface ToastOptions {
  message: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  color?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger' | 'light' | 'medium' | 'dark';
  showCloseButton?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly defaultOptions: Omit<ToastOptions, 'message'> = {
    duration: 3000,
    position: 'bottom',
    color: 'danger',
    showCloseButton: true
  };

  constructor(private toastController: ToastController) {}

  async showError(message: string) {
    try {
      const toast = await this.toastController.create({
        ...this.defaultOptions,
        message
      });

      await toast.present();
    } catch (error) {
      console.error('Failed to show error toast:', error);
    }
  }
}

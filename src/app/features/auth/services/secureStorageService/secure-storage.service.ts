import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx'; // Asegúrate de importar SecureStorageObject correctamente

@Injectable({
  providedIn: 'root',
})
export class SecureStorageService {
  private authStorage!: SecureStorageObject;
  private refreshStorage!: SecureStorageObject;

  constructor(private secureStorage: SecureStorage) {
    this.init();
  }

  async init() {
    try {
      this.authStorage = await this.secureStorage.create('auth_token');
      this.refreshStorage = await this.secureStorage.create('refresh_token');
    } catch (error) {
      console.error('Error al inicializar SecureStorage:', error);
    }
  }

  async setAuthToken(token: string): Promise<void> {
    try {
      await this.authStorage.set('auth_token', token);
    } catch (error) {
      console.error('Error al guardar el auth_token:', error);
    }
  }

  async getAuthToken(): Promise<string | null> {
    try {
      return await this.authStorage.get('auth_token');
    } catch (error) {
      console.error('Error al obtener el auth_token:', error);
      return null;
    }
  }

  async setRefreshToken(token: string): Promise<void> {
    try {
      await this.refreshStorage.set('refresh_token', token);
    } catch (error) {
      console.error('Error al guardar el refresh_token:', error);
    }
  }

  async getRefreshToken(): Promise<string | null> {
    try {
      return await this.refreshStorage.get('refresh_token');
    } catch (error) {
      console.error('Error al obtener el refresh_token:', error);
      return null;
    }
  }

  async clearTokens(): Promise<void> {
    try {
      await this.authStorage.remove('auth_token');
      await this.refreshStorage.remove('refresh_token');
    } catch (error) {
      console.error('Error al eliminar los tokens:', error);
    }
  }
}

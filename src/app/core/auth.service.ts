import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const SESSION_KEY = 'gn_admin_session';
/** Contraseña local del panel admin. Cámbiala por una segura. */
const ADMIN_PASSWORD = 'gallonegro2024';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _isLoggedIn = signal(false);
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  constructor() {
    if (this.isBrowser) {
      this._isLoggedIn.set(sessionStorage.getItem(SESSION_KEY) === '1');
    }
  }

  signIn(password: string): { error: string | null } {
    if (password === ADMIN_PASSWORD) {
      if (this.isBrowser) sessionStorage.setItem(SESSION_KEY, '1');
      this._isLoggedIn.set(true);
      return { error: null };
    }
    return { error: 'Contraseña incorrecta' };
  }

  signOut(): void {
    if (this.isBrowser) sessionStorage.removeItem(SESSION_KEY);
    this._isLoggedIn.set(false);
  }
}

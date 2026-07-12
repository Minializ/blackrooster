import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { MenuCategory } from '../app';

export interface ProductRow {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: MenuCategory;
}

const STORAGE_KEY = 'gn_menu_items';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  private readonly _products = signal<ProductRow[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly products = this._products.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  loadProducts(): void {
    if (!this.isBrowser) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) this._products.set(JSON.parse(raw) as ProductRow[]);
    } catch {
      // Datos corruptos en localStorage — ignorar
    }
  }

  private persist(list: ProductRow[]): void {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
  }

  addProduct(
    item: { name: string; description: string; price: number; category: MenuCategory },
    imageUrl: string
  ): { error: string | null } {
    const row: ProductRow = {
      id: crypto.randomUUID(),
      name: item.name,
      description: item.description,
      price: item.price,
      image_url: imageUrl,
      category: item.category,
    };
    const updated = [row, ...this._products()];
    this._products.set(updated);
    this.persist(updated);
    return { error: null };
  }

  updateProduct(
    id: string,
    changes: Partial<Omit<ProductRow, 'id'>>
  ): { error: string | null } {
    const updated = this._products().map(p =>
      p.id === id ? { ...p, ...changes } : p
    );
    this._products.set(updated);
    this.persist(updated);
    return { error: null };
  }

  deleteProduct(id: string): { error: string | null } {
    const updated = this._products().filter(p => p.id !== id);
    this._products.set(updated);
    this.persist(updated);
    return { error: null };
  }
}

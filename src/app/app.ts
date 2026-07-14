import { CommonModule } from '@angular/common';
import { Component, signal, computed, afterNextRender, inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './core/auth.service';
import { ProductsService } from './core/products.service';
import type { ProductRow } from './core/products.service';

export type MenuCategory = 'Especialidades' | 'Bebidas' | 'Snacks' | 'Postres';


export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
}

export interface RestaurantInfo {
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly address: string;
  readonly mapsLink: string;
  readonly phoneDisplay: string;
  readonly phoneRaw: string;
  readonly whatsappLink: string;
  readonly facebookLink: string;
  readonly hours: string;
  readonly rating: string;
  readonly category: string;
  readonly note: string;
}

const DEFAULT_MENU: MenuItem[] = [
  {
    name: 'Papas preparadas',
    description: 'Papas crujientes con salsas, queso y toppings al gusto.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=1200&q=80',
    category: 'Snacks'
  },
  {
    name: 'Alitas BBQ',
    description: 'Alitas jugosas bañadas en salsa BBQ con aderezo ranch.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1200&q=80',
    category: 'Especialidades'
  },
  {
    name: 'Hamburguesa especial',
    description: 'Carne, queso, vegetales frescos y papas a la francesa.',
    price: 165,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80',
    category: 'Especialidades'
  },
  {
    name: 'Malteada de chocolate',
    description: 'Bebida cremosa y fría, ideal para acompañar tus snacks.',
    price: 79,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1200&q=80',
    category: 'Bebidas'
  }
];

function productToItem(p: ProductRow): MenuItem {
  return {
    name: p.name,
    description: p.description,
    price: Number(p.price),
    image: p.image_url,
    category: p.category as MenuCategory
  };
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private readonly auth = inject(AuthService);
  private readonly productsService = inject(ProductsService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly title = signal('Gallo Negro');
  readonly categories: MenuCategory[] = ['Especialidades', 'Bebidas', 'Snacks', 'Postres'];

  // ── Auth ──────────────────────────────────────────────────────────────────
  readonly showAuthForm = signal(false);
  readonly authError = signal<string | null>(null);
  readonly authLoading = signal(false);
  authPassword = '';
  readonly isLoggedIn = this.auth.isLoggedIn;

  // ── CRUD del menú ─────────────────────────────────────────────────────────
  readonly addProductError = signal<string | null>(null);
  readonly editingId = signal<string | null>(null);
  readonly imagePreview = signal<string | null>(null);
  newItem: MenuItem = this.createEmptyMenuItem();

  // ── Galería de fotos / Banner ─────────────────────────────────────────────
  private readonly BANNER_KEY = 'gn_banner_photos';
  readonly bannerPhotos = signal<string[]>([]);
  readonly bannerPhotoPreview = signal<string | null>(null);

  /** Usa items de localStorage; si aún no hay, muestra el menú por defecto */
  readonly menuItems = computed<MenuItem[]>(() => {
    const list = this.productsService.products();
    return list.length > 0 ? list.map(productToItem) : DEFAULT_MENU;
  });

  /** true cuando se muestra el menú por defecto (sin edición posible) */
  readonly usingDefaultMenu = computed(() => this.productsService.products().length === 0);

  constructor() {
    afterNextRender(() => {
      this.productsService.loadProducts();
      try {
        const raw = localStorage.getItem(this.BANNER_KEY);
        if (raw) this.bannerPhotos.set(JSON.parse(raw) as string[]);
      } catch { /* datos corruptos — ignorar */ }
      this.startSlider();
    });
  }

  ngAfterViewInit(): void {
    // PayPal donate button — si tienes un hosted_button_id real, descomenta el bloque de abajo.
    // Por ahora se usa un enlace estático como fallback.
  }

  readonly restaurant: RestaurantInfo = {
    name: 'Gallo Negro',
    tagline: 'Snacks, bebidas y antojos para compartir en un ambiente relajado.',
    description:
      'Disfruta una experiencia casual con snacks preparados al momento, bebidas frías y un espacio ideal para reunirte con amigos o familia.',
    address: 'Progreso 89, General Andrés Figueroa, 45765 Andrés Figueroa, Jal.',
    mapsLink: 'https://maps.app.goo.gl/8758m4cR59pZzm717',
    phoneDisplay: '33 2204 4220',
    phoneRaw: '523322044220',
    whatsappLink: 'https://wa.me/523322044220',
    facebookLink: 'https://www.facebook.com/SnacksElgallonegro',
    hours: 'Abierto de 1:00 p.m. a 11:00 p.m.',
    rating: '5.0',
    category: 'Snack bar',
    note: ''
  };

  gallery: string[] = [
    'gallery/restaurante.jpg',
    'gallery/comida.jpg',
    'gallery/comida2.jpg',
    'gallery/restaurante2.jpg',
    'gallery/restaurante3.jpg',
    'gallery/image_443c2c02.png',
    'gallery/image_608382a8.png',
    'gallery/image_82a176dc.png',
    'gallery/image_fd2eb820.png'
  ];

  // ── Slider ────────────────────────────────────────────────────────────────
  readonly currentSlide = signal(0);
  private slideInterval: ReturnType<typeof setInterval> | null = null;

  // ── Slider methods ────────────────────────────────────────────────────────
  startSlider(): void {
    this.slideInterval = setInterval(() => this.nextSlide(), 4000);
  }

  nextSlide(): void {
    this.currentSlide.update(i => (i + 1) % this.gallery.length);
  }

  prevSlide(): void {
    this.currentSlide.update(i => (i - 1 + this.gallery.length) % this.gallery.length);
  }

  goToSlide(index: number): void {
    this.currentSlide.set(index);
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.startSlider();
  }

  get featuredItems(): MenuItem[] {
    return this.menuItems().slice(0, 3);
  }

  get groupedMenu(): { category: MenuCategory; items: MenuItem[] }[] {
    return this.categories
      .map((category) => ({
        category,
        items: this.menuItems().filter((item) => item.category === category)
      }))
      .filter((group) => group.items.length > 0);
  }

  toggleAuthForm(): void {
    this.showAuthForm.update((v) => !v);
    this.authError.set(null);
    this.authPassword = '';
  }

  submitAuth(): void {
    this.authError.set(null);
    this.authLoading.set(true);
    const password = this.authPassword;
    if (!password) {
      this.authError.set('La contraseña es obligatoria');
      this.authLoading.set(false);
      return;
    }
    const result = this.auth.signIn(password);
    this.authLoading.set(false);
    if (result.error) {
      this.authError.set(result.error);
      return;
    }
    this.showAuthForm.set(false);
    this.authPassword = '';
  }

  signOut(): void {
    this.auth.signOut();
    this.showAuthForm.set(false);
  }

  // ── Métodos CRUD ──────────────────────────────────────────────────────────

  openEditForm(item: MenuItem): void {
    const row = this.productsService.products()
      .find(p => p.name === item.name && p.price === item.price);
    if (!row) return;
    this.editingId.set(row.id);
    this.newItem = { ...item };
    this.addProductError.set(null);
    document.getElementById('admin-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.newItem = this.createEmptyMenuItem();
    this.addProductError.set(null);
    this.imagePreview.set(null);
  }

  onImageFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  addMenuItem(): void {
    const item = this.newItem;
    const name = item.name.trim();
    const description = item.description.trim();
    const imageUrl = item.image.trim();
    const price = Number(item.price);

    if (!name || !description) {
      this.addProductError.set('Nombre y descripción son obligatorios');
      return;
    }
    if (price <= 0) {
      this.addProductError.set('El precio debe ser mayor a 0');
      return;
    }
    const finalImageUrl = this.imagePreview() || imageUrl;
    if (!finalImageUrl) {
      this.addProductError.set('Agrega una imagen (URL o selecciona un archivo)');
      return;
    }

    this.addProductError.set(null);
    const id = this.editingId();

    if (id) {
      this.productsService.updateProduct(id, {
        name, description, price, category: item.category, image_url: finalImageUrl
      });
      this.editingId.set(null);
    } else {
      this.productsService.addProduct({ name, description, price, category: item.category }, finalImageUrl);
    }
    this.newItem = this.createEmptyMenuItem();
    this.imagePreview.set(null);
  }

  deleteMenuItem(item: MenuItem): void {
    const row = this.productsService.products()
      .find(p => p.name === item.name && p.price === item.price);
    if (!row) return;
    if (!confirm(`¿Eliminar "${item.name}" del menú?`)) return;
    this.productsService.deleteProduct(row.id);
  }

  // ── Galería de fotos ──────────────────────────────────────────────────────

  onBannerFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.bannerPhotoPreview.set(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  addBannerPhoto(): void {
    const src = this.bannerPhotoPreview();
    if (!src) return;
    const updated = [...this.bannerPhotos(), src];
    this.bannerPhotos.set(updated);
    localStorage.setItem(this.BANNER_KEY, JSON.stringify(updated));
    this.bannerPhotoPreview.set(null);
  }

  deleteBannerPhoto(index: number): void {
    if (!confirm('¿Eliminar esta foto de la galería?')) return;
    const updated = this.bannerPhotos().filter((_, i) => i !== index);
    this.bannerPhotos.set(updated);
    localStorage.setItem(this.BANNER_KEY, JSON.stringify(updated));
  }

  trackByCategory(_index: number, group: { category: MenuCategory }): string {
    return group.category;
  }

  trackByItem(_index: number, item: MenuItem): string {
    return `${item.category}-${item.name}-${item.image}`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  }

  private createEmptyMenuItem(): MenuItem {
    return {
      name: '',
      description: '',
      price: 0,
      image: '',
      category: 'Snacks'
    };
  }
}

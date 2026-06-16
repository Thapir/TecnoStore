import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Product, Category } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private products: Product[] = [
    {
      id: 1, name: 'Auriculares Inalámbricos', description: 'Auriculares inalámbricos premium con cancelación de ruido y 30h de batería. Graves profundos y agudos cristalinos.',
      price: 89.99, originalPrice: 129.99, image: 'https://placehold.co/400x400/1e293b/ffffff?text=Auriculares',
      images: ['https://placehold.co/600x600/1e293b/ffffff?text=Auriculares+1', 'https://placehold.co/600x600/334155/ffffff?text=Auriculares+2'],
      category: 'Electrónica', rating: 4.5, reviewCount: 234, stock: 50, sku: 'WH-001', tags: ['inalámbrico', 'audio', 'bluetooth'], featured: true
    },
    {
      id: 2, name: 'Reloj Inteligente Pro', description: 'Smartwatch avanzado con monitor de ritmo cardíaco, GPS y pantalla AMOLED.',
      price: 199.99, originalPrice: 249.99, image: 'https://placehold.co/400x400/0f766e/ffffff?text=SmartWatch',
      category: 'Electrónica', rating: 4.7, reviewCount: 189, stock: 30, sku: 'SW-002', tags: ['wearable', 'fitness'], featured: true
    },
    {
      id: 3, name: 'Zapatillas de Running', description: 'Zapatillas livianas para correr con amortiguación responsiva y parte superior de malla transpirable.',
      price: 74.99, image: 'https://placehold.co/400x400/7c3aed/ffffff?text=Zapatillas',
      category: 'Deportes', rating: 4.3, reviewCount: 312, stock: 100, sku: 'RS-003', tags: ['running', 'fitness'], featured: true
    },
    {
      id: 4, name: 'Mochila de Cuero', description: 'Mochila de cuero genuino artesanal con compartimento acolchado para laptop. Perfecta para trabajo y viajes.',
      price: 149.99, image: 'https://placehold.co/400x400/92400e/ffffff?text=Mochila',
      category: 'Accesorios', rating: 4.8, reviewCount: 156, stock: 25, sku: 'LB-004', tags: ['cuero', 'viaje'], featured: true
    },
    {
      id: 5, name: 'Teclado Mecánico', description: 'Teclado mecánico RGB con switches intercambiables y keycaps PBT premium.',
      price: 119.99, image: 'https://placehold.co/400x400/1e3a5f/ffffff?text=Teclado',
      category: 'Electrónica', rating: 4.6, reviewCount: 278, stock: 45, sku: 'MK-005', tags: ['gaming', 'periféricos']
    },
    {
      id: 6, name: 'Colchoneta de Yoga Premium', description: 'Colchoneta de yoga ecológica antideslizante con líneas de alineación. 6mm de grosor para mayor comodidad.',
      price: 39.99, image: 'https://placehold.co/400x400/065f46/ffffff?text=Yoga',
      category: 'Deportes', rating: 4.4, reviewCount: 198, stock: 80, sku: 'YM-006', tags: ['yoga', 'fitness']
    },
    {
      id: 7, name: 'Anteojos de Sol Clásicos', description: 'Anteojos de sol polarizados UV400 con marco de titanio. Diseño aviador atemporal.',
      price: 59.99, originalPrice: 79.99, image: 'https://placehold.co/400x400/78350f/ffffff?text=Anteojos',
      category: 'Accesorios', rating: 4.2, reviewCount: 145, stock: 60, sku: 'SG-007', tags: ['lentes', 'moda']
    },
    {
      id: 8, name: 'Parlante Bluetooth', description: 'Parlante portátil resistente al agua con sonido 360° y 20h de reproducción.',
      price: 49.99, image: 'https://placehold.co/400x400/4c1d95/ffffff?text=Parlante',
      category: 'Electrónica', rating: 4.5, reviewCount: 321, stock: 70, sku: 'BS-008', tags: ['audio', 'portátil']
    },
    {
      id: 9, name: 'Pack Remeras de Algodón', description: 'Remeras premium de algodón orgánico 100%. Pack de 3 en colores surtidos.',
      price: 34.99, image: 'https://placehold.co/400x400/1e40af/ffffff?text=Remeras',
      category: 'Ropa', rating: 4.1, reviewCount: 412, stock: 200, sku: 'TS-009', tags: ['algodón', 'básicos']
    },
    {
      id: 10, name: 'Campera de Jean', description: 'Campera de jean clásica con corte moderno. Durable y con estilo para cualquier temporada.',
      price: 89.99, originalPrice: 109.99, image: 'https://placehold.co/400x400/1e3a5f/ffffff?text=Campera',
      category: 'Ropa', rating: 4.6, reviewCount: 167, stock: 35, sku: 'DJ-010', tags: ['denim', 'abrigo']
    },
    {
      id: 11, name: 'Pulsera Fitness', description: 'Pulsera fitness delgada con monitoreo de sueño, contador de pasos y notificaciones.',
      price: 29.99, image: 'https://placehold.co/400x400/166534/ffffff?text=FitBand',
      category: 'Electrónica', rating: 4.0, reviewCount: 289, stock: 90, sku: 'FT-011', tags: ['wearable', 'fitness']
    },
    {
      id: 12, name: 'Zapatillas de Lona', description: 'Zapatillas de lona clásicas con suela de goma vulcanizada. Disponibles en varios colores.',
      price: 44.99, image: 'https://placehold.co/400x400/991b1b/ffffff?text=Zapatillas',
      category: 'Ropa', rating: 4.3, reviewCount: 356, stock: 120, sku: 'CS-012', tags: ['casual', 'calzado']
    }
  ];

  private categories: Category[] = [
    { id: 1, name: 'Electrónica', icon: 'pi pi-desktop', slug: 'electronics', productCount: 5 },
    { id: 2, name: 'Ropa', icon: 'pi pi-tag', slug: 'clothing', productCount: 3 },
    { id: 3, name: 'Deportes', icon: 'pi pi-heart', slug: 'sports', productCount: 2 },
    { id: 4, name: 'Accesorios', icon: 'pi pi-star', slug: 'accessories', productCount: 2 }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products).pipe(delay(300));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(p => p.id === id)).pipe(delay(200));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(p => p.category.toLowerCase() === category.toLowerCase())).pipe(delay(300));
  }

  getFeaturedProducts(): Observable<Product[]> {
    return of(this.products.filter(p => p.featured)).pipe(delay(300));
  }

  searchProducts(query: string): Observable<Product[]> {
    const q = query.toLowerCase();
    return of(this.products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags?.some(t => t.includes(q))
    )).pipe(delay(300));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories).pipe(delay(200));
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product, CartItem, Cart } from '../models';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly TAX_RATE = 0.21;
  private readonly SHIPPING_THRESHOLD = 100;
  private readonly SHIPPING_COST = 9.99;

  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<Cart>(this.calculateCart());

  cart$ = this.cartSubject.asObservable();

  constructor(private messageService: MessageService) {
    this.loadFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.updateCart();
    this.messageService.add({
      severity: 'success',
      summary: 'Agregado al Carrito',
      detail: `${product.name} fue agregado a tu carrito`
    });
  }

  removeFromCart(productId: number): void {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.items = [];
    this.updateCart();
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  private calculateCart(): Cart {
    const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * this.TAX_RATE;
    const shipping = subtotal >= this.SHIPPING_THRESHOLD ? 0 : this.SHIPPING_COST;
    return {
      items: [...this.items],
      totalItems,
      subtotal,
      tax,
      shipping,
      total: subtotal + tax + shipping
    };
  }

  private updateCart(): void {
    this.cartSubject.next(this.calculateCart());
    this.saveToStorage();
  }

  private saveToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = JSON.parse(saved);
      this.cartSubject.next(this.calculateCart());
    }
  }
}

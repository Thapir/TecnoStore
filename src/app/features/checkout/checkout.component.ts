import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/models';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: Cart = { items: [], totalItems: 0, subtotal: 0, tax: 0, shipping: 0, total: 0 };
  activeStep = 0;
  orderPlaced = false;

  steps: MenuItem[] = [
    { label: 'Envío' },
    { label: 'Pago' },
    { label: 'Revisión' }
  ];

  shippingForm!: FormGroup;
  paymentMethod = 'credit';

  countries = [
    { label: 'Argentina', value: 'AR' },
    { label: 'España', value: 'ES' },
    { label: 'México', value: 'MX' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Estados Unidos', value: 'US' },
    { label: 'Reino Unido', value: 'UK' },
    { label: 'Canadá', value: 'CA' }
  ];

  private sub!: Subscription;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      if (cart.items.length === 0 && !this.orderPlaced) {
        this.router.navigate(['/cart']);
      }
    });

    this.shippingForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  nextStep(): void {
    if (this.activeStep === 0 && this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      this.messageService.add({
        severity: 'warn',
        summary: 'Incompleto',
        detail: 'Por favor completá todos los campos obligatorios'
      });
      return;
    }
    this.activeStep++;
  }

  prevStep(): void {
    this.activeStep--;
  }

  placeOrder(): void {
    this.orderPlaced = true;
    this.cartService.clearCart();
    this.messageService.add({
      severity: 'success',
      summary: 'Pedido Realizado!',
      detail: 'Tu pedido fue realizado con éxito',
      life: 5000
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  isFieldInvalid(field: string): boolean {
    const control = this.shippingForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

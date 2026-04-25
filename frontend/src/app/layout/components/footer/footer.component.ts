import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer-container py-6 px-4">
      <div class="max-w-screen-xl mx-auto grid">
        <!-- Brand -->
        <div class="col-12 md:col-4 mb-4 md:mb-0">
          <div class="footer-brand mb-3">
            <img src="assets/logo/tecnoshop-logo-inverso.svg" alt="" class="footer-mark" width="32" height="32">
            <span class="footer-wordmark"><span class="light">Tecno</span><span class="bold">Shop</span></span>
          </div>
          <p class="footer-text line-height-3">
            Tu destino para productos de calidad a los mejores precios.
            Envío rápido y devoluciones sin complicaciones.
          </p>
          <div class="flex gap-3 mt-3">
            <a class="footer-social cursor-pointer"><i class="pi pi-facebook text-xl"></i></a>
            <a class="footer-social cursor-pointer"><i class="pi pi-twitter text-xl"></i></a>
            <a class="footer-social cursor-pointer"><i class="pi pi-instagram text-xl"></i></a>
          </div>
        </div>

        <!-- Links -->
        <div class="col-6 md:col-2">
          <h4 class="footer-heading mb-3">Tienda</h4>
          <ul class="list-none p-0 m-0">
            <li class="mb-2"><a routerLink="/products" class="footer-link no-underline">Todos los Productos</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'electronics'}" class="footer-link no-underline">Electrónica</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'clothing'}" class="footer-link no-underline">Ropa</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'sports'}" class="footer-link no-underline">Deportes</a></li>
          </ul>
        </div>

        <div class="col-6 md:col-2">
          <h4 class="footer-heading mb-3">Soporte</h4>
          <ul class="list-none p-0 m-0">
            <li class="mb-2"><a class="footer-link no-underline cursor-pointer">Centro de Ayuda</a></li>
            <li class="mb-2"><a class="footer-link no-underline cursor-pointer">Info de Envíos</a></li>
            <li class="mb-2"><a class="footer-link no-underline cursor-pointer">Devoluciones</a></li>
            <li class="mb-2"><a class="footer-link no-underline cursor-pointer">Contacto</a></li>
          </ul>
        </div>

        <div class="col-12 md:col-4">
          <h4 class="footer-heading mb-3">Newsletter</h4>
          <p class="footer-text mb-3">Suscríbete para recibir ofertas exclusivas y novedades.</p>
          <div class="flex">
            <input type="email" pInputText placeholder="Tu email" class="flex-grow-1 border-round-left">
            <button pButton label="Suscribirse" class="border-round-right"></button>
          </div>
        </div>
      </div>

      <div class="footer-bottom max-w-screen-xl mx-auto mt-5 pt-4 text-center">
        <p>&copy; 2026 TecnoShop · Todos los derechos reservados · Proyecto plantilla</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      background-color: var(--tn-footer-bg);
      color: var(--tn-footer-text);
      border-top: 1px solid rgba(244, 208, 63, 0.20);
      font-family: var(--font-body);
    }
    .footer-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
    }
    .footer-mark {
      width: 32px;
      height: 32px;
    }
    .footer-wordmark {
      font-family: var(--font-display);
      font-size: 1.35rem;
      letter-spacing: -0.03em;
      line-height: 1;
      color: #fff;
    }
    .footer-wordmark .light { font-weight: 300; }
    .footer-wordmark .bold  { font-weight: 500; }

    .footer-heading {
      font-family: var(--font-display);
      color: #fff;
      font-weight: 500;
      font-size: 0.95rem;
      letter-spacing: -0.005em;
    }
    .footer-text { color: var(--tn-footer-text-muted); }
    .footer-link {
      color: var(--tn-footer-text-muted);
      transition: color 0.2s ease;
    }
    .footer-link:hover { color: var(--tn-yellow-300); }
    .footer-social {
      color: var(--tn-footer-text-muted);
      transition: color 0.2s ease, transform 0.2s ease;
      display: inline-flex;
    }
    .footer-social:hover {
      color: var(--tn-yellow-300);
      transform: translateY(-2px);
    }
    .footer-bottom {
      border-top: 1px solid var(--tn-footer-border);
      color: var(--tn-footer-text-muted);
      font-family: var(--font-mono);
      font-size: var(--fs-mono-s);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }
  `]
})
export class FooterComponent {}

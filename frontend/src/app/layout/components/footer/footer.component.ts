import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer-container">
      <div class="footer-inner max-w-screen-xl mx-auto">
        <p class="footer-legal-top">
          TecnoShop es una plantilla demostrativa. Todos los productos y precios son ficticios.
        </p>

        <div class="footer-columns">
          <div class="col">
            <h4>Tienda</h4>
            <ul>
              <li><a routerLink="/products">Todos los Productos</a></li>
              <li><a routerLink="/products" [queryParams]="{category:'electronics'}">Electrónica</a></li>
              <li><a routerLink="/products" [queryParams]="{category:'clothing'}">Ropa</a></li>
              <li><a routerLink="/products" [queryParams]="{category:'sports'}">Deportes</a></li>
              <li><a routerLink="/products" [queryParams]="{featured:true}">Destacados</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>Cuenta</h4>
            <ul>
              <li><a routerLink="/auth/login">Iniciar sesión</a></li>
              <li><a routerLink="/auth/register">Crear cuenta</a></li>
              <li><a>Mis pedidos</a></li>
              <li><a>Favoritos</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>Soporte</h4>
            <ul>
              <li><a>Centro de Ayuda</a></li>
              <li><a>Info de Envíos</a></li>
              <li><a>Devoluciones</a></li>
              <li><a>Contacto</a></li>
            </ul>
          </div>

          <div class="col">
            <h4>TecnoShop</h4>
            <ul>
              <li><a>Sobre nosotros</a></li>
              <li><a>Sostenibilidad</a></li>
              <li><a>Trabajá con nosotros</a></li>
              <li><a>Sala de prensa</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-brand">
            <img src="assets/logo/tecnoshop-logo.svg" alt="" class="bottom-mark light-only" width="20" height="20">
            <img src="assets/logo/tecnoshop-logo-inverso.svg" alt="" class="bottom-mark dark-only" width="20" height="20">
            <span>Copyright &copy; 2026 TecnoShop. Todos los derechos reservados.</span>
          </div>
          <ul class="footer-legal">
            <li><a>Política de Privacidad</a></li>
            <li><a>Términos de uso</a></li>
            <li><a>Cookies</a></li>
            <li><a>Mapa del sitio</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      background-color: var(--tn-footer-bg);
      color: var(--tn-footer-text);
      font-family: var(--font-body);
      padding: clamp(32px, 5vw, 56px) 1.25rem 24px;
    }

    .footer-inner { max-width: 1280px; margin: 0 auto; }

    .footer-legal-top {
      font-size: var(--fs-fine);
      line-height: 1.43;
      letter-spacing: -0.012em;
      color: var(--tn-footer-text-muted);
      margin: 0 0 1.75rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid var(--tn-footer-border);
    }

    .footer-columns {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: clamp(1.25rem, 3vw, 3rem);
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--tn-footer-border);
    }

    .footer-columns h4 {
      font-family: var(--font-body);
      font-size: var(--fs-fine);
      font-weight: 600;
      letter-spacing: -0.012em;
      color: var(--tn-footer-text);
      line-height: 2.41;
      margin: 0 0 0.25rem;
    }

    .footer-columns ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-columns li {
      font-size: var(--fs-fine);
      line-height: 2.41;
      letter-spacing: -0.012em;
    }

    .footer-columns a {
      color: var(--tn-footer-text);
      text-decoration: none;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .footer-columns a:hover { color: var(--tn-yellow-700); }

    [data-theme='dark'] .footer-columns a:hover { color: var(--tn-yellow-300); }

    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      padding-top: 1.25rem;
      flex-wrap: wrap;
    }

    .footer-bottom-brand {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: var(--fs-fine);
      letter-spacing: -0.012em;
      color: var(--tn-footer-text-muted);
    }

    .bottom-mark { width: 20px; height: 20px; }
    .bottom-mark.dark-only { display: none; }
    [data-theme='dark'] .bottom-mark.light-only { display: none; }
    [data-theme='dark'] .bottom-mark.dark-only { display: inline-block; }

    .footer-legal {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem 1.5rem;
    }

    .footer-legal a {
      font-size: var(--fs-fine);
      letter-spacing: -0.012em;
      color: var(--tn-footer-text-muted);
      cursor: pointer;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .footer-legal a:hover { color: var(--tn-yellow-700); }
    [data-theme='dark'] .footer-legal a:hover { color: var(--tn-yellow-300); }

    @media (max-width: 833px) {
      .footer-columns { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 480px) {
      .footer-columns { grid-template-columns: 1fr; gap: 1rem; }
    }
  `]
})
export class FooterComponent {}

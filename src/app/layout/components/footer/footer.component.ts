import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer-container text-white py-6 px-4">
      <div class="max-w-screen-xl mx-auto grid">
        <!-- Brand -->
        <div class="col-12 md:col-4 mb-4 md:mb-0">
          <h3 class="text-xl font-bold mb-3">
            <i class="pi pi-shopping-bag mr-2"></i>TecnoStore
          </h3>
          <p class="text-gray-400 line-height-3">
            Tu destino para productos de calidad a los mejores precios.
            Envío rápido y devoluciones sin complicaciones.
          </p>
          <div class="flex gap-3 mt-3">
            <a class="text-gray-400 hover:text-white cursor-pointer"><i class="pi pi-facebook text-xl"></i></a>
            <a class="text-gray-400 hover:text-white cursor-pointer"><i class="pi pi-twitter text-xl"></i></a>
            <a class="text-gray-400 hover:text-white cursor-pointer"><i class="pi pi-instagram text-xl"></i></a>
          </div>
        </div>

        <!-- Links -->
        <div class="col-6 md:col-2">
          <h4 class="font-semibold mb-3">Tienda</h4>
          <ul class="list-none p-0 m-0">
            <li class="mb-2"><a routerLink="/products" class="text-gray-400 hover:text-white no-underline">Todos los Productos</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'electronics'}" class="text-gray-400 hover:text-white no-underline">Electrónica</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'clothing'}" class="text-gray-400 hover:text-white no-underline">Ropa</a></li>
            <li class="mb-2"><a routerLink="/products" [queryParams]="{category:'sports'}" class="text-gray-400 hover:text-white no-underline">Deportes</a></li>
          </ul>
        </div>

        <div class="col-6 md:col-2">
          <h4 class="font-semibold mb-3">Soporte</h4>
          <ul class="list-none p-0 m-0">
            <li class="mb-2"><a class="text-gray-400 hover:text-white no-underline cursor-pointer">Centro de Ayuda</a></li>
            <li class="mb-2"><a class="text-gray-400 hover:text-white no-underline cursor-pointer">Info de Envíos</a></li>
            <li class="mb-2"><a class="text-gray-400 hover:text-white no-underline cursor-pointer">Devoluciones</a></li>
            <li class="mb-2"><a class="text-gray-400 hover:text-white no-underline cursor-pointer">Contacto</a></li>
          </ul>
        </div>

        <div class="col-12 md:col-4">
          <h4 class="font-semibold mb-3">Newsletter</h4>
          <p class="text-gray-400 mb-3">Suscríbete para recibir ofertas exclusivas y novedades.</p>
          <div class="flex">
            <input type="email" pInputText placeholder="Tu email" class="flex-grow-1 border-round-left">
            <button pButton label="Suscribirse" class="p-button-primary border-round-right"></button>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto border-top-1 border-gray-700 mt-5 pt-4 text-center text-gray-500 text-sm">
        <p>&copy; 2026 TecnoStore. Todos los derechos reservados. | Proyecto plantilla.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer-container {
      background-color: #1e293b;
    }
  `]
})
export class FooterComponent {}

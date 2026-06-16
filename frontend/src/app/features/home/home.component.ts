import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product, Category } from '../../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: Category[] = [];
  loading = true;

  heroSlides = [
    {
      eyebrow: 'COLECCIÓN 2026',
      title: 'Nuevos lanzamientos.',
      subtitle: 'Las últimas tendencias en electrónica y moda.',
      cta: 'Comprar',
      surface: 'tile-dark'
    },
    {
      eyebrow: 'HASTA 50% OFF',
      title: 'Ofertas de temporada.',
      subtitle: 'Hasta 50% de descuento en productos seleccionados.',
      cta: 'Ver ofertas',
      surface: 'tile-paper'
    },
    {
      eyebrow: 'ENVÍOS A TODO EL PAÍS',
      title: 'Envío gratis.',
      subtitle: 'En todas las compras mayores a $100.',
      cta: 'Empezar',
      surface: 'tile-white'
    }
  ];

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 3, numScroll: 1 },
    { breakpoint: '768px', numVisible: 2, numScroll: 1 },
    { breakpoint: '560px', numVisible: 1, numScroll: 1 }
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
      this.loading = false;
    });
    this.productService.getCategories().subscribe(cats => this.categories = cats);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  browseCategory(slug: string): void {
    this.router.navigate(['/products'], { queryParams: { category: slug } });
  }

  shopAll(): void {
    this.router.navigate(['/products']);
  }
}

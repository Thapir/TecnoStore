import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  relatedProducts: Product[] = [];
  loading = true;
  quantity = 1;
  selectedImageIndex = 0;

  breadcrumbItems: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadProduct(id);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe(product => {
      if (!product) {
        this.router.navigate(['/products']);
        return;
      }
      this.product = product;
      this.breadcrumbItems = [
        { label: 'Productos', routerLink: '/products' },
        { label: product.category, routerLink: '/products', queryParams: { category: product.category.toLowerCase() } },
        { label: product.name }
      ];
      this.loading = false;

      this.productService.getProductsByCategory(product.category).subscribe(products => {
        this.relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);
      });
    });
  }

  get productImages(): { src: string }[] {
    if (!this.product) return [];
    const imgs = this.product.images?.length ? this.product.images : [this.product.image];
    return imgs.map(src => ({ src }));
  }

  get discount(): number | null {
    if (!this.product?.originalPrice) return null;
    return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }
}

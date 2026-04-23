import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { CartService } from '../../../../core/services/cart.service';
import { Product, Category } from '../../../../core/models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  loading = true;

  selectedCategories: string[] = [];
  priceRange: number[] = [0, 300];
  sortOptions = [
    { label: 'Nombre (A-Z)', value: 'name-asc' },
    { label: 'Nombre (Z-A)', value: 'name-desc' },
    { label: 'Precio: Menor a Mayor', value: 'price-asc' },
    { label: 'Precio: Mayor a Menor', value: 'price-desc' },
    { label: 'Valoración', value: 'rating-desc' }
  ];
  selectedSort = 'name-asc';
  searchQuery = '';
  layout: 'grid' | 'list' = 'grid';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(cats => this.categories = cats);
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.loading = false;

      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          this.selectedCategories = [params['category']];
        }
        if (params['search']) {
          this.searchQuery = params['search'];
        }
        this.applyFilters();
      });
    });
  }

  applyFilters(): void {
    let result = [...this.products];

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    if (this.selectedCategories.length > 0) {
      result = result.filter(p =>
        this.selectedCategories.some(c => p.category.toLowerCase() === c.toLowerCase())
      );
    }

    result = result.filter(p => p.price >= this.priceRange[0] && p.price <= this.priceRange[1]);

    switch (this.selectedSort) {
      case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating); break;
    }

    this.filteredProducts = result;
  }

  clearFilters(): void {
    this.selectedCategories = [];
    this.priceRange = [0, 300];
    this.searchQuery = '';
    this.selectedSort = 'name-asc';
    this.applyFilters();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  viewProduct(id: number): void {
    this.router.navigate(['/products', id]);
  }

  onCategoryChange(): void {
    this.applyFilters();
  }
}

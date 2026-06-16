import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService, Theme } from '../../../core/services/theme.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  userMenuItems: MenuItem[] = [];
  cartItemCount = 0;
  currentUser: User | null = null;
  searchQuery = '';
  mobileMenuVisible = false;
  scrolled = false;
  theme: Theme = 'light';

  private subs: Subscription[] = [];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.scrolled = window.scrollY > 8;
  }

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.menuItems = [
      { label: 'Inicio', icon: 'pi pi-home', routerLink: '/' },
      { label: 'Productos', icon: 'pi pi-th-large', routerLink: '/products' },
      { label: 'Electrónica', icon: 'pi pi-desktop', routerLink: '/products', queryParams: { category: 'electronics' } },
      { label: 'Ropa', icon: 'pi pi-tag', routerLink: '/products', queryParams: { category: 'clothing' } }
    ];

    this.subs.push(
      this.cartService.cart$.subscribe(cart => this.cartItemCount = cart.totalItems),
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
        this.buildUserMenu();
      }),
      this.themeService.theme$.subscribe(t => this.theme = t)
    );
  }

  buildUserMenu(): void {
    if (this.currentUser) {
      this.userMenuItems = [
        { label: `${this.currentUser.firstName} ${this.currentUser.lastName}`, disabled: true },
        { separator: true },
        { label: 'Cerrar sesión', icon: 'pi pi-sign-out', command: () => this.logout() }
      ];
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchQuery } });
    }
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}

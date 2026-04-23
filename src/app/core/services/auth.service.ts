import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private mockUsers: (User & { password: string })[] = [
    { id: 1, email: 'demo@example.com', password: 'demo123', firstName: 'Demo', lastName: 'User' }
  ];

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUserSubject.next(JSON.parse(saved));
    }
  }

  login(request: LoginRequest): Observable<User> {
    const found = this.mockUsers.find(u => u.email === request.email && u.password === request.password);
    if (found) {
      const { password, ...user } = found;
      return of(user).pipe(
        delay(500),
        tap(u => {
          this.currentUserSubject.next(u);
          localStorage.setItem('currentUser', JSON.stringify(u));
        })
      );
    }
    return throwError(() => new Error('Email o contraseña inválidos'));
  }

  register(request: RegisterRequest): Observable<User> {
    const exists = this.mockUsers.find(u => u.email === request.email);
    if (exists) {
      return throwError(() => new Error('El email ya está registrado'));
    }
    const newUser = {
      id: this.mockUsers.length + 1,
      ...request
    };
    this.mockUsers.push(newUser);
    const { password, ...user } = newUser;
    return of(user).pipe(
      delay(500),
      tap(u => {
        this.currentUserSubject.next(u);
        localStorage.setItem('currentUser', JSON.stringify(u));
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}

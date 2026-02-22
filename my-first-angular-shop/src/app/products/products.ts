import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  image: string;
  rating: string;
  price: number;
  inStock: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent {

  constructor(private cdr: ChangeDetectorRef) {}

  allProducts: Product[] = [
    { id: 1, name: 'Notebook Planner',     image: 'images/planner.png',   rating: '5.0 (2.8k Reviews)', price: 5,  inStock: true  },
    { id: 2, name: 'Daily To-Do Pad',      image: 'images/pad.png',       rating: '4.0 (1.5k Reviews)', price: 3,  inStock: true  },
    { id: 3, name: 'Sticker Pack',         image: 'images/pack.png',      rating: '4.5 (2.0k Reviews)', price: 2,  inStock: false },
    { id: 4, name: 'Mug',                  image: 'images/mug.png',       rating: '5.0 (4.0k Reviews)', price: 15, inStock: true  },
    { id: 5, name: 'Phone Sticker Holder', image: 'images/sticker.png',   rating: '4.5 (3.0k Reviews)', price: 5,  inStock: true  },
    { id: 6, name: 'Desktop Organizer',    image: 'images/organizer.png', rating: '4.5 (3.5k Reviews)', price: 20, inStock: false },
    { id: 7, name: 'Wall Calendar',        image: 'images/wallcal.png',   rating: '4.5 (3.9k Reviews)', price: 6,  inStock: true  },
    { id: 8, name: 'Minimalist T-Shirt',   image: 'images/tshirt.png',    rating: '4.0 (2.5k Reviews)', price: 10, inStock: true  },
  ];

  searchQuery: string = '';

  get filteredProducts(): Product[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.allProducts;
    return this.allProducts.filter(p => p.name.toLowerCase().includes(query));
  }

  // Toast
  toastMessage: string = '';
  toastVisible: boolean = false;

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    this.cdr.detectChanges();
    setTimeout(() => {
      this.toastVisible = false;
      this.cdr.detectChanges();
    }, 1000);
  }

  // Cart
  cartItems: CartItem[] = [];

  get cartCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  get cartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    if (!product.inStock) return;
    const existing = this.cartItems.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.showToast(product.name + ' added to cart!');
  }

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i !== item);
  }

  placeOrder(): void {
    if (this.cartItems.length === 0) return;
    this.cartItems = [];
    this.showToast('Order placed successfully!');
  }
}
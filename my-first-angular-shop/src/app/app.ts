import { Component } from '@angular/core';
import { ProductsComponent } from './products/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  // This component is now being routed rather than being nested, it no longer needs a selector
  // selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  errorMessage: string;
  pageTitle: string = 'Product List';
  _filterText: string;
  imageWidth: number = 50;
  imageMargin: number = 2;
  isImageDisplayed: boolean = true;
  filteredProducts: Product[];
  products: Product[];

  constructor(private productService: ProductService) {
    // This constructor uses the TS short-hand syntax to declare/set _productService
  }

  get filterText(): string {
    return this._filterText;
  }

  set filterText(text: string) { // setters cannot have return types, not even "void"
    this._filterText = text;
    this.filteredProducts = this._filterText ? this.performFilter() : this.products;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((resp: Product[]) => {
        this.products = resp;
        this.filteredProducts = resp;
      },
      err => this.errorMessage = <any>err
    );
  }

  toggleImage(): void {
    this.isImageDisplayed = !this.isImageDisplayed;
  }

  private performFilter(): Product[] {
    const lowercase = this._filterText.toLocaleLowerCase();
    return this.products.filter((value: Product) => value.productName.toLocaleLowerCase().indexOf(lowercase) !== -1);
  }

  onRatingClicked(message: string): void {
    // The parameter here corresponds to the payload of the ratingClicked EventEmitter
    alert(message);
  }
}

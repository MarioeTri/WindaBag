import type { Product } from "../types";

let _products: Product[] = [];

export function setProducts(p: Product[]) {
  _products = p;
}

export function getProducts(): Product[] {
  return _products;
}

export function getProductByIndex(i: number): Product | undefined {
  return _products[i];
}

export function getProductById(id: string): (Product & { id: string }) | undefined {
  return (_products as any[]).find((p) => p.id === id);
}

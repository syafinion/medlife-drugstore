import { Injectable } from '@angular/core';

// Category Interface
export interface ICategory {
  id: number,
  name: string,
  image: string,
}

// Product Interface
export interface IProduct {
  id: number,
  name: string,
  price: number,
  image: string,
  category: string,
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getCategories() {
    let categories = [];

    let cat1: ICategory = {
      id: 1,
      name: 'Skincare',
      image: '../../assets/categories/skincare.jpeg'
    }
    let cat2: ICategory = {
      id: 2,
      name: 'Sunscreen',
      image: '../../assets/categories/sunscreen.jpeg'
    }
    let cat3: ICategory = {
      id: 3,
      name: 'Moisturizer',
      image: '../../assets/categories/moisturizer.jpeg'
    }
    let cat4: ICategory = {
      id: 4,
      name: 'Moisturizer',
      image: '../../assets/categories/moisturizer.jpeg'
    }
    let cat5: ICategory = {
      id: 5,
      name: 'Shampoo',
      image: '../../assets/categories/shampoo.jpeg'
    }
    let cat6: ICategory = {
      id: 6,
      name: 'Conditioner',
      image: '../../assets/categories/conditioner.jpeg'
    }
    let cat7: ICategory = {
      id: 7,
      name: 'Hair Oil',
      image: '../../assets/categories/hairoil.jpeg'
    }
    let cat8: ICategory = {
      id: 8,
      name: 'Conditioner',
      image: '../../assets/categories/conditioner.jpeg'
    }
    let cat9: ICategory = {
      id: 9,
      name: 'Make Up',
      image: '../../assets/categories/makeup.jpeg'
    }
    let cat10: ICategory = {
      id: 10,
      name: 'Others',
      image: '../../assets/categories/others.jpeg'
    }

    categories.push(cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10);

    return categories;
  }

  getFeaturedProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Listerine',
      price: 10,
      image: '../../assets/products/listerine.jpg',
      category: 'Medicine'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mask',
      price: 25,
      image: '../../assets/products/mask.jpg',
      category: 'Accessories'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Vaseline',
      price: 13,
      image: '../../assets/products/vaseline.jpg',
      category: 'Medicine'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }

  getBestSellProducts() {
    let products = [];

    let prod1: IProduct = {
      id: 1,
      name: 'Vaseline',
      price: 9.90,
      image: '../../assets/products/vaseline.jpg',
      category: 'Medicine'
    }
    let prod2: IProduct = {
      id: 2,
      name: 'Mask KF94',
      price: 25,
      image: '../../assets/products/mask.jpg',
      category: 'Medicine'
    }
    let prod3: IProduct = {
      id: 1,
      name: 'Nutox',
      price: 40,
      image: '../../assets/products/nutox.jpg',
      category: 'Medicine'
    }

    products.push(prod1, prod2, prod3);

    return products;
  }
}

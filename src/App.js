import React, { Component } from 'react';
import './App.css';
import 'h8k-components';
import ProductList from './components/product-list';
import Cart from './components/cart';

const title = 'HackerShop';

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      return product;
    });
    this.state = {
      cart: {
        items: [],
      },
      products,
    };
  }

  cartObject = (product) => {
    return {
      id: product.id,
      item: product.name,
      quantity: product.cartQuantity,
    };
  };

  addToCart = (newItem) => {
    let allItems = [...this.state.cart.items];
    let wasItemFounded = false;
    allItems.map((item, index) => {
      if (item.id == newItem.id) {
        item.quantity++;
        wasItemFounded = true;
      }
    });
    newItem.cartQuantity++;
    if (!wasItemFounded) {
      allItems.push(this.cartObject(newItem));
    }
    let newCart = Object.assign({}, this.state.cart);
    newCart.items = allItems;
    this.setState({ cart: newCart });
  };

  removeItem = (deleteItem) => {
    let allItems = [...this.state.cart.items];
    allItems.map((item, index) => {
      if (item.id == deleteItem.id) {
        item.quantity--;
      }
    });
    deleteItem.cartQuantity--;
    allItems = allItems.filter((item) => {
      console.log(item);
      return item.quantity > 0;
    });
    let newCart = Object.assign({}, this.state.cart);
    newCart.items = allItems;
    this.setState({ cart: newCart });
  };

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList
            products={this.state.products}
            cart={this.state.cart}
            addToCart={this.addToCart}
            removeItem={this.removeItem}
          />
          <Cart cart={this.state.cart} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    name: 'Cap',
    price: 5,
  },
  {
    name: 'HandBag',
    price: 30,
  },
  {
    name: 'Shirt',
    price: 35,
  },
  {
    name: 'Shoe',
    price: 50,
  },
  {
    name: 'Pant',
    price: 35,
  },
  {
    name: 'Slipper',
    price: 25,
  },
];
export default App;

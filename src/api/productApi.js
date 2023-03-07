import { getAPICall } from './api';

export default class ProductApi {
  static getProducts() {
    return getAPICall('/products');
  }

  static calculate(length, width, height, weight) {
    return getAPICall(`/calculate?length=${length}&width=${width}&height=${height}&weight=${weight}`);
  }

  static getProduct(dimensions, weight) {
    return getAPICall(`/show?dimensions=${dimensions}&weight=${weight}`);
  }
}

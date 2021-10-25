import faker from 'faker';

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }

  async create(data = {}) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return {
      id: newProduct.id,
      message: 'Product has been created',
    };
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  async update(id, changes = {}) {
    const product = this.products.find((item) => item.id === id);
    const idx = this.products.findIndex((prod) => prod.id === id);
    if (product) {
      this.products[idx] = {
        id: product.id,
        name: changes.name || product.name,
        price: changes.price || product.price,
        image: changes.image || product.image,
      };
      return product;
    } else {
      throw new Error('product not found');
    }
  }

  async delete(id) {
    //copy of arraay uwu
    const product = { ...this.products.find((prod) => prod) };
    if (product) {
      this.products = this.products.filter((p) => p.id != id);
      return product;
    }
  }
}

export default ProductsService;

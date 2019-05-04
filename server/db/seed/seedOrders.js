const seedOrders = [
  {
    type: 'delivery',
    subtotal: 250000,
    shipping: 10000,
    total: 260000,
    status: 'cart',
    date: Date.now(),
    userId: 1,
  },
  {
    type: 'delivery',
    subtotal: 110,
    shipping: 32,
    total: 142,
    status: 'cancelled',
    date: Date.now(),
    userId: 1,
  },
  {
    type: 'pickup',
    subtotal: 100,
    shipping: 100,
    total: 200,
    status: 'processing',
    date: Date.now(),
    userId: 2,
  },
];

const seedOrderItems = [
  {
    quantity: 2,
    price: 199,
    orderId: 1,
    productId: 2,
  },
  {
    quantity: 1,
    price: 3000,
    orderId: 1,
    productId: 3,
  },
  {
    quantity: 3,
    price: 400,
    orderId: 2,
    productId: 1,
  },
];

module.exports = {
  seedOrders,
  seedOrderItems,
};

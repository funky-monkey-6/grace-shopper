const seedOrders = [
  {
    type: 'delivery',
    subtotal: 33,
    shipping: 4,
    total: 37,
    status: 'cart',
    date: Date.now(),
    userId: 1,
    shippingAddress: '52 Minetta Lane',
    shippingCity: 'New York',
    shippingState: 'NY',
    shippingZip: '10012',
  },
  {
    type: 'pickup',
    subtotal: 25.5,
    shipping: 0,
    total: 29.5,
    status: 'processing',
    date: Date.now(),
    userId: 1,
  },
  {
    type: 'pickup',
    subtotal: 0,
    shipping: 0,
    total: 0,
    status: 'cancelled',
    date: Date.now(),
    userId: 2,
  },
];

const seedOrderItems = [
  {
    quantity: 2,
    orderId: 1,
    productvariantId: 2,
  },
  {
    quantity: 1,
    orderId: 1,
    productvariantId: 3,
  },
  {
    quantity: 3,
    orderId: 2,
    productvariantId: 1,
  },
];

module.exports = {
  seedOrders,
  seedOrderItems,
};

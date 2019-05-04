const seedProducts = [
  {
    title: 'Ferrari',
    description: 'Car description goes here',
    inventory: 5,
    price: 200000,
    images: '',
  },
  {
    title: 'Lambourghini',
    description: 'Car description goes here',
    inventory: 2,
    price: 250000,
    images: '',
  },
  {
    title: 'BMW',
    description: 'Car description goes here',
    inventory: 20,
    price: 100000,
    images: '',
  },
  {
    title: 'Jaguar',
    description: 'Car description goes here',
    inventory: 15,
    price: 100000,
    images: '',
  },
];

const seedCategories = [{ name: 'German sports car' }, { name: 'Italian sports car' }];

const seedUsers = [
  {
    firstName: 'Doug',
    lastName: 'Funny',
    email: 'dougf@gmail.com',
    userType: 'customer',
  },
  {
    firstName: 'Moe',
    lastName: 'Howard',
    email: 'moe@stooges.com',
    userType: 'customer',
  },
  {
    firstName: 'Curly',
    lastName: 'Howard',
    email: 'curly@stooges.com',
    userType: 'customer',
  },
  {
    firstName: 'Larry',
    lastName: 'Fine',
    email: 'larry@stooges.com',
    userType: 'customer',
  },
  {
    firstName: 'Buster',
    lastName: 'Keaton',
    email: 'buster@silentfilms.com',
    userType: 'admin',
  },
];

const seedOrders = [
  {
    subtotal: 250000,
    shipping: 10000,
    total: 260000,
    status: 'cart',
    date: Date.now(),
    userId: 1,
  },
  {
    subtotal: 110,
    shipping: 32,
    total: 142,
    status: 'cancelled',
    date: Date.now(),
    userId: 1,
  },
  {
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
  seedProducts,
  seedCategories,
  seedUsers,
  seedOrders,
  seedOrderItems,
};

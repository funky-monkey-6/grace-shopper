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
    categoryId: 1,
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

const seedReviews = [
  {
    rating: 4,
    comment: 'I like this car',
    userId: 3,
    productId: 1,
  },
  {
    rating: 3,
    comment: 'Too fast!',
    userId: 2,
    productId: 2,
  },
  {
    rating: 1,
    comment: 'I dont like the color',
    userId: 2,
    productId: 1,
  },
];

module.exports = {
  seedProducts,
  seedCategories,
  seedUsers,
  seedReviews,
};

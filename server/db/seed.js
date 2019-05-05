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
    password: '1234',
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

module.exports = {
  seedProducts,
  seedCategories,
  seedUsers,
};

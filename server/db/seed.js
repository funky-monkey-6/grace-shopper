const seedProducts = [
	{
		title: 'Ferrari',
		description: 'Car description goes here',
		inventory: 5,
		price: 200000,
		images: []
	},
	{
		title: 'Lambourghini',
		description: 'Car description goes here',
		inventory: 2,
		price: 250000,
		images: []
	},
	{
		title: 'BMW',
		description: 'Car description goes here',
		inventory: 20,
		price: 100000,
		images: []
	},
	{
		title: 'Jaguar',
		description: 'Car description goes here',
		inventory: 20,
		price: 100000,
		images: []
	}
];

const seedCategories = ['German sports car', 'Italian sports car'];

const seedUsers = [
	{
		firstName: 'Doug',
		lastName: 'Funny',
		email: 'dougf@gmail.com',
		isAdmin: false
	},
	{
		firstName: 'Moe',
		lastName: 'Howard',
		email: 'moe@stooges.com',
		isAdmin: true
	},
	{
		firstName: 'Curly',
		lastName: 'Howard',
		email: 'curly@stooges.com',
		isAdmin: false
	},
	{
		firstName: 'Larry',
		lastName: 'Fine',
		email: 'larry@stooges.com',
		isAdmin: false
	},
	{
		firstName: 'Buster',
		lastName: 'Keaton',
		email: 'buster@silentfilms.com',
		isAdmin: false
	}
];

module.exports = {
	seedProducts,
	seedCategories,
	seedUsers
};

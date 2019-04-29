const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: true });

// Models:

const Product = conn.define('product', {
	title: {
		type: Sequelize.STRING
	},
	description: {
		type: Sequelize.TEXT
	},
	inventory: {
		type: Sequelize.INTEGER
	},
	price: {
		type: Sequelize.FLOAT
	},
	images: {
		type: Sequelize.ARRAY(Sequelize.STRING),
		defaultValue: ['image.png']
	}
});

const Category = conn.define('category', {
	name: {
		type: Sequelize.STRING
	}
});

const User = conn.define('user', {
	firstName: {
		type: Sequelize.STRING
	},
	lastName: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING,
		unique: true
		// validate: {
		//   isEmail: true,
		// },
	}
	// include address?
});

// TODO - plan how to configure Order model to handle guest session (authenticated vs non-authenticated)

// order and cart are same
const Order = conn.define('order', {
	subtotal: {
		type: Sequelize.FLOAT
	},
	shipping: {
		type: Sequelize.FLOAT
	},
	total: {
		type: Sequelize.FLOAT
	},
	status: {
		type: Sequelize.ENUM(
			'cart',
			'processing',
			'on hold',
			'completed',
			'cancelled',
			'refunded',
			'failed'
		)
	},
	date: {
		type: Sequelize.DATE
	}
	// will probably want to include shipping address
});

const OrderItem = conn.define('orderitem', {
	// from associations: orderId, productId
	quantity: {
		type: Sequelize.INTEGER
	},
	price: {
		type: Sequelize.FLOAT
	}
});

const Review = conn.define('review', {
	rating: {
		type: Sequelize.INTEGER
		// validate: {
		//   max: 5,
		//   min: 1
		// }
	},
	comment: {
		type: Sequelize.TEXT
		// validate: min x chars
	}
});

// Associations:

Product.belongsTo(Category);
Category.hasMany(Product);

Order.belongsTo(User);
User.hasMany(Order);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.hasOne(Product);

Review.belongsTo(Product);
Review.belongsTo(User);

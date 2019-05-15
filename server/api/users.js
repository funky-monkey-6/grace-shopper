/* eslint-disable indent */
const router = require('express').Router();
const { User, Order, OrderItem, ProductVariant } = require('../db');

// get all users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next);
});

//add user
router.post('/adduser/', (req, res, next) => {
  User.create(req.body)
    .then(newUser => res.send(newUser))
    .catch(next);
});

//update user information
router.put('/:userId', (req, res, next) => {
  User.findByPk(req.params.userId)
    .then(user => user.update(req.body))
    .then(user => res.send(user))
    .catch(next);
});

// get cart for specific user (if exists)
router.get('/:userId/cart', (req, res, next) => {
  Order.findOne({
    where: {
      userId: req.params.userId,
      status: 'cart',
    },
    include: [{ model: OrderItem, include: [{ model: ProductVariant }] }],
  })
    .then(cart => res.send(cart))
    .catch(next);
});

// for logged-in user - get cart (if exists), otherwise create
router.post('/:userId/cart/addItem', (req, res, next) => {
  return Order.findOne({
    where: {
      userId: req.params.userId,
      status: 'cart',
    },
    include: [
      {
        model: OrderItem,
        include: [{ model: ProductVariant }],
      },
    ],
  })
    .then(async cart => {
      try {
        // if cart does not exist, create cart
        if (!cart) {
          cart = await Order.create({
            userId: req.params.userId,
            status: 'cart',
            type: 'pickup',
            shipping: 0,
            date: new Date(),
          });
        }

        const { quantity, price, productVariantId } = req.body;

        // create new orderItem
        await OrderItem.create({
          orderId: cart.id,
          quantity,
          price,
          productVariantId,
        });

        // get cart with orderItems
        cart = await Order.findByPk(cart.id, {
          include: [
            {
              model: OrderItem,
              include: [{ model: ProductVariant }],
            },
          ],
        });

        const getOrderItems = await OrderItem.findAll({ where: { orderId: cart.id } });

        console.log(getOrderItems.map(item => item.getDataValue('price')));

        res.send(cart);
      } catch (err) {
        throw new Error(err);
      }
    })
    .catch(next);
});

// router.post('/:userId/cart/addItem', (req, res, next) => {
//   console.log('req.body:', req.body);

//   return Order.findOrCreate({
//     where: {
//       userId: req.params.userId,
//       status: 'cart'
//     },
//     include: [
//       {
//         model: OrderItem,
//         include: [{ model: ProductVariant }],
//       },
//     ],
//   })
//     .then(([cart, created]) => {
//       console.log({ created });
//       // try {
//       // cart does not exist, create cart
//       // if (!cart) {
//       //   cart = await this.create({
//       //     userId,
//       //   });
//       // }

//       // const orderItem = {
//       //   quantity: Number(quantity),
//       //   price,
//       // orderId: order.id,
//       //   productVariantId,
//       // };

//       const { quantity, price, productVariantId } = req.body;

//       // create new orderItem
//       OrderItem.create({
//         orderId: cart.id,
//         quantity,
//         price,
//         productVariantId,
//       });
//       return cart;
//     })
//     .then(cart => {
//       // get cart with orderItems
//       // cart = await Order.findByPk(cart.id,
//       // return Order.findByPk(cart.id,
//       //   {
//       //     include: [{
//       //       model: OrderItem,
//       //       include: [{ model: ProductVariant }],
//       //     }],
//       //   }
//       // );
//       console.log('cart.id', cart.id)
//       return OrderItem.findAll({ where: { orderId: cart.id } });

//       // console.log('cart w items: ', cart.get())
//       // calculate subtotal & total

//       // update order info

//       // } catch (err) {
//       //   throw new Error(err);
//       // }
//     })
//     .then((cart) => {
//       // console.log('cart: ', cart.get({ plain: true }))
//       // console.log('cart2: ', cart)
//       // console.log('cart data: ', cart.toJSON())
//       return cart;
//     })
//     .then(order => res.send(order))
//     .catch(next)

//   // return (
//   //   Order.findOrCreate({
//   //     where: {
//   //       userId: req.session.userId,
//   //       status: 'cart',
//   //     },
//   //     include: [
//   //       {
//   //         model: OrderItem,
//   //         include: [{ model: ProductVariant }],
//   //       },
//   //     ],
//   //   })
//   //     .then(async ([order, created]) => {
//   //       console.log({ created });

//   //   //   // if (created) {
//   //   //   const newItem = await OrderItem.create({ where: { orderId: order.id } });
//   //   //   order.orderItems = newItem;
//   //   //   // res.send(order)
//   //   //   // }
//   //   //   // console.log(order.orderItems)
//   //   //   return order;
//   //   //   // return order.findAll({
//   //   //   //   where: {
//   //   //   //     orderId: order.id
//   //   //   //   },
//   //   //   //   include: [{
//   //   //   //     model: OrderItem,
//   //   //   //   }]
//   //   //   // })
//   //   // })
//   //   // .then(async order => {
//   //   //   const _order = await Order.findByPk(order.id);
//   //   //   const _orderWithIncl = await OrderItem.findAll({ where: { orderId: order.id } });
//   //   //   return _orderWithIncl;
//   //   // })

//   //   //.then(orderWithIncl => {

//   //   //res.send(orderWithIncl)
//   //   //})

//   //   // Order.findOne({
//   //   //   where: {
//   //   //     userId: req.params.userId,
//   //   //     status: 'cart',
//   //   //   },
//   //   // })
//   //   // .then(cart => res.send(cart))
//   //   .catch(next)
// });

// get all orders for specific user
router.get('/:userId/orders', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId,
    },
    include: [{ model: OrderItem, include: [{ model: ProductVariant }] }],
  })
    .then(orders => res.send(orders))
    .catch(next);
});

// adding an order for a user (creating a new cart when user adds first item to order)
router.post('/:userId/orders', (req, res, next) => {
  Order.create(req.body)
    .then(order => order.update({ userId: req.params.userId }))
    .then(order => res.send(order))
    .catch(next);
});

// updating an order itself (not order items) (e.g updating order status)
router.put('/:userId/orders/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.send(updatedOrder))
    .catch(next);
});

// deleting an order when user removes everything from cart
router.delete('/:userId/orders/:orderId', (req, res, next) => {
  Order.destroy({
    where: {
      userId: req.params.userId,
      id: req.params.orderId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

// get all the order items from within an order
router.get('/orders/:orderId/orderItems', (req, res, next) => {
  OrderItem.findAll({
    where: {
      orderId: req.params.orderId,
    },
  })
    .then(orderItems => res.send(orderItems))
    .catch(next);
});

// adding an order item to a specific order
router.post('/:userId/orders/:orderId/orderItem', (req, res, next) => {
  OrderItem.create(req.body)
    .then(orderItem => orderItem.update({ orderId: req.params.orderId }))
    .then(orderItem => res.send(orderItem))
    .catch(next);
});

// updating an order item within an order (e.g. updating quantity in cart)
router.put('/:userId/orders/:orderId/orderItem/:orderItemId', (req, res, next) => {
  OrderItem.update(req.body, {
    returning: true,
    where: {
      id: req.params.orderItemId,
    },
  })
    .then(([rowsUpdated, [updatedOrderItem]]) => res.send(updatedOrderItem))
    .catch(next);
});

// delete orderItem from order
router.delete('/:userId/orders/:orderId/orderItem/:orderItemId', (req, res, next) => {
  OrderItem.destroy({
    where: {
      id: req.params.orderItemId,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;

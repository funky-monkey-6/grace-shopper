// Helper Functions

export function isLoggedIn(user) {
  return user.email !== undefined;
}

export function isCart(order) {
  return order.status === 'cart';
}

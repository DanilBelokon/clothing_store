const API_BASE = "http://localhost:8000";

export async function getCart(userId) {
  const res = await fetch(`${API_BASE}/getCart.php?user_id=${userId}`);
  return res.json();
}

export async function addToCart(userId, itemId, size, quantity = 1) {
  const res = await fetch(`${API_BASE}/addToCart.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id: userId, item_id: itemId, size, quantity }),
  });
  return res.json();
}

export async function removeFromCart(cartId) {
  const res = await fetch(`${API_BASE}/removeFromCart.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart_id: cartId }),
  });
  return res.json();
}

export async function updateQuantity(cartId, quantity) {
  const res = await fetch(`${API_BASE}/updateQuantity.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cart_id: cartId, quantity }),
  });
  return res.json();
}

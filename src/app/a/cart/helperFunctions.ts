import { ApolloClient, gql } from '@apollo/client';

export const addToCart = async (
  client: ApolloClient<any>,
  product_id: string,
  quantity: number
): Promise<void> => {
  try {
    await client.mutate({
      mutation: gql`
        mutation AddToCart($product_id: ID!, $quantity: Int!) {
          addToCart(product_id: $product_id, quantity: $quantity) {
            success
          }
        }
      `,
      variables: { product_id, quantity },
    });
  } catch (error) {
    console.error('Add to cart failed:', error);
  }
};

export const removeFromCart = async (
  client: ApolloClient<any>,
  cart_id: string
): Promise<void> => {
  try {
    await client.mutate({
      mutation: gql`
        mutation RemoveFromCart($cart_id: ID!) {
          removeFromCart(cart_id: $cart_id) {
            success
          }
        }
      `,
      variables: { cart_id },
    });
  } catch (error) {
    console.error('Remove from cart failed:', error);
  }
};

export const updateCartQuantity = async (
  client: ApolloClient<any>,
  cart_id: string,
  quantity: number
): Promise<void> => {
  try {
    await client.mutate({
      mutation: gql`
        mutation UpdateCartQuantity($cart_id: ID!, $quantity: Int!) {
          updateCartQuantity(cart_id: $cart_id, quantity: $quantity) {
            success
          }
        }
      `,
      variables: { cart_id, quantity },
    });
  } catch (error) {
    console.error('Update cart quantity failed:', error);
  }
};

export const getCartItems = async (
  client: ApolloClient<any>,
  user_id: string
): Promise<any[]> => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetCartItems($user_id: ID!) {
          cartItems(user_id: $user_id) {
            id
            product {
              id
              name
              price
            }
            quantity
          }
        }
      `,
      variables: { user_id },
      fetchPolicy: 'no-cache',
    });
    return data.cartItems;
  } catch (error) {
    console.error('Fetching cart items failed:', error);
    return [];
  }
};

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity)
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($cartId: ID!) {
    removeFromCart(cartId: $cartId)
  }
`;

export const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity($cartId: ID!, $quantity: Int!) {
    updateCartQuantity(cartId: $cartId, quantity: $quantity)
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems($userId: ID!) {
    cart(userId: $userId) {
      id
      title
      image
      quantity
      mrp
      current_price
    }
  }
`;

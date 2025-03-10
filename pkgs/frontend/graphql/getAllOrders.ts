import { gql } from "urql";

// subgraph query
export const getAllOrdersQuery = gql`
  query GetAllOrders {
    orderCreateds(orderBy: orderId, orderDirection: desc) {
      orderId
      price
      productName
      productStatus
      quantity
      recipients
      shippingFee
      splitContract
      status
      tokenAddress
      totalAllocation
    }
  }
`;

export interface Order {
  orderId: string;
  price: string;
  productName: string;
  productStatus: string;
  quantity: string;
  recipients: string;
  shippingFee: string;
  splitContract: string;
  status: string;
  tokenAddress: string;
  totalAllocation: string;
}

export interface AllOrders {
  orderCreateds: Order[];
}

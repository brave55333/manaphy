import { gql } from "urql";
import { type Order } from "./getAllOrders";

// subgraph query
export const getOrderQuery = gql`
  query GetOrder($orderId: Int!) {
    orderCreateds(
      orderBy: orderId, 
      orderDirection: desc, 
      where: {orderId: $orderId}
    ) {
      orderId
      price
      productName
      productStatus
      quantity
      recipients
      shippingFee
      splitContract
      tokenAddress
      totalAllocation
      transactionHash
      status
    }
    orderStatusChangeds(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
      where: {orderId: $orderId}
    ) {
      orderId
      status
    }
  }
`;

export interface OrderStatusChanged {
  orderId: string;
  status: string;
}

export interface GetAllOrdersResponse {
  orderCreateds: Order[];
}

export interface GetOrderResponse {
  orderCreateds: Order[];
  orderStatusChangeds: OrderStatusChanged[];
}

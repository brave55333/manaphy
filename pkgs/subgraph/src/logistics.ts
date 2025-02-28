import { Bytes } from "@graphprotocol/graph-ts";
import {
  OrderCreated as OrderCreatedEvent,
  OrderStatusChanged as OrderStatusChangedEvent,
} from "../generated/Logistics/Logistics";
import { OrderCreated, OrderStatusChanged } from "../generated/schema";

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new OrderCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.orderId = event.params.orderId;
  entity.order_status = event.params.order.status;
  entity.order_destinationX = event.params.order.destinationX;
  entity.order_destinationY = event.params.order.destinationY;
  entity.order_productName = event.params.order.productName;
  entity.order_productStatus = event.params.order.productStatus;
  entity.order_quantity = event.params.order.quantity;
  entity.order_price = event.params.order.price;
  entity.order_shippingFee = event.params.order.shippingFee;
  entity.order_splitContract = event.params.order.splitContract;
  entity.order_splitParams_recipients = changetype<Bytes[]>(
    event.params.order.splitParams.recipients,
  );
  entity.order_splitParams_allocations =
    event.params.order.splitParams.allocations;
  entity.order_splitParams_totalAllocation =
    event.params.order.splitParams.totalAllocation;
  entity.order_splitParams_distributionIncentive =
    event.params.order.splitParams.distributionIncentive;
  entity.order_tokenAddress = event.params.order.tokenAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOrderStatusChanged(event: OrderStatusChangedEvent): void {
  let entity = new OrderStatusChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.orderId = event.params.orderId;
  entity.order_status = event.params.order.status;
  entity.order_destinationX = event.params.order.destinationX;
  entity.order_destinationY = event.params.order.destinationY;
  entity.order_productName = event.params.order.productName;
  entity.order_productStatus = event.params.order.productStatus;
  entity.order_quantity = event.params.order.quantity;
  entity.order_price = event.params.order.price;
  entity.order_shippingFee = event.params.order.shippingFee;
  entity.order_splitContract = event.params.order.splitContract;
  entity.order_splitParams_recipients = changetype<Bytes[]>(
    event.params.order.splitParams.recipients,
  );
  entity.order_splitParams_allocations =
    event.params.order.splitParams.allocations;
  entity.order_splitParams_totalAllocation =
    event.params.order.splitParams.totalAllocation;
  entity.order_splitParams_distributionIncentive =
    event.params.order.splitParams.distributionIncentive;
  entity.order_tokenAddress = event.params.order.tokenAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

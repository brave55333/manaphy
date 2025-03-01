import {
  OrderCreated as OrderCreatedEvent,
  OrderStatusChanged as OrderStatusChangedEvent,
} from "../generated/Logistics/Logistics";
import { OrderCreated, OrderStatusChanged } from "../generated/schema";
import { Bytes } from "@graphprotocol/graph-ts";

export function handleOrderCreated(event: OrderCreatedEvent): void {
  let entity = new OrderCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  );
  entity.orderId = event.params.orderId;
  entity.status = event.params.status;
  entity.destinationX = event.params.destinationX;
  entity.destinationY = event.params.destinationY;
  entity.productName = event.params.productName;
  entity.productStatus = event.params.productStatus;
  entity.quantity = event.params.quantity;
  entity.price = event.params.price;
  entity.shippingFee = event.params.shippingFee;
  entity.splitContract = event.params.splitContract;
  entity.recipients = changetype<Bytes[]>(event.params.recipients);
  entity.allocations = event.params.allocations;
  entity.totalAllocation = event.params.totalAllocation;
  entity.distributionIncentive = event.params.distributionIncentive;
  entity.tokenAddress = event.params.tokenAddress;

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
  entity.status = event.params.status;
  entity.destinationX = event.params.destinationX;
  entity.destinationY = event.params.destinationY;
  entity.productName = event.params.productName;
  entity.productStatus = event.params.productStatus;
  entity.quantity = event.params.quantity;
  entity.price = event.params.price;
  entity.shippingFee = event.params.shippingFee;
  entity.splitContract = event.params.splitContract;
  entity.recipients = changetype<Bytes[]>(event.params.recipients);
  entity.allocations = event.params.allocations;
  entity.totalAllocation = event.params.totalAllocation;
  entity.distributionIncentive = event.params.distributionIncentive;
  entity.tokenAddress = event.params.tokenAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

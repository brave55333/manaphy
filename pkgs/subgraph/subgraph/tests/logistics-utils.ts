import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts";
import {
  OrderCreated,
  OrderStatusChanged,
} from "../generated/Logistics/Logistics";

export function createOrderCreatedEvent(
  orderId: BigInt,
  status: i32,
  destinationX: BigInt,
  destinationY: BigInt,
  productName: string,
  productStatus: i32,
  quantity: BigInt,
  price: BigInt,
  shippingFee: BigInt,
  splitContract: Address,
  recipients: Array<Address>,
  allocations: Array<BigInt>,
  totalAllocation: BigInt,
  distributionIncentive: i32,
  tokenAddress: Address,
): OrderCreated {
  let orderCreatedEvent = changetype<OrderCreated>(newMockEvent());

  orderCreatedEvent.parameters = new Array();

  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status)),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "destinationX",
      ethereum.Value.fromSignedBigInt(destinationX),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "destinationY",
      ethereum.Value.fromSignedBigInt(destinationY),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "productName",
      ethereum.Value.fromString(productName),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "productStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(productStatus)),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price)),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "shippingFee",
      ethereum.Value.fromUnsignedBigInt(shippingFee),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "splitContract",
      ethereum.Value.fromAddress(splitContract),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "recipients",
      ethereum.Value.fromAddressArray(recipients),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "allocations",
      ethereum.Value.fromUnsignedBigIntArray(allocations),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "totalAllocation",
      ethereum.Value.fromUnsignedBigInt(totalAllocation),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "distributionIncentive",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(distributionIncentive)),
    ),
  );
  orderCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress),
    ),
  );

  return orderCreatedEvent;
}

export function createOrderStatusChangedEvent(
  orderId: BigInt,
  status: i32,
  destinationX: BigInt,
  destinationY: BigInt,
  productName: string,
  productStatus: i32,
  quantity: BigInt,
  price: BigInt,
  shippingFee: BigInt,
  splitContract: Address,
  recipients: Array<Address>,
  allocations: Array<BigInt>,
  totalAllocation: BigInt,
  distributionIncentive: i32,
  tokenAddress: Address,
): OrderStatusChanged {
  let orderStatusChangedEvent = changetype<OrderStatusChanged>(newMockEvent());

  orderStatusChangedEvent.parameters = new Array();

  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "orderId",
      ethereum.Value.fromUnsignedBigInt(orderId),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "status",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(status)),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "destinationX",
      ethereum.Value.fromSignedBigInt(destinationX),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "destinationY",
      ethereum.Value.fromSignedBigInt(destinationY),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "productName",
      ethereum.Value.fromString(productName),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "productStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(productStatus)),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "quantity",
      ethereum.Value.fromUnsignedBigInt(quantity),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price)),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "shippingFee",
      ethereum.Value.fromUnsignedBigInt(shippingFee),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "splitContract",
      ethereum.Value.fromAddress(splitContract),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "recipients",
      ethereum.Value.fromAddressArray(recipients),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "allocations",
      ethereum.Value.fromUnsignedBigIntArray(allocations),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "totalAllocation",
      ethereum.Value.fromUnsignedBigInt(totalAllocation),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "distributionIncentive",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(distributionIncentive)),
    ),
  );
  orderStatusChangedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress),
    ),
  );

  return orderStatusChangedEvent;
}

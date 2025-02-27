import { newMockEvent } from "matchstick-as";
import { ethereum, BigInt } from "@graphprotocol/graph-ts";
import {
  OrderCreated,
  OrderStatusChanged,
} from "../generated/Logistics/Logistics";

export function createOrderCreatedEvent(
  orderId: BigInt,
  order: ethereum.Tuple,
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
    new ethereum.EventParam("order", ethereum.Value.fromTuple(order)),
  );

  return orderCreatedEvent;
}

export function createOrderStatusChangedEvent(
  orderId: BigInt,
  order: ethereum.Tuple,
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
    new ethereum.EventParam("order", ethereum.Value.fromTuple(order)),
  );

  return orderStatusChangedEvent;
}

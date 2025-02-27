import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { BigInt } from "@graphprotocol/graph-ts";
import { OrderCreated } from "../generated/schema";
import { OrderCreated as OrderCreatedEvent } from "../generated/Logistics/Logistics";
import { handleOrderCreated } from "../src/logistics";
import { createOrderCreatedEvent } from "./logistics-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let orderId = BigInt.fromI32(234);
    let order = "ethereum.Tuple Not implemented";
    let newOrderCreatedEvent = createOrderCreatedEvent(orderId, order);
    handleOrderCreated(newOrderCreatedEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("OrderCreated created and stored", () => {
    assert.entityCount("OrderCreated", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "orderId",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "order",
      "ethereum.Tuple Not implemented",
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});

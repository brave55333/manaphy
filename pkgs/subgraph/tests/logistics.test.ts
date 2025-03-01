import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { BigInt, Address } from "@graphprotocol/graph-ts";
import { OrderCreated } from "../generated/schema";
import { OrderCreated as OrderCreatedEvent } from "../generated/Logistics/Logistics";
import { handleOrderCreated } from "../src/logistics";
import { createOrderCreatedEvent } from "./logistics-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let orderId = BigInt.fromI32(234);
    let status = 123;
    let destinationX = BigInt.fromI32(234);
    let destinationY = BigInt.fromI32(234);
    let productName = "Example string value";
    let productStatus = 123;
    let quantity = BigInt.fromI32(234);
    let price = BigInt.fromI32(234);
    let shippingFee = BigInt.fromI32(234);
    let splitContract = Address.fromString(
      "0x0000000000000000000000000000000000000001",
    );
    let recipients = [
      Address.fromString("0x0000000000000000000000000000000000000001"),
    ];
    let allocations = [BigInt.fromI32(234)];
    let totalAllocation = BigInt.fromI32(234);
    let distributionIncentive = 123;
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001",
    );
    let newOrderCreatedEvent = createOrderCreatedEvent(
      orderId,
      status,
      destinationX,
      destinationY,
      productName,
      productStatus,
      quantity,
      price,
      shippingFee,
      splitContract,
      recipients,
      allocations,
      totalAllocation,
      distributionIncentive,
      tokenAddress,
    );
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
      "status",
      "123",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "destinationX",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "destinationY",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "productName",
      "Example string value",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "productStatus",
      "123",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "quantity",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "shippingFee",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "splitContract",
      "0x0000000000000000000000000000000000000001",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "recipients",
      "[0x0000000000000000000000000000000000000001]",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "allocations",
      "[234]",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalAllocation",
      "234",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "distributionIncentive",
      "123",
    );
    assert.fieldEquals(
      "OrderCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001",
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});

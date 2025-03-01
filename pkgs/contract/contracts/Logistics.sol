// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { PullSplitFactory } from "./splits/splitters/pull/PullSplitFactory.sol";
import { PullSplit } from "./splits/splitters/pull/PullSplit.sol";
import { SplitV2Lib } from "./splits/libraries/SplitV2.sol";

/**
 * @title Logistics 
 */
contract Logistics {
  // 状態用の列挙型変数
  enum OrderStatus { Created, Shipped, Delivering ,Delivered, Canceled }
  enum ProductStatus { Pending, InTransit, Received, Damaged }
  
  // 注文用の構造体
  struct Order {
    OrderStatus status;
    int256 destinationX;
    int256 destinationY;
    string productName;
    ProductStatus productStatus;
    uint256 quantity;
    uint256 price;
    uint256 shippingFee;
    address splitContract;
    SplitV2Lib.Split splitParams;
    address tokenAddress;
  }
  
  mapping(uint256 => Order) public orders;
  uint256 public nextOrderId;
  
  // 各種イベント
  event OrderCreated(
    uint256 indexed orderId, 
    OrderStatus status,
    int256 destinationX,
    int256 destinationY,
    string productName,
    ProductStatus productStatus,
    uint256 quantity,
    uint256 price,
    uint256 shippingFee,
    address splitContract,
    address[] recipients,
    uint256[] allocations,
    uint256 totalAllocation,
    uint16 distributionIncentive,
    address tokenAddress
  );
  event OrderStatusChanged(
    uint256 indexed orderId, 
    OrderStatus status,
    int256 destinationX,
    int256 destinationY,
    string productName,
    ProductStatus productStatus,
    uint256 quantity,
    uint256 price,
    uint256 shippingFee,
    address splitContract,
    address[] recipients,
    uint256[] allocations,
    uint256 totalAllocation,
    uint16 distributionIncentive,
    address tokenAddress
  );

  /**
   * コンストラクター
   */
  constructor() {}
  
  /**
   * オーダーを作成するメソッド
   */
  function createOrder(
    int256 _destinationX,
    int256 _destinationY,
    string memory _productName,
    uint256 _quantity,
    uint256 _price,
    uint256 _shippingFee,
    address _pullSplitFactoryAddress,
    SplitV2Lib.Split calldata _splitParams,
    address _owner,
    address _creator,
    address _tokenAddress
  ) public {
    uint256 orderId = nextOrderId++;

    // PullSplitFactoryのインスタンスを生成
    PullSplitFactory pullSplitFactory = PullSplitFactory(_pullSplitFactoryAddress);
    // Splitを作成する。
    address splitContractAddress = pullSplitFactory.createSplit(
      _splitParams,
		  _owner,
		  _creator
    );

    // オーダーを作成
    Order memory newOrder = Order(
      OrderStatus.Created,
      _destinationX,
      _destinationY,
      _productName,
      ProductStatus.Pending,
      _quantity,
      _price,
      _shippingFee,
      splitContractAddress,
      _splitParams,
      _tokenAddress
    );

    orders[orderId] = newOrder;

    // イベント発行
    emit OrderCreated(
      orderId, 
      newOrder.status,
      newOrder.destinationX,
      newOrder.destinationY,
      newOrder.productName,
      newOrder.productStatus,
      newOrder.quantity,
      newOrder.price,
      newOrder.shippingFee,
      newOrder.splitContract,
      newOrder.splitParams.recipients,
      newOrder.splitParams.allocations,
      newOrder.splitParams.totalAllocation,
      newOrder.splitParams.distributionIncentive,
      newOrder.tokenAddress
    );
  }
  
  /**
   * 注文の状態を更新するメソッド
   * @param _orderId 注文ID
   * @param _newStatus 新しい状態
   */
  function updateOrderStatus(uint256 _orderId, OrderStatus _newStatus) public {
    // 注文情報のステータスを更新
    orders[_orderId].status = _newStatus;

    // もし配送完了になった場合は、Splitコントラクトのdistributionを実行
    if (_newStatus == OrderStatus.Delivered) {
      // PullSplitコントラクトのインスタンスを生成
      PullSplit pullSplit = PullSplit(orders[_orderId].splitContract);
      // distributionを実行
      pullSplit.distribute(
        orders[_orderId].splitParams,
        orders[_orderId].tokenAddress,
        msg.sender
      );
    }

    emit OrderStatusChanged(
      _orderId,
      orders[_orderId].status,
      orders[_orderId].destinationX,
      orders[_orderId].destinationY,
      orders[_orderId].productName,
      orders[_orderId].productStatus,
      orders[_orderId].quantity,
      orders[_orderId].price,
      orders[_orderId].shippingFee,
      orders[_orderId].splitContract,
      orders[_orderId].splitParams.recipients,
      orders[_orderId].splitParams.allocations,
      orders[_orderId].splitParams.totalAllocation,
      orders[_orderId].splitParams.distributionIncentive,
      orders[_orderId].tokenAddress
    );
  }
  
  /**
   * 指定したIDの注文情報を取得するメソッド
   * @param _orderId 注文ID
   */
  function getOrder(uint256 _orderId) public view returns (Order memory) {
    return orders[_orderId];
  }
  
  /**
   * 全ての注文情報を取得するメソッド
   */
  function getAllOrders() public view returns (Order[] memory) {
    Order[] memory allOrders = new Order[](nextOrderId);
    for (uint256 i = 0; i < nextOrderId; i++) {
      allOrders[i] = orders[i];
    }
    return allOrders;
  }
}

package com.da.order_service.application.service;

import com.da.order_service.application.dto.OrderCreatedRequest;
import com.da.order_service.domain.event.OrderCreatedEvent;
import com.da.order_service.domain.event.OrderUpdatedEvent;
import com.da.order_service.domain.service.OrderSaga;
import com.da.order_service.infrastructure.service.EventStoreService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final EventStoreService eventStoreService;
    private final OrderSaga orderSaga;

    @Transactional
    public String createOrder(OrderCreatedRequest orderCreatedRequest){
        String orderId = UUID.randomUUID().toString();
        OrderCreatedEvent orderCreatedEvent = new OrderCreatedEvent();
        orderCreatedEvent.setOrderId(orderId);
        orderCreatedEvent.setOrderDate(Instant.now());
        orderCreatedEvent.setStatus("ORDER_CREATED");
        orderCreatedEvent.setOrderItems(orderCreatedRequest.getOrderItems());
        orderCreatedEvent.setUserId(orderCreatedRequest.getUserId());
        orderCreatedEvent.setTotalAmount(orderCreatedRequest.getTotalPrice());
        orderCreatedEvent.setShipmentFee(orderCreatedRequest.getShipmentFee());
        orderCreatedEvent.setShippingAddress(orderCreatedRequest.getAddress());
        eventStoreService.saveEvent(orderId, orderCreatedEvent);
        orderSaga.CreateOrderSaga(orderCreatedEvent);
        return orderId;
    }

    @Transactional
    public String cancelOrder(OrderUpdatedEvent orderUpdatedEvent){
        orderUpdatedEvent.setStatus("ORDER_CANCELLED");
        eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
        orderSaga.cancelOrder(orderUpdatedEvent);
        return orderUpdatedEvent.getOrderId();
    }
}

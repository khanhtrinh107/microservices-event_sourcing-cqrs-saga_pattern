package com.product.order_service_query.handler;

import com.product.order_service_query.event.OrderCreatedEvent;
import com.product.order_service_query.event.OrderUpdatedEvent;
import com.product.order_service_query.model.Order;
import com.product.order_service_query.model.OrderDetail;
import com.product.order_service_query.model.OrderView;
import com.product.order_service_query.model.Product;
import com.product.order_service_query.repository.CartRepository;
import com.product.order_service_query.repository.OrderRepository;
import com.product.order_service_query.repository.OrderViewRepository;
import com.product.order_service_query.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderHandler {
    private final OrderRepository orderRepository;
    private final OrderViewRepository orderViewRepository;

    @KafkaListener(topics = "order_created", groupId = "order-query-group")
    public void handleOrderCreatedEvent (OrderCreatedEvent orderCreatedEvent) {
        List<OrderDetail> orderDetails = orderCreatedEvent.getOrderItems().stream().
        map(orderItem -> new OrderDetail(orderItem.getProductId(), orderItem.getQuantity())).toList();
        Order order = new Order();
        order.setOrderId(orderCreatedEvent.getOrderId());
        order.setOrderDate(orderCreatedEvent.getOrderDate());
        order.setOrderItems(orderDetails);
        order.setStatus(orderCreatedEvent.getStatus());
        order.setShipmentFee(orderCreatedEvent.getShipmentFee());
        order.setTotalAmount(orderCreatedEvent.getTotalAmount());
        order.setShippingAddress(orderCreatedEvent.getShippingAddress());
        order.setUserId(orderCreatedEvent.getUserId());
        order.setPaymentDueDate(orderCreatedEvent.getPaymentDueDate());
        orderRepository.save(order);

        OrderView orderView = new OrderView();
        orderView.setOrderId(orderCreatedEvent.getOrderId());
        orderView.setStatus(orderCreatedEvent.getStatus());
        orderView.setUpdatedAt(Instant.now());
        orderViewRepository.save(orderView);
    }

    @KafkaListener(topics = "order_updated", groupId = "order-query-group")
    public void handleOrderUpdated (OrderUpdatedEvent orderUpdatedEvent) {
        Order order = orderRepository.findById(orderUpdatedEvent.getOrderId()).orElse(null);
        if(order != null) {
            order.setStatus(orderUpdatedEvent.getStatus());
            orderRepository.save(order);
            OrderView orderView = new OrderView();
            orderView.setOrderId(orderUpdatedEvent.getOrderId());
            orderView.setStatus(orderUpdatedEvent.getStatus());
            orderView.setUpdatedAt(Instant.now());
            orderViewRepository.save(orderView);
        }
    }
}

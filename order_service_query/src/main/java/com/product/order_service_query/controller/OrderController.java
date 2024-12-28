package com.product.order_service_query.controller;

import com.product.order_service_query.dto.OrderDetailResponse;
import com.product.order_service_query.model.Order;
import com.product.order_service_query.model.OrderView;
import com.product.order_service_query.repository.OrderRepository;
import com.product.order_service_query.repository.OrderViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private final OrderRepository orderRepository;
    private final OrderViewRepository orderViewRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrdersById(@PathVariable String id) {
        List<Order> orders = orderRepository.findByUserIdOrderByOrderDateDesc(id).orElse(new ArrayList<>());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getOrderDetailsById(@PathVariable String id) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        List<OrderView> views = orderViewRepository.findByOrderId(order.getOrderId()).orElse(new ArrayList<>());
        OrderDetailResponse response = new OrderDetailResponse();
        response.setOrderId(order.getOrderId());
        response.setStatus(order.getStatus());
        response.setUserId(order.getUserId());
        response.setOrderItems(order.getOrderItems());
        response.setOrderDate(order.getOrderDate());
        response.setShipmentFee(order.getShipmentFee());
        response.setShippingAddress(order.getShippingAddress());
        response.setViews(views);
        response.setPaymentDueDate(order.getPaymentDueDate());
        response.setTotalAmount(order.getTotalAmount());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

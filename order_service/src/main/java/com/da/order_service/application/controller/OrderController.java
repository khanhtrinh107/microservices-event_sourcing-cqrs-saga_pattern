package com.da.order_service.application.controller;

import com.da.order_service.application.dto.APIResponse;
import com.da.order_service.application.dto.OrderCreatedRequest;
import com.da.order_service.application.service.OrderService;
import com.da.order_service.domain.event.OrderUpdatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderCreatedRequest orderCreatedRequest) {
        return ResponseEntity.ok(new APIResponse<String>("success", orderService.createOrder(orderCreatedRequest)));
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteOrder(@RequestBody OrderUpdatedEvent orderUpdatedEvent) {
        return ResponseEntity.ok(new APIResponse<String>("success", orderService.cancelOrder(orderUpdatedEvent)));
    }
}

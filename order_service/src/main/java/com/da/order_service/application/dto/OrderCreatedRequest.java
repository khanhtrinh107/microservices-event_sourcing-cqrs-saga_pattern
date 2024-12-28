package com.da.order_service.application.dto;

import com.da.order_service.domain.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreatedRequest {
    private String userId;
    private List<OrderItem> orderItems;
    private String address;
    private double totalPrice;
    private double shipmentFee;
}

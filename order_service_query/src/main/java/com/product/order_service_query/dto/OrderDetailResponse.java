package com.product.order_service_query.dto;

import com.product.order_service_query.model.OrderDetail;
import com.product.order_service_query.model.OrderView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderDetailResponse {
    private String orderId;
    private String userId;
    private List<OrderDetail> orderItems;
    private double totalAmount;
    private Instant orderDate;
    private String shippingAddress;
    private String status;
    private Instant paymentDueDate;
    private double shipmentFee;
    private List<OrderView> views;
}

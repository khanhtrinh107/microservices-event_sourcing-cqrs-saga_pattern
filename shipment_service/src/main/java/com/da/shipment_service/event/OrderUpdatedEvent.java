package com.da.shipment_service.event;

import com.da.shipment_service.dto.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class OrderUpdatedEvent {
    private String orderId;
    private String userId;
    private List<OrderItem> orderItems;
    private double totalAmount;
    private Instant orderDate;
    private String shippingAddress;
    private String status;
    private Instant paymentDueDate;
    private double shipmentFee;
}

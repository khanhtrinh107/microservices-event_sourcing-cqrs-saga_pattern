package com.product.order_service_query.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection  = "orders")
@Data
public class Order {
    @Id
    private String orderId;
    private String userId;
    private List<OrderDetail> orderItems;
    private double totalAmount;
    private Instant orderDate;
    private String shippingAddress;
    private String status;
    private Instant paymentDueDate;
    private double shipmentFee;
}

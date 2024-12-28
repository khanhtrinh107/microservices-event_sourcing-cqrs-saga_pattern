package com.product.order_service_query.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection  = "order_view")
public class OrderView {
    private String orderId;
    private String status;
    private Instant updatedAt;
}

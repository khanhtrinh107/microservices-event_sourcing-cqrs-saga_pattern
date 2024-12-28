package com.da.shipment_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDeletedEvent {
    private String orderId;
    private String userId;
    private String reason;
    private Instant cancelAt;
}

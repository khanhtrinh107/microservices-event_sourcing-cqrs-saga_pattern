package com.da.shipment_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "shipment")
public class Shipment {
    @Id
    private String shipmentId;
    private String orderId;
    private String addressId;
    private String status;
    private Instant updated;
}

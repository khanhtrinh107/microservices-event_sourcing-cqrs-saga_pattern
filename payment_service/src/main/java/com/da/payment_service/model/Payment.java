package com.da.payment_service.model;

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
@Table(name = "payments")
public class Payment {
    @Id
    private String paymentId;
    private String orderId;
    private String userId;
    private double amount;
    private String paymentStatus;
    private String transactionId;
    private Instant createdAt;
}

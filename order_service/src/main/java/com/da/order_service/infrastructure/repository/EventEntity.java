package com.da.order_service.infrastructure.repository;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "event_store")
public class EventEntity {
    @Id
    private String id;
    private String aggregateId;
    private String eventType;

    @Lob
    private String eventData;
    private Instant timestamp;
}

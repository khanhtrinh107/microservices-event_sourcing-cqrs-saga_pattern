package com.da.order_service.infrastructure.service.impl;

import com.da.order_service.infrastructure.repository.EventEntity;
import com.da.order_service.infrastructure.repository.EventStoreRepository;
import com.da.order_service.infrastructure.service.EventStoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EventStoreImpl implements EventStoreService {
    private final EventStoreRepository eventStoreRepository;
    private final ObjectMapper objectMapper;
    @Override
    public EventEntity saveEvent(String aggregateId, Object event) {
        try {
            String eventType = event.getClass().getSimpleName();
            String eventData = objectMapper.writeValueAsString(event);
            EventEntity eventEntity = new EventEntity(UUID.randomUUID().toString(),aggregateId, eventType, eventData, Instant.now());
            return eventStoreRepository.save(eventEntity);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save event", e);
        }
    }
}

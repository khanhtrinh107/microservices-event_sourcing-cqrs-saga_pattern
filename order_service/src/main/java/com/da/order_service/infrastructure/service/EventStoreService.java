package com.da.order_service.infrastructure.service;

import com.da.order_service.infrastructure.repository.EventEntity;

public interface EventStoreService {
    EventEntity saveEvent(String aggregateId, Object event);
}

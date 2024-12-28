package com.product.product_service.repository;

import com.product.product_service.store.EventStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventStoreRepository extends JpaRepository<EventStore, Long> {
    List<EventStore> findByAggregateId(String aggregateId);
}

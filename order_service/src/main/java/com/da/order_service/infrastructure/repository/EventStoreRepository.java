package com.da.order_service.infrastructure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventStoreRepository extends JpaRepository<EventEntity, Long> {
}

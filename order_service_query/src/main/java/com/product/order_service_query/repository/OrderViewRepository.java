package com.product.order_service_query.repository;

import com.product.order_service_query.model.OrderView;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderViewRepository extends MongoRepository<OrderView, String> {
    Optional<List<OrderView>> findByOrderId(String orderId);
}

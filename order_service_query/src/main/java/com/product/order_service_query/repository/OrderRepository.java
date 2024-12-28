package com.product.order_service_query.repository;

import com.product.order_service_query.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends MongoRepository<Order, String> {
    Optional<List<Order>> findByUserIdOrderByOrderDateDesc(String userID);
}

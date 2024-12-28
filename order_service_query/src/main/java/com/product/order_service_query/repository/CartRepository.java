package com.product.order_service_query.repository;

import com.product.order_service_query.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
}

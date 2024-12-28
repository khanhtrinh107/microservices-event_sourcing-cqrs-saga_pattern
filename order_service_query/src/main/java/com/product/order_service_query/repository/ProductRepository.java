package com.product.order_service_query.repository;

import com.product.order_service_query.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}

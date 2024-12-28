package com.product.product_service_query.repository;

import com.product.product_service_query.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {
    Optional<List<Product>> findByCategory(String category);
    Optional<List<Product>> findByNameContainingIgnoreCase(String name);
    Optional<List<Product>> findByIdIn(List<String> ids);
}

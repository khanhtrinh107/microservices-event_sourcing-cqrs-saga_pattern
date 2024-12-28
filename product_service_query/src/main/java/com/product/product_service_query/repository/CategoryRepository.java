package com.product.product_service_query.repository;

import com.product.product_service_query.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}

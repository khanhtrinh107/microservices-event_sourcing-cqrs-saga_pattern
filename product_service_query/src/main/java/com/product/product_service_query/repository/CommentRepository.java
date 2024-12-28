package com.product.product_service_query.repository;

import com.product.product_service_query.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends MongoRepository<Comment, String> {
    Optional<List<Comment>> findByProductIdOrderByCreatedAtDesc(String productId);
}

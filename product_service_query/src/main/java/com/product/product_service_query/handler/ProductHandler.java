package com.product.product_service_query.handler;

import com.product.product_service_query.event.ProductCreatedEvent;
import com.product.product_service_query.event.ProductDeletedEvent;
import com.product.product_service_query.event.ProductUpdatedEvent;
import com.product.product_service_query.model.Product;
import com.product.product_service_query.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductHandler {
    private final MongoTemplate mongoTemplate;
    private final ProductRepository productRepository;

    @KafkaListener(topics = "product-created", groupId = "product-query-group")
    public void handleProductCreatedEvent(ProductCreatedEvent productCreatedEvent) {
        Product product = new Product(
                productCreatedEvent.getId(),
                productCreatedEvent.getName(),
                productCreatedEvent.getDescription(),
                productCreatedEvent.getImages(),
                productCreatedEvent.getCategory(),
                productCreatedEvent.getPrice(),
                productCreatedEvent.getStock()
        );
        mongoTemplate.save(product, "products");
    }

    @KafkaListener(topics = "product-updated", groupId = "product-query-group")
    public void handleProductUpdatedEvent(ProductUpdatedEvent productUpdatedEvent) {
        Product product = new Product(
                productUpdatedEvent.getId(),
                productUpdatedEvent.getName(),
                productUpdatedEvent.getDescription(),
                productUpdatedEvent.getImages(),
                productUpdatedEvent.getCategory(),
                productUpdatedEvent.getPrice(),
                productUpdatedEvent.getStock()
        );

        Query query = new Query(Criteria.where("_id").is(product.getId()));
        Update update = new Update()
                .set("name", product.getName())
                .set("category", product.getCategory())
                .set("images", product.getImages())
                .set("description", product.getDescription())
                .set("price", product.getPrice())
                .set("stock", product.getStock());
        mongoTemplate.upsert(query, update, "products");
    }

    @KafkaListener(topics = "product-deleted", groupId = "product-query-group")
    public void handleProductDeletedEvent(ProductDeletedEvent productDeletedEvent) {
        Query query = new Query(Criteria.where("_id").is(productDeletedEvent.getId()));
        boolean exists = mongoTemplate.exists(query, "products");
        if (!exists) {
            throw new RuntimeException("Product does not exist");
        } else {
            productRepository.deleteById(productDeletedEvent.getId());
        }
    }

}

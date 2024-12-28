package com.product.order_service_query.handler;


import com.product.order_service_query.event.ProductCreatedEvent;
import com.product.order_service_query.event.ProductDeletedEvent;
import com.product.order_service_query.event.ProductUpdatedEvent;
import com.product.order_service_query.model.Product;
import com.product.order_service_query.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductHandler {
    private final ProductRepository productRepository;

    @KafkaListener(topics = "product-created", groupId = "order-query-group")
    public void handleProductCreatedEvent (ProductCreatedEvent productCreatedEvent) {
        Product product = new Product(
                productCreatedEvent.getId(),
                productCreatedEvent.getName(),
                productCreatedEvent.getDescription(),
                productCreatedEvent.getImages(),
                productCreatedEvent.getCategory(),
                productCreatedEvent.getPrice()
        );
        productRepository.save(product);
    }

    @KafkaListener(topics = "product-updated", groupId = "order-query-group")
    public void handleProductUpdatedEvent (ProductUpdatedEvent productUpdatedEvent) {
        Optional<Product> product = productRepository.findById(productUpdatedEvent.getId());
        if(product.isPresent()) {
            Product currentProduct = product.get();
            currentProduct.setName(productUpdatedEvent.getName());
            currentProduct.setDescription(productUpdatedEvent.getDescription());
            currentProduct.setImages(productUpdatedEvent.getImages());
            currentProduct.setCategory(productUpdatedEvent.getCategory());
            currentProduct.setPrice(productUpdatedEvent.getPrice());
            currentProduct.setId(productUpdatedEvent.getId());
            productRepository.save(currentProduct);
        }
    }

    @KafkaListener(topics = "product-deleted", groupId = "order-query-group")
    public void handleProductDeletedEvent (ProductDeletedEvent productDeletedEvent) {
        Optional<Product> product = productRepository.findById(productDeletedEvent.getId());
        if(product.isPresent()) {
            productRepository.deleteById(productDeletedEvent.getId());
        }
    }
}

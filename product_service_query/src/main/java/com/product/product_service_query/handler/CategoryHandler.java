package com.product.product_service_query.handler;

import com.product.product_service_query.event.CategoryCreatedEvent;
import com.product.product_service_query.event.CategoryDeletedEvent;
import com.product.product_service_query.event.CategoryUpdatedEvent;
import com.product.product_service_query.model.Category;
import com.product.product_service_query.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryHandler {
    private final CategoryRepository categoryRepository;

    @KafkaListener(topics = "category-created", groupId = "product-query-group")
    public void categoryCreatedHandler(CategoryCreatedEvent categoryCreatedEvent) {
        Category category = new Category();
        category.setId(categoryCreatedEvent.getCategoryId());
        category.setCategoryName(categoryCreatedEvent.getCategoryName());
        category.setCategoryImage(categoryCreatedEvent.getCategoryImage());
        category.setCategoryDescription(categoryCreatedEvent.getCategoryDescription());
        categoryRepository.save(category);
    }

    @KafkaListener(topics = "category-updated", groupId = "product-query-group")
    public void categoryUpdatedHandler(CategoryUpdatedEvent categoryUpdatedEvent) {
        Category category = new Category();
        category.setId(categoryUpdatedEvent.getCategoryId());
        category.setCategoryName(categoryUpdatedEvent.getCategoryName());
        category.setCategoryImage(categoryUpdatedEvent.getCategoryImage());
        category.setCategoryDescription(categoryUpdatedEvent.getCategoryDescription());
        categoryRepository.save(category);
    }

    @KafkaListener(topics = "category-deleted", groupId = "product-query-group")
    public void categoryDeletedHandler(CategoryDeletedEvent categoryDeletedEvent) {
        Category category = categoryRepository.findById(categoryDeletedEvent.getCategoryId()).orElse(null);
        if (category != null) {
            categoryRepository.deleteById(category.getId());
        }
    }
}

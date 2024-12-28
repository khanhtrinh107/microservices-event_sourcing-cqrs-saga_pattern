package com.product.product_service.handler.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.product_service.command.CategoryCreated;
import com.product.product_service.command.CategoryDeleted;
import com.product.product_service.command.CategoryUpdated;
import com.product.product_service.event.CategoryCreatedEvent;
import com.product.product_service.event.CategoryDeletedEvent;
import com.product.product_service.event.CategoryUpdatedEvent;
import com.product.product_service.handler.CategoryCommandHandler;
import com.product.product_service.repository.EventStoreRepository;
import com.product.product_service.store.EventStore;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryCommandHandlerImpl implements CategoryCommandHandler {
    private final EventStoreRepository eventStoreRepository;

    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate;
    @Override
    public void handleCategoryCommand(CategoryCreated category) throws JsonProcessingException {
        CategoryCreatedEvent categoryCreatedEvent = new CategoryCreatedEvent();
        categoryCreatedEvent.setCategoryId(category.getCategoryId());
        categoryCreatedEvent.setCategoryName(category.getCategoryName());
        categoryCreatedEvent.setCategoryDescription(category.getCategoryDescription());
        categoryCreatedEvent.setCategoryImage(category.getCategoryImage());

        String eventData = objectMapper.writeValueAsString(categoryCreatedEvent);

        EventStore eventStore = new EventStore(
                category.getCategoryId(),
                categoryCreatedEvent.getClass().getName(),
                eventData
        );

        kafkaTemplate.send("category-created", categoryCreatedEvent);

        eventStoreRepository.save(eventStore);
    }

    @Override
    public void handleCategoryUpdatedCommand(CategoryUpdated category) throws JsonProcessingException {
        CategoryUpdatedEvent categoryUpdatedEvent = new CategoryUpdatedEvent();
        categoryUpdatedEvent.setCategoryId(category.getCategoryId());
        categoryUpdatedEvent.setCategoryName(category.getCategoryName());
        categoryUpdatedEvent.setCategoryDescription(category.getCategoryDescription());
        categoryUpdatedEvent.setCategoryImage(category.getCategoryImage());
        String eventData = objectMapper.writeValueAsString(categoryUpdatedEvent);

        EventStore eventStore = new EventStore(
                category.getCategoryId(),
                categoryUpdatedEvent.getClass().getName(),
                eventData
        );

        kafkaTemplate.send("category-updated", categoryUpdatedEvent);

        eventStoreRepository.save(eventStore);
    }

    @Override
    public void handleCategoryDeletedCommand(CategoryDeleted category) throws JsonProcessingException {
        CategoryDeletedEvent categoryDeletedEvent = new CategoryDeletedEvent();
        categoryDeletedEvent.setCategoryId(category.getCategoryId());
        String eventData = objectMapper.writeValueAsString(categoryDeletedEvent);
        EventStore eventStore = new EventStore(
                category.getCategoryId(),
                categoryDeletedEvent.getClass().getName(),
                eventData
        );

        kafkaTemplate.send("category-deleted", categoryDeletedEvent);

        eventStoreRepository.save(eventStore);
    }
}

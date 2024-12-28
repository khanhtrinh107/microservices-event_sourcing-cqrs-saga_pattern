package com.product.product_service.handler.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.product_service.command.ProductCreatedCommand;
import com.product.product_service.command.ProductDeletedCommand;
import com.product.product_service.command.ProductUpdatedCommand;
import com.product.product_service.event.ProductCreatedEvent;
import com.product.product_service.event.ProductDeletedEvent;
import com.product.product_service.event.ProductUpdatedEvent;
import com.product.product_service.handler.ProductCommandHandler;
import com.product.product_service.repository.EventStoreRepository;
import com.product.product_service.store.EventStore;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductCommandHandlerImpl implements ProductCommandHandler {
    private final EventStoreRepository eventStoreRepository;

    private final ObjectMapper objectMapper;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Override
    public void handleCreateProductCommand(ProductCreatedCommand productCreatedCommand) throws JsonProcessingException {
        ProductCreatedEvent productCreatedEvent = new ProductCreatedEvent(
                productCreatedCommand.getId(),
                productCreatedCommand.getName(),
                productCreatedCommand.getDescription(),
                productCreatedCommand.getImages(),
                productCreatedCommand.getCategory(),
                productCreatedCommand.getPrice(),
                productCreatedCommand.getStock()
        );
        String eventData = objectMapper.writeValueAsString(productCreatedEvent);

        EventStore eventStore = new EventStore(
                productCreatedCommand.getId(),
                productCreatedEvent.getClass().getName(),
                eventData
        );

        kafkaTemplate.send("product-created", productCreatedEvent);

        eventStoreRepository.save(eventStore);
    }

    @Override
    public void handleUpdateProductCommand(ProductUpdatedCommand productUpdatedCommand) throws JsonProcessingException {
        ProductUpdatedEvent productUpdatedEvent = new ProductUpdatedEvent(
                productUpdatedCommand.getId(),
                productUpdatedCommand.getName(),
                productUpdatedCommand.getDescription(),
                productUpdatedCommand.getImages(),
                productUpdatedCommand.getCategory(),
                productUpdatedCommand.getPrice(),
                productUpdatedCommand.getStock()
        );
        String eventData = objectMapper.writeValueAsString(productUpdatedEvent);

        EventStore eventStore = new EventStore(
                productUpdatedCommand.getId(),
                productUpdatedCommand.getClass().getName(),
                eventData
        );

        kafkaTemplate.send("product-updated", productUpdatedEvent);

        eventStoreRepository.save(eventStore);
    }

    @Override
    public void handleDeleteProductCommand(ProductDeletedCommand productDeletedCommand) throws JsonProcessingException {
        ProductDeletedEvent productDeletedEvent = new ProductDeletedEvent(productDeletedCommand.getId());
        String eventData = objectMapper.writeValueAsString(productDeletedEvent);
        EventStore eventStore = new EventStore(productDeletedCommand.getId(),productDeletedCommand.getClass().getName(), eventData);
        kafkaTemplate.send("product-deleted", productDeletedEvent);
        eventStoreRepository.save(eventStore);
    }
}

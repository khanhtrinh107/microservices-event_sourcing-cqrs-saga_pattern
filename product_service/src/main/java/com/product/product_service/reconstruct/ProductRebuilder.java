package com.product.product_service.reconstruct;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.product.product_service.event.ProductCreatedEvent;
import com.product.product_service.event.ProductUpdatedEvent;
import com.product.product_service.store.EventStore;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@RequiredArgsConstructor
@Component
public class ProductRebuilder {
    private final ObjectMapper objectMapper;

    public Product rebuild(String productId, List<EventStore> events) throws JsonProcessingException {
        Product product = new Product();

        for (EventStore event : events){
            if(event.getEventType().equals(ProductCreatedEvent.class.getName())){
                ProductCreatedEvent productCreatedEvent = objectMapper.readValue(event.getEventData(), ProductCreatedEvent.class);
                product.apply(productCreatedEvent);
            } else{
                ProductUpdatedEvent productUpdatedEvent = objectMapper.readValue(event.getEventData(), ProductUpdatedEvent.class);
                product.apply(productUpdatedEvent);
            }
        }
        return product;
    }
}

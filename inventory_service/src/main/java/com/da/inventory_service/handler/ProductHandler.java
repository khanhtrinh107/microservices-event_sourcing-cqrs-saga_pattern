package com.da.inventory_service.handler;

import com.da.inventory_service.event.ProductCreatedEvent;
import com.da.inventory_service.event.ProductDeletedEvent;
import com.da.inventory_service.event.ProductUpdatedEvent;
import com.da.inventory_service.model.Inventory;
import com.da.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductHandler {
    private final InventoryRepository inventoryRepository;

    @KafkaListener(topics = "product-created", groupId = "inventory-group")
    public void handleProductCreatedEvent(ProductCreatedEvent productCreatedEvent) {
        Inventory inventory = new Inventory();
        inventory.setId(UUID.randomUUID().toString());
        inventory.setProductId(productCreatedEvent.getId());
        inventory.setStock(productCreatedEvent.getStock());
        inventory.setReserved(0);
        inventory.setStatus("AVAILABLE");
        inventory.setUpdatedAt(new Date().toInstant());
        inventoryRepository.save(inventory);
    }

    @KafkaListener(topics = "product-updated", groupId = "inventory-group")
    public void handleProductUpdatedEvent(ProductUpdatedEvent productUpdatedEvent) {
        Inventory inventory = inventoryRepository.findByProductId(productUpdatedEvent.getId()).orElse(null);
        if(inventory != null) {
            inventory.setStock(productUpdatedEvent.getStock());
            inventory.setUpdatedAt(new Date().toInstant());
            inventoryRepository.save(inventory);
        }
    }

    @KafkaListener(topics = "product-deleted", groupId = "inventory-group")
    public void handleProductDeletedEvent(ProductDeletedEvent productDeletedEvent) {
        Inventory inventory = inventoryRepository.findByProductId(productDeletedEvent.getId()).orElse(null);
        if(inventory != null) {
            inventoryRepository.deleteById(inventory.getId());
        }
    }
}

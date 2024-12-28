package com.da.inventory_service.handler;

import com.da.inventory_service.event.OrderCreatedEvent;
import com.da.inventory_service.event.OrderUpdatedEvent;
import com.da.inventory_service.model.Inventory;
import com.da.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderHandler {
    private final InventoryRepository inventoryRepository;
    private final KafkaTemplate<String,Object> kafkaTemplate;

    @KafkaListener(topics = "order_created", groupId = "inventory-group")
    public void handleReduceInventory(OrderCreatedEvent orderCreatedEvent) throws InterruptedException {
        boolean checkInventory = orderCreatedEvent.getOrderItems().stream()
                .allMatch(orderItem -> {
                    Inventory inventory = inventoryRepository.findByProductId(orderItem.getProductId()).orElse(null);
                    return inventory != null && inventory.getStatus().equals("AVAILABLE") && (inventory.getStock() - inventory.getReserved() - orderItem.getQuantity() > 0);
                });
        if (checkInventory) {
            orderCreatedEvent.getOrderItems().forEach(orderItem -> {
                Inventory inventory = inventoryRepository.findByProductId(orderItem.getProductId()).orElse(null);
                if (inventory != null) {
                    inventory.setStock(inventory.getStock() - inventory.getReserved() - orderItem.getQuantity());
                    inventory.setStatus("PENDING");
                    inventoryRepository.save(inventory);
                }
            });
            orderCreatedEvent.setStatus("INVENTORY_CONFIRMED");
        } else {
            orderCreatedEvent.setStatus("INVENTORY_REJECTED");
        }
        Thread.sleep(3000);
        kafkaTemplate.send("order-response", orderCreatedEvent);
    }

    @KafkaListener(topics = "order_confirmed", groupId = "inventory-group")
    public void handleOrderConfirmed(OrderUpdatedEvent orderUpdatedEvent) {
        orderUpdatedEvent.getOrderItems().forEach(orderItem -> {
            Inventory inventory = inventoryRepository.findByProductId(orderItem.getProductId()).orElse(null);
            if (inventory != null) {
                inventory.setStatus("AVAILABLE");
                inventoryRepository.save(inventory);
            }
        });
    }

    @KafkaListener(topics = "order_canceled", groupId = "inventory-group")
    public void handleOrderCanceled(OrderUpdatedEvent orderUpdatedEvent) {
        orderUpdatedEvent.getOrderItems().forEach(orderItem -> {
            Inventory inventory = inventoryRepository.findByProductId(orderItem.getProductId()).orElse(null);
            if (inventory != null) {
                inventory.setStatus("PENDING");
                inventoryRepository.save(inventory);
                try {
                    Thread.sleep(3000);
                    inventory.setStock(inventory.getStock() + orderItem.getQuantity());
                    inventory.setStatus("AVAILABLE");
                    inventoryRepository.save(inventory);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @KafkaListener(topics = "order_payment_rejected", groupId = "inventory-group")
    public void handleRollbackInventory(OrderUpdatedEvent orderUpdatedEvent) {
        orderUpdatedEvent.getOrderItems()
            .forEach(orderItem -> {
                Inventory inventory = inventoryRepository.findByProductId(orderItem.getProductId()).orElse(null);
                if (inventory != null) {
                    inventory.setStock(inventory.getStock() + orderItem.getQuantity());
                    inventory.setStatus("AVAILABLE");
                    inventoryRepository.save(inventory);
                }
            });
    }
}

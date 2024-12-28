package com.da.inventory_service.service;

import com.da.inventory_service.model.Inventory;
import com.da.inventory_service.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;

    @Override
    public Inventory updateStock(String inventoryId, int quantity) {
        Optional<Inventory> inventory = inventoryRepository.findById(inventoryId);
        if (inventory.isPresent()) {
            inventory.get().setStock(quantity);
            return inventoryRepository.save(inventory.get());
        }
        return null;
    }
}

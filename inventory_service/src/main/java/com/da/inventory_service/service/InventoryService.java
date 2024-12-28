package com.da.inventory_service.service;

import com.da.inventory_service.model.Inventory;

public interface InventoryService {
    public Inventory updateStock(String inventoryId, int quantity);
}

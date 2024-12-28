package com.da.inventory_service.controller;

import com.da.inventory_service.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    @PutMapping("/{id}")
    public ResponseEntity<?> updateInventoryStock(@PathVariable(name = "id") String id, @RequestParam(name = "quantity") int quantity) {
        return new ResponseEntity<>(inventoryService.updateStock(id,quantity), HttpStatus.OK);
    }
}

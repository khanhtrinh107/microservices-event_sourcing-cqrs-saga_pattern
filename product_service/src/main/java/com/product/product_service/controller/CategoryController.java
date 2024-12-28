package com.product.product_service.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.product.product_service.command.CategoryCreated;
import com.product.product_service.command.CategoryDeleted;
import com.product.product_service.command.CategoryUpdated;
import com.product.product_service.dto.CategoryCreatedRequest;
import com.product.product_service.dto.CategoryUpdatedRequest;
import com.product.product_service.handler.CategoryCommandHandler;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryCommandHandler categoryCommandHandler;

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody  CategoryCreatedRequest categoryCreatedRequest) throws JsonProcessingException {
        CategoryCreated categoryCreated = new CategoryCreated();
        categoryCreated.setCategoryId(UUID.randomUUID().toString());
        categoryCreated.setCategoryDescription(categoryCreatedRequest.getCategoryDescription());
        categoryCreated.setCategoryName(categoryCreatedRequest.getCategoryName());
        categoryCreated.setCategoryImage(categoryCreatedRequest.getCategoryImage());
        categoryCommandHandler.handleCategoryCommand(categoryCreated);
        return new ResponseEntity<>(categoryCreated, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable String id,@RequestBody CategoryUpdatedRequest categoryUpdatedRequest) throws JsonProcessingException {
        CategoryUpdated categoryUpdated = new CategoryUpdated();
        categoryUpdated.setCategoryId(id);
        categoryUpdated.setCategoryDescription(categoryUpdatedRequest.getCategoryDescription());
        categoryUpdated.setCategoryName(categoryUpdatedRequest.getCategoryName());
        categoryUpdated.setCategoryImage(categoryUpdatedRequest.getCategoryImage());
        categoryCommandHandler.handleCategoryUpdatedCommand(categoryUpdated);
        return new ResponseEntity<>(categoryUpdated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) throws JsonProcessingException {
        CategoryDeleted categoryDeleted = new CategoryDeleted();
        categoryDeleted.setCategoryId(id);
        categoryCommandHandler.handleCategoryDeletedCommand(categoryDeleted);
        return new ResponseEntity<>(categoryDeleted, HttpStatus.OK);
    }

}

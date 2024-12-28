package com.product.product_service.controller;

import com.product.product_service.command.ProductCreatedCommand;
import com.product.product_service.command.ProductDeletedCommand;
import com.product.product_service.command.ProductUpdatedCommand;
import com.product.product_service.dto.ProductCreatedRequest;
import com.product.product_service.dto.ProductUpdatedRequest;
import com.product.product_service.handler.ProductCommandHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private final ProductCommandHandler productCommandHandler;

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductCreatedRequest request){
        String productId = UUID.randomUUID().toString();
        ProductCreatedCommand productCreatedCommand = new ProductCreatedCommand(
                productId,
                request.getName(),
                request.getDescription(),
                request.getImages(),
                request.getCategory(),
                request.getPrice(),
                request.getStock()
        );
        try {
            productCommandHandler.handleCreateProductCommand(productCreatedCommand);
        } catch (Exception e) {
            throw new RuntimeException(e);        }
        return new ResponseEntity<>(request , HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable String id, @RequestBody ProductUpdatedRequest request){
        ProductUpdatedCommand productUpdatedCommand = new ProductUpdatedCommand(
                id,
                request.getName(),
                request.getDescription(),
                request.getImages(),
                request.getCategory(),
                request.getPrice(),
                request.getStock()
        );
        try{
            productCommandHandler.handleUpdateProductCommand(productUpdatedCommand);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>(request , HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id){
        ProductDeletedCommand productDeletedCommand = new ProductDeletedCommand(id);
        try {
            productCommandHandler.handleDeleteProductCommand(productDeletedCommand);
        } catch (Exception e){
            throw new RuntimeException(e);
        }
        return new ResponseEntity<>("product deleted" , HttpStatus.OK);
    }
}

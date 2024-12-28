package com.product.product_service_query.controller;

import com.product.product_service_query.dto.ProductResponse;
import com.product.product_service_query.model.Category;
import com.product.product_service_query.model.Product;
import com.product.product_service_query.repository.CategoryRepository;
import com.product.product_service_query.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable String id) {
        return new ResponseEntity<>(productRepository.findById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> findByIds(@RequestBody List<String> ids) {
        return new ResponseEntity<>(productRepository.findByIdIn(ids), HttpStatus.OK);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> findByCategory(@PathVariable String id) {
        return new ResponseEntity<>(productRepository.findByCategory(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<?> findBySearch(@RequestParam(name = "keyword") String keyword) {
        return new ResponseEntity<>(productRepository.findByNameContainingIgnoreCase(keyword), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        Map<String, Category> categoriesMap = new HashMap<>();
        categoryRepository.findAll().forEach(category -> {
            categoriesMap.put(category.getId(), category);
        });
        List<ProductResponse> products = productRepository.findAll()
                .stream().map(product -> new ProductResponse(product.getId(),
                        product.getName(),
                        product.getDescription(),
                        product.getImages(),
                        product.getPrice(),
                        product.getStock(),
                        categoriesMap.get(product.getCategory()) != null ? categoriesMap.get(product.getCategory()).getCategoryName() : null,
                        product.getCategory()
                        ))
                .toList();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }


}

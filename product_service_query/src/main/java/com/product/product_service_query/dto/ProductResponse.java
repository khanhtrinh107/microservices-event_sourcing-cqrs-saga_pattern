package com.product.product_service_query.dto;

import com.product.product_service_query.model.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {
    private String id;
    private String name;
    private String description;
    private List<String> images;
    private float price;
    private int stock;
    private String category;
    private String categoryId;
}

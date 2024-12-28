package com.product.product_service_query.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection  = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private List<String> images;
    private String category;
    private float price;
    private int stock;
}

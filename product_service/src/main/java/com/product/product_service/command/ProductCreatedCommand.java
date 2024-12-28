package com.product.product_service.command;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCreatedCommand {
    private String id;
    private String Name;
    private String description;
    private List<String> images;
    private String category;
    private float price;
    private int stock;
}
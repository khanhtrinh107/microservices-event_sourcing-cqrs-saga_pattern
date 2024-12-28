package com.da.inventory_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProductCreatedEvent implements Serializable {
    private String id;
    private String name;
    private String description;
    private List<String> images;
    private String category;
    private float price;
    private int stock;
}
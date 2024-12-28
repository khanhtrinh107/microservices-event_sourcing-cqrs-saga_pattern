package com.product.product_service.reconstruct;

import com.product.product_service.event.ProductCreatedEvent;
import com.product.product_service.event.ProductUpdatedEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Product {
    private String productId;
    private String Name;
    private String description;
    private List<String> images;
    private String category;
    private float price;
    public void apply(ProductCreatedEvent event) {
        this.productId = event.getId();
        this.Name = event.getName();
        this.images = event.getImages();
        this.description = event.getDescription();
        this.price = event.getPrice();
    }

    public void apply(ProductUpdatedEvent event) {
        this.Name = event.getName();
        this.images = event.getImages();
        this.description = event.getDescription();
        this.price = event.getPrice();
    }
}

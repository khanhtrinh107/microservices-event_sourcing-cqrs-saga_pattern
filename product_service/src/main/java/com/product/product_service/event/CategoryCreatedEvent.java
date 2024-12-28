package com.product.product_service.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryCreatedEvent {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

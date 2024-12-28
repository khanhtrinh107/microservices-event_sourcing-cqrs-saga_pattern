package com.product.product_service_query.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryUpdatedEvent {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

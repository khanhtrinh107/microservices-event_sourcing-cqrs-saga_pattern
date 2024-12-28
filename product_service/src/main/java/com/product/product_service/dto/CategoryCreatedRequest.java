package com.product.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryCreatedRequest {
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

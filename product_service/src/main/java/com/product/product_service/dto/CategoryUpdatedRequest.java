package com.product.product_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryUpdatedRequest {
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

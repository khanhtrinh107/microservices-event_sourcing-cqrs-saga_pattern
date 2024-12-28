package com.product.product_service.command;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CategoryUpdated {
    private String categoryId;
    private String categoryName;
    private String categoryImage;
    private String categoryDescription;
}

package com.product.product_service_query.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "category")
public class Category {
    private String id;
    private String categoryName;
    private String categoryDescription;
    private String categoryImage;
}

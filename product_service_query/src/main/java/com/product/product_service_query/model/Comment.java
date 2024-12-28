package com.product.product_service_query.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "comment")
public class Comment {
    @Id
    private String id;
    private String userId;
    private String productId;
    private String username;
    private int stars;
    private String content;
    private List<String> images;
    private Instant createdAt;
}

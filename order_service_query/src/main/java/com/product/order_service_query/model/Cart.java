package com.product.order_service_query.model;

import com.product.order_service_query.dto.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection  = "cart")
@Data
public class Cart {
    @Id
    private String userId;
    private Map<String, CartItem> items;
}

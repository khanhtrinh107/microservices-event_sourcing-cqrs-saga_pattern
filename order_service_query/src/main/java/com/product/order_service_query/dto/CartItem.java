package com.product.order_service_query.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartItem {
    private String id;
    private String name;
    private float price;
    private String imgUrl;
    private int quantity;
}

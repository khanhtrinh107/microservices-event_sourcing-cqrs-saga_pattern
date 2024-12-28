package com.da.order_service.domain.model;

public class OrderStatus {
    public static final String CREATED = "CREATED";
    public static final String COMPLETED = "COMPLETED";
    public static final String INVENTORY_PENDING = "INVENTORY_PENDING";
    public static final String INVENTORY_CONFIRMED = "INVENTORY_CONFIRMED";
    public static final String INVENTORY_REJECTED = "INVENTORY_REJECTED";
    public static final String PAYMENT_PENDING = "PAYMENT_PENDING";
    public static final String PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED";
    public static final String PAYMENT_REJECTED = "PAYMENT_REJECTED";
    public static final String SHIPMENT_PENDING = "SHIPMENT_PENDING";
    public static final String SHIPMENT_CONFIRMED = "SHIPMENT_CONFIRMED";
    public static final String SHIPMENT_REJECTED = "SHIPMENT_REJECTED";
    public static final String CONFIRMED = "CONFIRMED";
    public static final String REJECTED = "REJECTED";
}

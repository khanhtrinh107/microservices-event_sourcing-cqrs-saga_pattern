package com.da.shipment_service.service;

import com.da.shipment_service.entity.Shipment;

import java.util.Optional;

public interface ShipmentService {
    Shipment saveShipment (Shipment shipment);
    void deleteShipment (Shipment shipment);
    Optional<Shipment> getShipment (String shipmentId);
    void deleteShipmentByOrderId(String orderId);
}

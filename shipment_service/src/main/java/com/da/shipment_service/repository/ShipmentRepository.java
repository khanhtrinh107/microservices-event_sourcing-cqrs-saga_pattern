package com.da.shipment_service.repository;

import com.da.shipment_service.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShipmentRepository extends JpaRepository<Shipment, String> {
    Optional<Shipment> findShipmentByOrderId(String orderId);
    void deleteShipmentByOrderId(String orderId);
}

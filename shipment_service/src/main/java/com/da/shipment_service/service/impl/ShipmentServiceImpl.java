package com.da.shipment_service.service.impl;

import com.da.shipment_service.entity.Shipment;
import com.da.shipment_service.repository.ShipmentRepository;
import com.da.shipment_service.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShipmentServiceImpl implements ShipmentService {
    private final ShipmentRepository shipmentRepository;
    private final KafkaTemplate<String, Shipment> kafkaTemplate;
    @Override
    public Shipment saveShipment(Shipment shipment) {
        return shipmentRepository.save(shipment);
    }

    @Override
    public void deleteShipment(Shipment shipment) {
        shipmentRepository.deleteById(shipment.getShipmentId());
    }

    @Override
    public Optional<Shipment> getShipment(String shipmentId) {
        return shipmentRepository.findById(shipmentId);
    }

    @Override
    public void deleteShipmentByOrderId(String orderId) {
        shipmentRepository.deleteShipmentByOrderId(orderId);
    }

}

package com.da.shipment_service.handler;

import com.da.shipment_service.entity.Address;
import com.da.shipment_service.entity.Shipment;
import com.da.shipment_service.event.OrderUpdatedEvent;
import com.da.shipment_service.service.AddressService;
import com.da.shipment_service.service.ShipmentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderHandler {
    private final ShipmentService shipmentService;
    private final AddressService addressService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    @KafkaListener(topics = "order_payment_confirm", groupId = "shipment-group")
    public void handleOrder(OrderUpdatedEvent orderUpdatedEvent) throws InterruptedException {
        Address address = addressService.getAddressById(orderUpdatedEvent.getShippingAddress()).orElse(null);
        if(address != null) {
            Shipment shipment = new Shipment();
            shipment.setStatus("SHIPMENT_CONFIRMED");
            shipment.setAddressId(address.getAddressId());
            shipment.setOrderId(orderUpdatedEvent.getOrderId());
            shipment.setShipmentId(UUID.randomUUID().toString());
            shipmentService.saveShipment(shipment);
            orderUpdatedEvent.setStatus("SHIPMENT_CONFIRMED");
        } else {
            orderUpdatedEvent.setStatus("SHIPMENT_REJECTED");
        }
        Thread.sleep(3000);
        kafkaTemplate.send("order-response", orderUpdatedEvent);
    }

    @KafkaListener(topics = "order_canceled", groupId = "shipment-group")
    @Transactional
    public void handleOrderCanceled(OrderUpdatedEvent orderUpdatedEvent) {
        shipmentService.deleteShipmentByOrderId(orderUpdatedEvent.getOrderId());
    }
}

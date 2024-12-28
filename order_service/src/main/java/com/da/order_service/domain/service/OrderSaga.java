package com.da.order_service.domain.service;

import com.da.order_service.application.service.OrderService;
import com.da.order_service.domain.event.OrderCreatedEvent;
import com.da.order_service.domain.event.OrderUpdatedEvent;
import com.da.order_service.domain.model.OrderStatus;
import com.da.order_service.infrastructure.service.EventStoreService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderSaga {
    private final EventStoreService eventStoreService;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void CreateOrderSaga(OrderCreatedEvent orderCreatedEvent) {
        kafkaTemplate.send("order_created", orderCreatedEvent);
        eventStoreService.saveEvent(orderCreatedEvent.getOrderId(), orderCreatedEvent);
    }

    @KafkaListener(topics = "order-response", groupId = "order_group")
    @Transactional
    public void handleResponse(OrderUpdatedEvent orderUpdatedEvent) {
        kafkaTemplate.send("order_updated", orderUpdatedEvent);
        switch (orderUpdatedEvent.getStatus()) {
            case OrderStatus.INVENTORY_CONFIRMED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                kafkaTemplate.send("order_inventory_confirm", orderUpdatedEvent);
                orderUpdatedEvent.setStatus(OrderStatus.PAYMENT_PENDING);
                kafkaTemplate.send("order_updated", orderUpdatedEvent);
                break;
            }
            case OrderStatus.INVENTORY_REJECTED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                orderUpdatedEvent.setStatus(OrderStatus.REJECTED);
                kafkaTemplate.send("order_inventory_rejected", orderUpdatedEvent);
                kafkaTemplate.send("order_updated", orderUpdatedEvent);
                break;
            }
            case OrderStatus.PAYMENT_CONFIRMED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                kafkaTemplate.send("order_payment_confirm", orderUpdatedEvent);
                orderUpdatedEvent.setStatus(OrderStatus.SHIPMENT_PENDING);
                kafkaTemplate.send("order_updated", orderUpdatedEvent);
                break;
            }
            case OrderStatus.PAYMENT_REJECTED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                orderUpdatedEvent.setStatus(OrderStatus.REJECTED);
                kafkaTemplate.send("order_payment_rejected", orderUpdatedEvent);
                kafkaTemplate.send("order_updated", orderUpdatedEvent);
                break;
            }
            case OrderStatus.SHIPMENT_CONFIRMED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                kafkaTemplate.send("order_shipment_confirm", orderUpdatedEvent);
                break;
            }
            case OrderStatus.SHIPMENT_REJECTED: {
                eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
                orderUpdatedEvent.setStatus(OrderStatus.REJECTED);
                kafkaTemplate.send("order_shipment_rejected", orderUpdatedEvent);
                kafkaTemplate.send("order_updated", orderUpdatedEvent);
                break;
            }
            default: {
                break;
            }
        }
    }


//    @KafkaListener(topics = "order_created", groupId = "order_group")
//    public void handleOrderCreated(OrderCreatedEvent orderCreatedEvent) {
//    }

    @KafkaListener(topics = "order_shipment_confirm", groupId = "order_group")
    public void handleShipmentConfirm (OrderUpdatedEvent orderUpdatedEvent) {
        orderUpdatedEvent.setStatus(OrderStatus.CONFIRMED);
        kafkaTemplate.send("order_updated", orderUpdatedEvent);
        kafkaTemplate.send("order_confirmed", orderUpdatedEvent);
        eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
    }

    @KafkaListener(topics = "order_shipment_rejected", groupId = "order_group")
    public void handleShipmentRejected(OrderUpdatedEvent orderUpdatedEvent) {
        orderUpdatedEvent.setStatus(OrderStatus.REJECTED);
        kafkaTemplate.send("order_updated", orderUpdatedEvent);
        eventStoreService.saveEvent(orderUpdatedEvent.getOrderId(), orderUpdatedEvent);
    }

    public void cancelOrder (OrderUpdatedEvent orderUpdatedEvent) {
        kafkaTemplate.send("order_updated", orderUpdatedEvent);
        kafkaTemplate.send("order_canceled" , orderUpdatedEvent);
    }

}

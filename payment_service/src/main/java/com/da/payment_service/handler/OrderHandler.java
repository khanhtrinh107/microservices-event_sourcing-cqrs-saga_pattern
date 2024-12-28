package com.da.payment_service.handler;

import com.da.payment_service.event.OrderUpdatedEvent;
import com.da.payment_service.model.Account;
import com.da.payment_service.model.Payment;
import com.da.payment_service.service.AccountService;
import com.da.payment_service.service.PaymentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderHandler {
    private final PaymentService paymentService;
    private final AccountService accountService;
    private final KafkaTemplate<String,Object> kafkaTemplate;

    @KafkaListener(topics = "order_inventory_confirm", groupId = "payment-group")
    @Transactional
    public void handlePayment(OrderUpdatedEvent orderUpdatedEvent) throws InterruptedException {
        Account currentAccount = accountService.findByUserId(orderUpdatedEvent.getUserId()).orElse(null);
        if (currentAccount != null && currentAccount.getStatus().equals("AVAILABLE") && currentAccount.getBalance() >= orderUpdatedEvent.getTotalAmount() + orderUpdatedEvent.getShipmentFee()) {
            currentAccount.setBalance(currentAccount.getBalance() - orderUpdatedEvent.getTotalAmount() - orderUpdatedEvent.getShipmentFee());
            currentAccount.setStatus("PENDING");
            accountService.save(currentAccount);
            orderUpdatedEvent.setStatus("PAYMENT_CONFIRMED");
            orderUpdatedEvent.setPaymentDueDate(Instant.now());
            Payment payment = new Payment();
            payment.setAmount(orderUpdatedEvent.getTotalAmount() + orderUpdatedEvent.getShipmentFee());
            payment.setOrderId(orderUpdatedEvent.getOrderId());
            payment.setUserId(orderUpdatedEvent.getUserId());
            payment.setPaymentStatus("PAYMENT_CONFIRMED");
            payment.setCreatedAt(Instant.now());
            payment.setPaymentId(UUID.randomUUID().toString());
            paymentService.createPayment(payment);
        } else {
            orderUpdatedEvent.setStatus("PAYMENT_REJECTED");
        }
        Thread.sleep(3000);
        kafkaTemplate.send("order-response", orderUpdatedEvent);
    }

    @KafkaListener(topics = "order-confirmed", groupId = "payment-group")
    public void handleOrderConfirmed(OrderUpdatedEvent orderUpdatedEvent) {
        Account currentAccount = accountService.findByUserId(orderUpdatedEvent.getUserId()).orElse(null);
        if (currentAccount != null) {
            currentAccount.setStatus("AVAILABLE");
            accountService.save(currentAccount);
        }
    }

    @KafkaListener(topics = "order_canceled", groupId = "payment-group")
    @Transactional
    public void handleOrderCanceled(OrderUpdatedEvent orderUpdatedEvent) throws InterruptedException {
        Account currentAccount = accountService.findByUserId(orderUpdatedEvent.getUserId()).orElse(null);
        if (currentAccount != null) {
            currentAccount.setStatus("PENDING");
            accountService.save(currentAccount);
            currentAccount.setBalance(currentAccount.getBalance() + orderUpdatedEvent.getTotalAmount() + orderUpdatedEvent.getShipmentFee());
            Thread.sleep(3000);
            currentAccount.setStatus("AVAILABLE");
            accountService.save(currentAccount);
            paymentService.deletePaymentByOrderId(orderUpdatedEvent.getOrderId());
        }
    }

}

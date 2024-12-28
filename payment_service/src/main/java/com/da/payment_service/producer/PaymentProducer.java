package com.da.payment_service.producer;

import com.da.payment_service.event.PaymentCompletedEvent;
import com.da.payment_service.event.PaymentFailedEvent;
import com.da.payment_service.model.Payment;
import com.da.payment_service.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PaymentProducer {
    private final PaymentRepository paymentRepository;
    private final KafkaTemplate<String,Object> kafkaTemplate;

    public void publishPaymentCompletedEvent(Payment payment){
        PaymentCompletedEvent paymentCompletedEvent = new PaymentCompletedEvent();
        paymentCompletedEvent.setPaymentId(payment.getPaymentId());
        paymentCompletedEvent.setAmount(payment.getAmount());
        paymentCompletedEvent.setOrderId(payment.getOrderId());
        paymentCompletedEvent.setUserId(payment.getUserId());
        kafkaTemplate.send("payment_completed", paymentCompletedEvent);
    }

    public void publishPaymentFailedEvent(Payment payment){
        PaymentFailedEvent paymentFailedEvent = new PaymentFailedEvent();
        paymentFailedEvent.setOrderId(payment.getOrderId());
        paymentFailedEvent.setUserId(payment.getUserId());
        paymentFailedEvent.setReason("Insufficient funds");
        kafkaTemplate.send("payment_failed", paymentFailedEvent);
    }
}

package com.da.payment_service.service.impl;

import com.da.payment_service.model.Payment;
import com.da.payment_service.repository.PaymentRepository;
import com.da.payment_service.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    @Override
    public Payment getPaymentByOrderId(String orderId) {
        Optional<Payment> payment = paymentRepository.findByOrderId(orderId);
        return payment.orElse(null);
    }

    @Override
    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public void deletePaymentByOrderId(String orderId) {
        paymentRepository.deleteByOrderId(orderId);
    }
}

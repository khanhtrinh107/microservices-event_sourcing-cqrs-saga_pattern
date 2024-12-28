package com.da.payment_service.service;

import com.da.payment_service.model.Payment;


public interface PaymentService {
    Payment getPaymentByOrderId(String orderId);
    Payment createPayment(Payment payment);
    void deletePaymentByOrderId(String orderId);
}

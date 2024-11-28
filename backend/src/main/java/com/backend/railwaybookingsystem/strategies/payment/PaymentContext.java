package com.backend.railwaybookingsystem.strategies.payment;

import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class PaymentContext {

    private final Map<PaymentType, PaymentStrategy> paymentStrategiesByType;

    public PaymentContext(Map<PaymentType, PaymentStrategy> paymentStrategiesByType) {
        this.paymentStrategiesByType = paymentStrategiesByType;
    }

    public String executePayment(Long orderId, Long amount, PaymentType paymentType) {
        PaymentStrategy paymentStrategy = paymentStrategiesByType.get(paymentType);
        return paymentStrategy.payment(orderId, amount);
    }
}
package com.backend.railwaybookingsystem.strategies.payment;

import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;

public interface PaymentStrategy {
    String payment(Long orderId, Long amount);

    PaymentType getType();
}

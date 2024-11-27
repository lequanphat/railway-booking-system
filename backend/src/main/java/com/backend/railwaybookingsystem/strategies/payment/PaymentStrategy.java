package com.backend.railwaybookingsystem.strategies.payment;

public interface PaymentStrategy {
    String payment(Long orderId, Long amount);
}

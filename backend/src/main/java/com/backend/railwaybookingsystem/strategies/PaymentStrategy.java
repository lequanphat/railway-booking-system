package com.backend.railwaybookingsystem.strategies;

public interface PaymentStrategy {
    String payment(Long orderId, Long amount);
}

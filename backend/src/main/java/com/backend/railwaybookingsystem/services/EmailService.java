package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;

public interface EmailService {
    void sendVerificationEmail(String to, String token);
    void sendOrderConfirmationEmail(String to, OrderDetailResponse order);
}

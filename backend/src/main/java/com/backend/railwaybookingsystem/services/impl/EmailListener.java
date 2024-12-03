package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.configurations.RabbitMQConfiguration;
import com.backend.railwaybookingsystem.dtos.email.OrderEmailDto;
import com.backend.railwaybookingsystem.dtos.email.RegistrationEmailDto;
import com.backend.railwaybookingsystem.services.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailListener {
    @Autowired
    private EmailService emailService;

    @RabbitListener(queues = RabbitMQConfiguration.ORDER_QUEUE_NAME)
    public void handleOrderConfirmationEmail(OrderEmailDto orderEmailDto) {
        emailService.sendOrderConfirmationEmail(orderEmailDto.getEmail(), orderEmailDto.getOrder());
    }

    @RabbitListener(queues = RabbitMQConfiguration.REGISTRATION_QUEUE_NAME)
    public void handleRegistrationEmail(RegistrationEmailDto registrationEmailDto) {
        emailService.sendVerificationEmail(registrationEmailDto.getEmail(), registrationEmailDto.getToken());
    }
}

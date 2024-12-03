package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.backend.railwaybookingsystem.services.EmailService;
import com.backend.railwaybookingsystem.services.OrderService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Slf4j
@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmail(String to, String subject, String templateName, Map<String, Object> model) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(to);
            helper.setSubject(subject);
            String content = generateContent(templateName, model);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    private String generateContent(String templateName, Map<String, Object> model) {
        Context context = new Context();
        context.setVariables(model);
        return templateEngine.process(templateName, context);
    }

    @Override
    public void sendVerificationEmail(String to, String token) {
        String link = frontendUrl + "/auth/verify-account/" + token;
        sendEmail(
                to,
                "Railway Booking System - Email Verification",
                "email-verification",
                Map.of("link", link)
        );
    }

    @Override
    public void sendOrderConfirmationEmail(String to, OrderDetailResponse order) {
        sendEmail(
                to,
                "Order Confirmation - #" + order.getId(),
                "order-confirmation",
                Map.of(
                        "id", order.getId(),
                        "fullName", order.getFullName(),
                        "email", order.getEmail(),
                        "phoneNumber", order.getPhoneNumber(),
                        "totalPrice", order.getTotalPrice(),
                        "status", order.getStatus(),
                        "createdAt", order.getCreatedAt(),
                        "paymentMethod", order.getPaymentMethod(),
                        "tickets", order.getTickets()
                )
        );
    }
}
package com.backend.railwaybookingsystem.strategies.payment.config;

import com.backend.railwaybookingsystem.strategies.auth.OAuthStrategy;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;
import com.backend.railwaybookingsystem.strategies.payment.PaymentStrategy;
import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Configuration
public class PaymentStrategyConfig {
    private List<PaymentStrategy> paymentStrategies;

    public PaymentStrategyConfig(List<PaymentStrategy> paymentStrategies) {
        this.paymentStrategies = paymentStrategies;
    }

    @Bean
    public Map<PaymentType, PaymentStrategy> paymentStrategiesByType() {
        Map<PaymentType, PaymentStrategy> authStrategyMap = new EnumMap<>(PaymentType.class);
        paymentStrategies.forEach(
                paymentStrategy -> authStrategyMap.put(paymentStrategy.getType(), paymentStrategy)
        );
        return authStrategyMap;
    }
}

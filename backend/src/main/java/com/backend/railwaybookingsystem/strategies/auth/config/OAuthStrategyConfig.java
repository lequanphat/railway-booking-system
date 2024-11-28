package com.backend.railwaybookingsystem.strategies.auth.config;

import com.backend.railwaybookingsystem.strategies.auth.OAuthStrategy;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

@Configuration
public class OAuthStrategyConfig {
    private List<OAuthStrategy> oAuthStrategies;

    public OAuthStrategyConfig(List<OAuthStrategy> oAuthStrategies) {
        this.oAuthStrategies = oAuthStrategies;
    }

    @Bean
    public Map<OAuthType, OAuthStrategy> oAuthStrategiesByType() {
        Map<OAuthType, OAuthStrategy> authStrategyMap = new EnumMap<>(OAuthType.class);
        oAuthStrategies.forEach(
                oAuthStrategy -> authStrategyMap.put(oAuthStrategy.getType(), oAuthStrategy)
        );
        return authStrategyMap;
    }
}

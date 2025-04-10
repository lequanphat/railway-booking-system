package com.backend.railwaybookingsystem.strategies.auth;

import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class OAuthContext {
    private final Map<OAuthType, OAuthStrategy> oAuthStrategiesByType;

    public OAuthContext(Map<OAuthType, OAuthStrategy> oAuthStrategiesByType) {
        this.oAuthStrategiesByType = oAuthStrategiesByType;
    }

    public OAuthUser authenticate(String credential, OAuthType oAuthType) {
        OAuthStrategy oAuthStrategy = oAuthStrategiesByType.get(oAuthType);
        return oAuthStrategy.authenticate(credential);
    }
}
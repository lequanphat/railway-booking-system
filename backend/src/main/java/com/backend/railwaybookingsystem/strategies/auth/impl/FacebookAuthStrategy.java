package com.backend.railwaybookingsystem.strategies.auth.impl;

import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.UserRole;
import com.backend.railwaybookingsystem.exceptions.AuthenticationException;
import com.backend.railwaybookingsystem.strategies.auth.OAuthStrategy;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Slf4j
@Component
public class FacebookAuthStrategy implements OAuthStrategy {
    @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
    private String facebookAppId;

    @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
    private String facebookAppSecret;

    private static final String FACEBOOK_DEBUG_TOKEN_URL = "https://graph.facebook.com/debug_token?input_token=%s&access_token=%s|%s";

    @Override
    public OAuthUser authenticate(String credential) {
        if (!validateToken(credential)) {
            throw new AuthenticationException("Invalid token");
        }
        return fetchUserInfo(credential);
    }

    @Override
    public OAuthType getType() {
        return OAuthType.FACEBOOK;
    }

    public boolean validateToken(String token) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            String debugTokenUrl = String.format(FACEBOOK_DEBUG_TOKEN_URL, token, facebookAppId, facebookAppSecret);
            log.info("Facebook debug token url: {}", debugTokenUrl);
            ResponseEntity<JsonNode> response = restTemplate.getForEntity(
                    debugTokenUrl,
                    JsonNode.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode body = response.getBody();
                if (body != null && body.has("data")) {
                    JsonNode data = body.get("data");
                    return data.get("is_valid").asBoolean();
                }
                return false;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

    public OAuthUser fetchUserInfo(String token) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + token;
        ResponseEntity<JsonNode> response = restTemplate.getForEntity(url, JsonNode.class);
        JsonNode userData = response.getBody();
        if (userData != null && userData.has("name")) {
            return OAuthUser.builder()
                    .name(userData.get("name").asText())
                    .email(userData.has("email") ? userData.get("email").asText() : null)
                    .avatar(userData.get("picture").get("data").get("url").asText())
                    .userRole(UserRole.USER)
                    .provider(AuthProvider.FACEBOOK)
                    .build();
        }
        return null;
    }
}

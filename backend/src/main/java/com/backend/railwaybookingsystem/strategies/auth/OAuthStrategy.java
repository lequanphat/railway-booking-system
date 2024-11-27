package com.backend.railwaybookingsystem.strategies.auth;

import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;
import com.backend.railwaybookingsystem.strategies.auth.enums.OAuthType;

public interface OAuthStrategy {
    OAuthUser authenticate(String credential);

    OAuthType getType();
}

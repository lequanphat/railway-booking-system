package com.backend.railwaybookingsystem.strategies;

import com.backend.railwaybookingsystem.dtos.auth.response.OAuthUser;

public interface OAuthStrategy {
    OAuthUser authenticate(String credential);
}

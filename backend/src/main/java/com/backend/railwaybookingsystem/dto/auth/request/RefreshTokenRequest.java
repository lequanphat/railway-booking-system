package com.backend.railwaybookingsystem.dto.auth.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshTokenRequest {
    @NotEmpty(message = "Refresh token is required")
    private String refreshToken;
}

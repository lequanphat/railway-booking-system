package com.backend.railwaybookingsystem.dtos.email;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
public class RegistrationEmailDto implements Serializable {
    @JsonProperty("email")
    private String email;

    @JsonProperty("token")
    private String token;
}

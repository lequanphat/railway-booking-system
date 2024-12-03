package com.backend.railwaybookingsystem.dtos.email;

import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.io.Serializable;

@AllArgsConstructor
@Getter
public class OrderEmailDto implements Serializable {
    @JsonProperty("email")
    private String email;

    @JsonProperty("order")
    private OrderDetailResponse order;
}

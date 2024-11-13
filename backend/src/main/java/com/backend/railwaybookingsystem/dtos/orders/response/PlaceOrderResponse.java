package com.backend.railwaybookingsystem.dtos.orders.response;

import lombok.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PlaceOrderResponse {
    private int status;

    private String message;

    private String paymentUrl;
}

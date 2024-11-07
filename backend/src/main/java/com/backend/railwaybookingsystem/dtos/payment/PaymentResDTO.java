package com.backend.railwaybookingsystem.dtos.payment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
public class PaymentResDTO {
    private int status;

    private String message;

    private String URL;
}

package com.backend.railwaybookingsystem.dtos.reports;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserOrderReportResponse {
    private int guestUser;
    private int internalUser;
}

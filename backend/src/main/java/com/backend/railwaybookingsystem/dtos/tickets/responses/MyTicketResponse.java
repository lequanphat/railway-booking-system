package com.backend.railwaybookingsystem.dtos.tickets.responses;

import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Ticket}
 */
@Value
public class MyTicketResponse implements Serializable {
    Long id;
    OrderDto order;
    String seatType;
    String carriageType;
    double originalPrice;
    double price;
    String fullName;
    String object;
    String identity;
    String departureStation;
    String arrivalStation;
    String departureTime;
    String arrivalTime;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Order}
     */
    @Value
    public static class OrderDto implements Serializable {
        Long id;
        Timestamp createdAt;
        UserDto user;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.User}
         */
        @Value
        public static class UserDto implements Serializable {
            Long id;
        }
    }
}
package com.backend.railwaybookingsystem.dtos.tickets.responses;

import lombok.Value;

import java.io.Serializable;

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
    String identity;
    String departureStation;
    String arrivalStation;
    String departureTime;
    String arrivalTime;
    PersonTypeDto object;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Order}
     */
    @Value
    public static class OrderDto implements Serializable {
        Long id;
        UserDto user;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.User}
         */
        @Value
        public static class UserDto implements Serializable {
            Long id;
        }
    }

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
     */
    @Value
    public static class PersonTypeDto implements Serializable {
        Long id;
        String name;
        double percentage;
        PersonTypeParentDto parent;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
         */
        @Value
        public static class PersonTypeParentDto implements Serializable {
            Long id;
            String name;
            double percentage;
        }
    }
}
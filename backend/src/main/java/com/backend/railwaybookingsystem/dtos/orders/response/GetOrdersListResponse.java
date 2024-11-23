package com.backend.railwaybookingsystem.dtos.orders.response;

import com.backend.railwaybookingsystem.enums.AuthProvider;
import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.backend.railwaybookingsystem.enums.PaymentMethod;
import com.backend.railwaybookingsystem.enums.UserGender;
import lombok.Value;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Order}
 */
@Value
public class GetOrdersListResponse implements Serializable {
    Long id;
    String fullName;
    String phoneNumber;
    String email;
    String identity;
    double totalPrice;
    OrderStatus status;
    PaymentMethod paymentMethod;
    Timestamp createdAt;
    UserDto user;
    List<TicketDto> tickets;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.User}
     */
    @Value
    public static class UserDto implements Serializable {
        Long id;
        String name;
        String password;
        String email;
        AuthProvider provider;
        String phone;
        String address;
        UserGender gender;
    }

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.Ticket}
     */
    @Value
    public static class TicketDto implements Serializable {
        Long id;
        String code;
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
}
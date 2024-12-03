package com.backend.railwaybookingsystem.dtos.orders.response;

import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.backend.railwaybookingsystem.enums.PaymentMethod;
import com.backend.railwaybookingsystem.enums.UserGender;
import lombok.Value;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for {@link com.backend.railwaybookingsystem.models.Order}
 */
@Value
public class OrderDetailResponse implements Serializable {
    Long id;
    String fullName;
    String phoneNumber;
    String email;
    String identity;
    double totalPrice;
    OrderStatus status;
    PaymentMethod paymentMethod;
    LocalDateTime createdAt;
    UserDto user;
    List<TicketDto> tickets;

    /**
     * DTO for {@link com.backend.railwaybookingsystem.models.User}
     */
    @Value
    public static class UserDto implements Serializable {
        Long id;
        String name;
        String email;
        String phone;
        String address;
        String avatar;
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
        ScheduleDto schedule;

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.Schedule}
         */
        @Value
        public static class ScheduleDto implements Serializable {
            Long id;
            TrainDto train;

            /**
             * DTO for {@link com.backend.railwaybookingsystem.models.Train}
             */
            @Value
            public static class TrainDto implements Serializable {
                Long id;
                String name;
            }
        }

        /**
         * DTO for {@link com.backend.railwaybookingsystem.models.PersonType}
         */
        @Value
        public static class PersonTypeDto implements Serializable {
            Long id;
            String name;
            String description;
            double percentage;
        }
    }
}
package com.backend.railwaybookingsystem.dtos.orders.requests;

import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.backend.railwaybookingsystem.enums.PaymentMethod;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;


@Data
public class PlaceOrderRequest implements Serializable {
    String fullName;
    String phoneNumber;
    String email;
    String identity;
    double totalPrice;
    OrderStatus status;
    PaymentMethod paymentMethod;
    Timestamp createdAt;
    List<TicketDto> tickets;

    Long departureStation;

    Long arrivalStation;

    Long scheduleId;

    @Data
    public static class TicketDto implements Serializable {
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
        SeatDto seat;
        CarriageDto carriage;

        @Data
        public static class PersonTypeDto implements Serializable {
            Long id;
        }

        @Data
        public static class ScheduleDto implements Serializable {
            Long id;
        }

        @Data
        public static class SeatDto implements Serializable {
            Long id;
        }

        @Data
        public static class CarriageDto implements Serializable {
            Long id;
        }
    }
}
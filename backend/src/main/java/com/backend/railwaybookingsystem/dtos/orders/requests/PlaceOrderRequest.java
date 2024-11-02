package com.backend.railwaybookingsystem.dtos.orders.requests;

import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    OrderStatus status = OrderStatus.PENDING;
    String paymentMethod;
    Timestamp createdAt = new Timestamp(System.currentTimeMillis());
    List<TicketDto> tickets;

    Long departureStation;

    Long arrivalStation;

    Long scheduleId;

    @Data
    public static class TicketDto implements Serializable {
        double originalPrice;
        double price;
        String fullName;
        String object;
        String identity;
        String seatType;
        String carriageType;
        String departureStation;
        String arrivalStation;
        String departureTime;
        String arrivalTime;
        ScheduleDto schedule;
        SeatDto seat;
        CarriageDto carriage;

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
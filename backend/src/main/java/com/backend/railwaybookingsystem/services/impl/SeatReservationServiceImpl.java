package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationRequest;
import com.backend.railwaybookingsystem.dtos.seat_reservation.SeatReservationResponse;
import com.backend.railwaybookingsystem.services.SeatReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class SeatReservationServiceImpl implements SeatReservationService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    private static final long RESERVATION_TIME = 10 * 60;

    @Override
    public SeatReservationResponse reserveSeat(SeatReservationRequest request) {
        String redisKey = generateRedisKey(request.getScheduleId(), request.getSeatId(), request.getCarriageId());
        Boolean isReserved = redisTemplate.opsForValue()
                .setIfAbsent(redisKey, "reserved", RESERVATION_TIME, TimeUnit.SECONDS);

        var response = SeatReservationResponse.builder()
                .scheduleId(request.getScheduleId())
                .seatId(request.getSeatId())
                .carriageId(request.getCarriageId())
                .isReserved(isReserved)
                .expirationTime(isReserved ? redisTemplate.getExpire(redisKey) : null)
                .success(isReserved)
                .actionType(SeatReservationResponse.ActionType.RESERVE)
                .build();

        if (response.isSuccess()) {
            messagingTemplate.convertAndSend("/topic/seats", response);
        }
        return response;
    }

    @Override
    public SeatReservationResponse cancelReservation(SeatReservationRequest request) {
        String redisKey = generateRedisKey(request.getScheduleId(), request.getSeatId(), request.getCarriageId());
        Boolean isDeleted = redisTemplate.delete(redisKey);

        var response = SeatReservationResponse.builder()
                .scheduleId(request.getScheduleId())
                .seatId(request.getSeatId())
                .carriageId(request.getCarriageId())
                .isReserved(redisTemplate.hasKey(redisKey))
                .expirationTime(null)
                .success(isDeleted)
                .actionType(SeatReservationResponse.ActionType.CANCEL)
                .build();
        if (response.isSuccess()) {
            messagingTemplate.convertAndSend("/topic/seats", response);
        }
        return response;
    }

    private String generateRedisKey(Long scheduleId, Long seatId, Long carriageId) {
        return String.format("reservation:schedule:%d:seat:%d:carriage:%d", scheduleId, seatId, carriageId);
    }

    @Override
    public List<SeatReservationResponse> getAllReservationsByScheduleId(Long scheduleId) {
        String pattern = String.format("reservation:schedule:%d:*", scheduleId);
        Set<String> keys = redisTemplate.keys(pattern);
        List<SeatReservationResponse> reservations = new ArrayList<>();
        if (keys != null) {
            for (String key : keys) {
                String[] parts = key.split(":");
                Long extractedSeatId = Long.valueOf(parts[4]);
                Long extractedCarriageId = Long.valueOf(parts[6]);
                Long expirationTime = redisTemplate.getExpire(key, TimeUnit.SECONDS);
                reservations.add(SeatReservationResponse.builder()
                        .scheduleId(scheduleId)
                        .seatId(extractedSeatId)
                        .carriageId(extractedCarriageId)
                        .isReserved(true)
                        .expirationTime(expirationTime)
                        .success(true)
                        .actionType(SeatReservationResponse.ActionType.RESERVE)
                        .build());
            }
        }
        return reservations;
    }
}

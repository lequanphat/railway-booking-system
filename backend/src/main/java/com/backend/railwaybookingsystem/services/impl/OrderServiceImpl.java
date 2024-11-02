package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.mappers.OrderMapper;
import com.backend.railwaybookingsystem.mappers.TicketMapper;
import com.backend.railwaybookingsystem.mappers.TrainMapper;
import com.backend.railwaybookingsystem.models.*;
import com.backend.railwaybookingsystem.repositories.*;
import com.backend.railwaybookingsystem.services.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

@Service
@Slf4j
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private RouteSegmentRepository routeSegmentRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private SeatPriceRepository seatPriceRepository;

    @Autowired
    private SeatTypeRepository seatTypeRepository;

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

    @Override
    public PlaceOrderResponse placeOrder(PlaceOrderRequest request) {
        log.info("Order placing process started" + request.toString());
        Schedule schedule = scheduleRepository.findById(request.getScheduleId()).orElse(null);
        assert schedule != null;

        RouteSegment departureRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(schedule.getTrain().getId(), request.getDepartureStation());
        RouteSegment arrivalRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(schedule.getTrain().getId(), request.getArrivalStation());

        assert departureRouteSegment != null;
        assert arrivalRouteSegment != null;

        double totalDistance = arrivalRouteSegment.getDistance() - departureRouteSegment.getDistance();

        PlaceOrderRequest.TicketDto.ScheduleDto scheduleDto = new PlaceOrderRequest.TicketDto.ScheduleDto();
        scheduleDto.setId(request.getScheduleId());

        Order order = OrderMapper.INSTANCE.convertToOrder(request);
        order.getTickets().clear();

        for(int i=0; i< request.getTickets().size(); i++){
            PlaceOrderRequest.TicketDto ticketDto = request.getTickets().get(i);
            SeatType seatType = seatRepository.findSeatTypeBySeatId(request.getTickets().get(i).getSeat().getId());
            SeatPrice seatPrice = seatPriceRepository.findByTrainIdAndSeatTypeId(schedule.getTrain().getId(), seatType.getId());
            ticketDto.setSchedule(scheduleDto);
            ticketDto.setDepartureStation(departureRouteSegment.getStation().getName());
            ticketDto.setArrivalStation(arrivalRouteSegment.getStation().getName());
            ticketDto.setDepartureTime(arrivalRouteSegment.getDeparture_time().format(timeFormatter) + " " + schedule.getDepartureDate().format(dateFormatter));
            ticketDto.setArrivalTime(departureRouteSegment.getArrival_time().format(timeFormatter) + " " + schedule.getDepartureDate().format(dateFormatter));
            ticketDto.setOriginalPrice(seatPrice.getOriginal_price_per_km() * totalDistance);
            ticketDto.setPrice(seatPrice.getOriginal_price_per_km() * totalDistance);

            Ticket ticket = TicketMapper.INSTANCE.convertToTicket(ticketDto);
            ticket.setOrder(order);
            order.getTickets().add(ticket);
        }
        Order savedOrder = orderRepository.save(order);
        log.info("Order placed successfully");
        return OrderMapper.INSTANCE.convertToPlaceOrderResponse(savedOrder);
    }

    @Override
    public Page<GetOrdersListResponse> getOrders(String keyword, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<GetOrdersListResponse> orders = orderRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrFullNameNotContainingIgnoreCase(keyword, keyword, keyword, pageRequest)
                .map(OrderMapper.INSTANCE::convertToGetOrdersListResponse);

        return new PageImpl<>(orders.getContent(), pageRequest, orders.getTotalElements());
    }

}


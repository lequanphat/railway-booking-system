package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.configurations.VNPayConfiguration;
import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.dtos.reports.OrderReportResponse;
import com.backend.railwaybookingsystem.dtos.reports.UserOrderReportResponse;
import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.mappers.OrderMapper;
import com.backend.railwaybookingsystem.mappers.TicketMapper;
import com.backend.railwaybookingsystem.models.*;
import com.backend.railwaybookingsystem.repositories.*;
import com.backend.railwaybookingsystem.services.OrderService;
import com.backend.railwaybookingsystem.strategies.VNPayStrategy;
import contexts.PaymentContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

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
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PersonTypeRepository personTypeRepository;

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    private static final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
    private static final DateTimeFormatter dateCodeFormatter = DateTimeFormatter.ofPattern("ddMMyyyy");

    public String generateTicketCode(Long scheduleId, Long carriageId, Long seatId, String dateFormatted){
        return String.valueOf(scheduleId) + String.valueOf(carriageId) + String.valueOf(seatId) + dateFormatted;
    }

    public Order onewayBookingHandler (PlaceOrderRequest request) {
        log.info("Oneway Booking Handler");
        Schedule schedule = scheduleRepository.findById(request.getOneWayScheduleId()).orElse(null);

        assert schedule != null;

        RouteSegment departureRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                schedule.getTrain().getId(), request.getOneWayDepartureStation());
        RouteSegment arrivalRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                schedule.getTrain().getId(), request.getOneWayArrivalStation());

        assert departureRouteSegment != null;
        assert arrivalRouteSegment != null;

        double totalDistance = arrivalRouteSegment.getDistance() - departureRouteSegment.getDistance();
        PlaceOrderRequest.TicketDto.ScheduleDto scheduleDto = new PlaceOrderRequest.TicketDto.ScheduleDto();
        scheduleDto.setId(schedule.getId());

        Order order = OrderMapper.INSTANCE.convertToOrder(request);
        order.getTickets().clear();

        double totalPrice = 0;

        for(int i=0; i< request.getTickets().size(); i++){
            PlaceOrderRequest.TicketDto ticketDto = request.getTickets().get(i);

            Ticket findTicket = ticketRepository.findByScheduleIdAndCarriageIdAndSeatId(schedule.getId(), ticketDto.getCarriage().getId(), ticketDto.getSeat().getId());
            if(findTicket != null){
                log.error("Ticket already booked");
                throw new BadRequestException("Ticket already booked");
            }

            // generate ticket code
            String ticketCode = generateTicketCode(schedule.getId(), ticketDto.getCarriage().getId(), ticketDto.getSeat().getId(), schedule.getDepartureDate().format(dateCodeFormatter));
            ticketDto.setCode(ticketCode);

            PersonType personType = personTypeRepository.findById(ticketDto.getObject().getId()).orElse(null);
            SeatType seatType = seatRepository.findSeatTypeBySeatId(request.getTickets().get(i).getSeat().getId());
            SeatPrice seatPrice = seatPriceRepository.findByTrainIdAndSeatTypeId(schedule.getTrain().getId(), seatType.getId());
            ticketDto.setSchedule(scheduleDto);
            ticketDto.setDepartureStation(departureRouteSegment.getStation().getName());
            ticketDto.setArrivalStation(arrivalRouteSegment.getStation().getName());
            ticketDto.setDepartureTime(departureRouteSegment.getDeparture_time().format(timeFormatter) + " " + schedule.getDepartureDate().format(dateFormatter));
            ticketDto.setArrivalTime(arrivalRouteSegment.getArrival_time().format(timeFormatter) + " " + schedule.getDepartureDate().format(dateFormatter));


            // calculate price
            double originalPrice = seatPrice.getOriginal_price_per_km() * totalDistance;
            double discount = originalPrice * personType.getPercentage() / 100;
            double price = Math.round(originalPrice - discount);
            ticketDto.setOriginalPrice(originalPrice);
            ticketDto.setPrice(price);

            Ticket ticket = TicketMapper.INSTANCE.convertToTicket(ticketDto);
            ticket.setOrder(order);
            order.getTickets().add(ticket);

            totalPrice += ticket.getPrice();
        }

        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = "";
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            userId = userDetails.getUsername();
            Optional<User> user = userRepository.findById(Long.parseLong(userId));
            order.setUser(user.orElse(null));
        }
        order.setTotalPrice(totalPrice);
        return orderRepository.save(order);
    }

    public Order roundTripBookingHandler (PlaceOrderRequest request) {
        log.info("RoundTrip Booking Handler");

        Schedule oneWaySchedule = scheduleRepository.findById(request.getOneWayScheduleId()).orElse(null);
        assert oneWaySchedule != null;

        Schedule roundTripSchedule = scheduleRepository.findById(request.getRoundTripScheduleId()).orElse(null);
        assert roundTripSchedule != null;

        RouteSegment oneWayDepartureRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                oneWaySchedule.getTrain().getId(), request.getOneWayDepartureStation());
        assert oneWayDepartureRouteSegment != null;

        RouteSegment oneWayArrivalRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                oneWaySchedule.getTrain().getId(), request.getOneWayArrivalStation());
        assert oneWayArrivalRouteSegment != null;

        RouteSegment roundTripDepartureRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                roundTripSchedule.getTrain().getId(), request.getRoundTripDepartureStation());
        assert roundTripDepartureRouteSegment != null;

        RouteSegment roundTripArrivalRouteSegment = routeSegmentRepository.getRouteSegmentByTrainIdAndStationId(
                roundTripSchedule.getTrain().getId(), request.getRoundTripArrivalStation());
        assert roundTripArrivalRouteSegment != null;

        double totalDistance = oneWayArrivalRouteSegment.getDistance() - oneWayDepartureRouteSegment.getDistance();

        Order order = OrderMapper.INSTANCE.convertToOrder(request);
        order.getTickets().clear();

        double totalPrice = 0;

        for(int i=0; i< request.getTickets().size(); i++){
            PlaceOrderRequest.TicketDto ticketDto = request.getTickets().get(i);

            PlaceOrderRequest.TicketDto.ScheduleDto scheduleDto = new PlaceOrderRequest.TicketDto.ScheduleDto();

            PersonType personType = personTypeRepository.findById(ticketDto.getObject().getId()).orElse(null);

            if(Objects.equals(ticketDto.getScheduleId(), request.getOneWayScheduleId())){ // oneway tickets
                scheduleDto.setId(oneWaySchedule.getId());

                // generate ticket code
                String ticketCode = generateTicketCode(oneWaySchedule.getId(), ticketDto.getCarriage().getId(), ticketDto.getSeat().getId(), oneWaySchedule.getDepartureDate().format(dateCodeFormatter));
                ticketDto.setCode(ticketCode);

                SeatType seatType = seatRepository.findSeatTypeBySeatId(request.getTickets().get(i).getSeat().getId());
                SeatPrice seatPrice = seatPriceRepository.findByTrainIdAndSeatTypeId(oneWaySchedule.getTrain().getId(), seatType.getId());

                ticketDto.setSchedule(scheduleDto);
                ticketDto.setDepartureStation(oneWayDepartureRouteSegment.getStation().getName());
                ticketDto.setArrivalStation(oneWayArrivalRouteSegment.getStation().getName());
                ticketDto.setDepartureTime(oneWayDepartureRouteSegment.getDeparture_time().format(timeFormatter) + " " + oneWaySchedule.getDepartureDate().format(dateFormatter));
                ticketDto.setArrivalTime(oneWayArrivalRouteSegment.getArrival_time().format(timeFormatter) + " " + oneWaySchedule.getDepartureDate().format(dateFormatter));
                ticketDto.setOriginalPrice(seatPrice.getOriginal_price_per_km() * totalDistance * (1 - personType.getPercentage()));

                // calculate price
                double originalPrice = seatPrice.getOriginal_price_per_km() * totalDistance;
                double discount = originalPrice * personType.getPercentage() / 100;
                double price = Math.round(originalPrice - discount);
                ticketDto.setOriginalPrice(originalPrice);
                ticketDto.setPrice(price);

            }else{ // roundTrip tickets
                scheduleDto.setId(roundTripSchedule.getId());

                // generate ticket code
                String ticketCode = generateTicketCode(roundTripSchedule.getId(), ticketDto.getCarriage().getId(), ticketDto.getSeat().getId(), roundTripSchedule.getDepartureDate().format(dateCodeFormatter));
                ticketDto.setCode(ticketCode);

                SeatType seatType = seatRepository.findSeatTypeBySeatId(request.getTickets().get(i).getSeat().getId());
                SeatPrice seatPrice = seatPriceRepository.findByTrainIdAndSeatTypeId(roundTripSchedule.getTrain().getId(), seatType.getId());

                ticketDto.setSchedule(scheduleDto);
                ticketDto.setDepartureStation(roundTripDepartureRouteSegment.getStation().getName());
                ticketDto.setArrivalStation(roundTripArrivalRouteSegment.getStation().getName());
                ticketDto.setDepartureTime(roundTripDepartureRouteSegment.getDeparture_time().format(timeFormatter) + " " + roundTripSchedule.getDepartureDate().format(dateFormatter));
                ticketDto.setArrivalTime(roundTripArrivalRouteSegment.getArrival_time().format(timeFormatter) + " " + roundTripSchedule.getDepartureDate().format(dateFormatter));

                // calculate price
                double originalPrice = seatPrice.getOriginal_price_per_km() * totalDistance;
                int discountForRoundTrip = 10;  // 10% discount for round trip
                double discount = originalPrice * ((personType.getPercentage() + discountForRoundTrip) / 100);
                double price = Math.round(originalPrice - discount);
                ticketDto.setOriginalPrice(originalPrice);
                ticketDto.setPrice(price);
            }

            Ticket findTicket = ticketRepository.findByScheduleIdAndCarriageIdAndSeatId(
                    scheduleDto.getId(), ticketDto.getCarriage().getId(), ticketDto.getSeat().getId());

            if(findTicket != null){
                log.error("Ticket already booked");
                throw new BadRequestException("Ticket already booked");
            }

            Ticket ticket = TicketMapper.INSTANCE.convertToTicket(ticketDto);
            ticket.setOrder(order);
            order.getTickets().add(ticket);

            totalPrice += ticket.getPrice();
        }

        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userId = "";
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            userId = userDetails.getUsername();
            Optional<User> user = userRepository.findById(Long.parseLong(userId));
            order.setUser(user.orElse(null));
        }
        order.setTotalPrice(totalPrice);
        return orderRepository.save(order);
    }

    @Override
    public PlaceOrderResponse placeOrder(PlaceOrderRequest request) {
        log.info("Order placing process started");


        Order savedOrder = request.getType().equals("ONE_WAY") ? onewayBookingHandler(request) : roundTripBookingHandler(request);
        log.info("Order placed successfully");

        PaymentContext paymentContext;
        switch (savedOrder.getPaymentMethod()){
            case VNPAY -> paymentContext = new PaymentContext(new VNPayStrategy());
            case MOMO -> paymentContext = new PaymentContext(null);
            case ZALOPAY -> paymentContext = new PaymentContext(null);
            case PAYPAL -> paymentContext = new PaymentContext(null);
            default -> paymentContext = new PaymentContext(new VNPayStrategy());
        }
        String paymentUrl = paymentContext.executePayment(savedOrder.getId(), Math.round(savedOrder.getTotalPrice()));

        return new PlaceOrderResponse(200, "Order placed successfully", paymentUrl);
    }



    @Override
    public String placeOrderCallback(Long orderId, String code){
        Order existingOrder = orderRepository.findById(orderId).orElse(null);
        assert existingOrder != null;
        if(code.equals(VNPayConfiguration.vnp_SuccessCode)){
            existingOrder.setStatus(OrderStatus.COMPLETED);
            log.error("Order already completed");
            orderRepository.save(existingOrder);
            return VNPayConfiguration.paymentSuccessCallback + "&order=" + orderId;
        }else{
            orderRepository.deleteById(existingOrder.getId());
        }
        return VNPayConfiguration.paymentFailCallback;
    }

    @Override
    public Page<GetOrdersListResponse> getOrders(String keyword, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        Page<GetOrdersListResponse> orders = orderRepository.findByEmailContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrFullNameNotContainingIgnoreCase(keyword, keyword, keyword, pageRequest)
                .map(OrderMapper.INSTANCE::convertToGetOrdersListResponse);

        return new PageImpl<>(orders.getContent(), pageRequest, orders.getTotalElements());
    }

    @Override
    public Page<GetOrdersListResponse> getMyOrders(int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            Long userId = Long.parseLong(userDetails.getUsername());
            Optional<User> user = userRepository.findById(userId);
            Page<GetOrdersListResponse> orders = orderRepository.findByUserId(user.get().getId(), pageRequest)
                    .map(OrderMapper.INSTANCE::convertToGetOrdersListResponse);

            return new PageImpl<>(orders.getContent(), pageRequest, orders.getTotalElements());
        }
        return null;
    }

    @Override
    public List<OrderReportResponse> getReport(LocalDateTime startDate, LocalDateTime endDate){
        List<Object[]> results = orderRepository.getReport(startDate, endDate);
        return results.stream()
                .map(row -> new OrderReportResponse(
                        ((Number) row[0]).longValue(),
                        ((Number) row[1]).doubleValue(),
                        ((java.sql.Date) row[2]).toLocalDate()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public OrderDetailResponse getOrderDetail(Long orderId){
        Optional<Order> order = orderRepository.findById(orderId);
        if(order.isEmpty()){
            log.error("Order not found");
            throw new BadRequestException("Order not found");
        }
        return OrderMapper.INSTANCE.convertToOrderDetailResponse(order.get());
    }

    @Override
    public UserOrderReportResponse getUserReport(LocalDateTime startDate, LocalDateTime endDate){
        int totalOrders = orderRepository.countByUserIsNotNullAndCreatedAtBetween(startDate, endDate);
        int totalGuestOrders = orderRepository.countByUserIsNullAndCreatedAtBetween(startDate, endDate);
        return new UserOrderReportResponse(totalOrders, totalGuestOrders);
    }
}


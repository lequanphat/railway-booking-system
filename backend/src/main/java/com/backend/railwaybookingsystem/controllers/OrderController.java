package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.enums.OrderStatus;
import com.backend.railwaybookingsystem.enums.PaymentMethod;
import com.backend.railwaybookingsystem.services.OrderService;
import com.backend.railwaybookingsystem.strategies.payment.PaymentContext;
import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import com.paypal.base.rest.APIContext;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


@RestController
@RequestMapping("api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("public/orders")
    @Operation(tags = "Orders", description = "Place order")
    public ResponseEntity<PlaceOrderResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        PlaceOrderResponse savedOrder = orderService.placeOrder(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }

    @GetMapping("public/orders/callback/vnpay/{id}")
    @Operation(tags = "Orders", description = "Place order callback with VnPay")
    public ResponseEntity<Void> placeOrderCallback(@PathVariable Long id,
                                                   @RequestParam() String vnp_ResponseCode) {
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", orderService.placeOrderCallback(id, vnp_ResponseCode))
                .build();
    }

    @GetMapping("public/orders/callback/paypal")
    @Operation(tags = "Orders", description = "Place order callback with paypal")
    public ResponseEntity<Void> placeOrderCallbackPayPal(@RequestParam String paymentId,
                                                         @RequestParam String payerId) {
        if (orderService.placeOrderCallbackPayPal(paymentId, payerId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.badRequest().build();
    }


    @GetMapping("ad/orders")
    @Operation(tags = "Orders", description = "Get orders")
    public ResponseEntity<CustomPagination<GetOrdersListResponse>> getOrders(
                                                                            @RequestParam(required = false) PaymentMethod paymentMethod,
                                                                            @RequestParam(required = false) OrderStatus status,
                                                                            @RequestParam String startDate,
                                                                            @RequestParam String endDate,
                                                                            @RequestParam(defaultValue = "1") int page,
                                                                            @RequestParam(defaultValue = "10") int size,
                                                                            @RequestParam(defaultValue = "") String keyword
    ) {
        LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate).plusDays(1).atStartOfDay().minusSeconds(1);
        Page<GetOrdersListResponse> orders = orderService.getOrders(start, end, paymentMethod, status, keyword, page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(orders));
    }

    @GetMapping("user/orders/me")
    @Operation(tags = "Orders", description = "Get my orders")
    public ResponseEntity<CustomPagination<GetOrdersListResponse>> getMyOrders(@RequestParam(defaultValue = "1") int page,
                                                                               @RequestParam(defaultValue = "10") int size
    ) {
        Page<GetOrdersListResponse> orders = orderService.getMyOrders(page - 1, size);
        return ResponseEntity.ok(new CustomPagination<>(orders));
    }


    @GetMapping("public/orders/{id}")
    @Operation(tags = "Orders", description = "Get order detail")
    public ResponseEntity<?> getOrderDetail(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderDetail(id));
    }

    @GetMapping("ad/orders/report")
    @Operation(tags = "Orders", description = "Get report")
    public ResponseEntity<?> getReport(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate).plusDays(1).atStartOfDay().minusSeconds(1);
        return ResponseEntity.ok(orderService.getReport(start, end));
    }

    @GetMapping("ad/orders/report/user")
    @Operation(tags = "Orders", description = "Get user order report")
    public ResponseEntity<?> getUserOrderReport(@RequestParam String startDate, @RequestParam String endDate) {
        LocalDateTime start = LocalDate.parse(startDate).atStartOfDay();
        LocalDateTime end = LocalDate.parse(endDate).plusDays(1).atStartOfDay().minusSeconds(1);
        return ResponseEntity.ok(orderService.getUserReport(start, end));
    }
}

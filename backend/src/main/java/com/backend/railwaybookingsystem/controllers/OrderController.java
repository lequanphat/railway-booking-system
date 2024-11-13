package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.services.OrderService;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


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

    @GetMapping("public/orders/callback/{id}")
    @Operation(tags = "Orders", description = "Place order callback")
    public ResponseEntity<Void> placeOrderCallback(@PathVariable Long id,
                                                                 @RequestParam() String vnp_ResponseCode) {
        return ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", orderService.placeOrderCallback(id, vnp_ResponseCode))
                .build();
    }


    @GetMapping("ad/orders")
    @Operation(tags = "Orders", description = "Get orders")
    public ResponseEntity<CustomPagination<GetOrdersListResponse>> getOrders(@RequestParam(defaultValue = "1") int page,
                                                                             @RequestParam(defaultValue = "10") int size,
                                                                             @RequestParam(defaultValue = "") String keyword
    ) {
        Page<GetOrdersListResponse> orders = orderService.getOrders(keyword, page - 1, size);
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
}

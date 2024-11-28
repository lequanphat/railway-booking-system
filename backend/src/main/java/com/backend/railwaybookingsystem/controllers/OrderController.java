package com.backend.railwaybookingsystem.controllers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.services.OrderService;
import com.backend.railwaybookingsystem.strategies.payment.PaymentContext;
import com.backend.railwaybookingsystem.strategies.payment.enums.PaymentType;
import com.backend.railwaybookingsystem.utils.CustomPagination;
import com.paypal.api.payments.Payment;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("api")
@Slf4j
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentContext paymentContext;

    @Autowired
    private APIContext apiContext;

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

    @PostMapping("public/paypal/orders")
    @Operation(tags = "Orders", description = "Place order with paypal")
    public ResponseEntity<String> placeOrderWithPaypal(@RequestParam Long orderId, @RequestParam Long amount) {
        var savedOrder = paymentContext.executePayment(orderId, amount, PaymentType.PAYPAL);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedOrder);
    }
}

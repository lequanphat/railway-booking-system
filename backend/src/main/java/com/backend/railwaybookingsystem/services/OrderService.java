package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import org.springframework.data.domain.Page;

public interface OrderService {
    PlaceOrderResponse placeOrder(PlaceOrderRequest request);

    String placeOrderCallback(Long orderId, String code);

    Page<GetOrdersListResponse> getOrders(String keyword, int page, int size);

    Page<GetOrdersListResponse> getMyOrders(int page, int size);
}

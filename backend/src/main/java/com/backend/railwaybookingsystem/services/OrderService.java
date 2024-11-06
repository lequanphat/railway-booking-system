package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.models.Order;
import org.springframework.data.domain.Page;

public interface OrderService {
    PlaceOrderResponse placeOrder(PlaceOrderRequest request);

    Page<GetOrdersListResponse> getOrders(String keyword, int page, int size);
}

package com.backend.railwaybookingsystem.services;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.dtos.reports.OrderReportResponse;
import com.backend.railwaybookingsystem.dtos.reports.UserOrderReportResponse;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderService {
    OrderDetailResponse getOrderDetail(Long orderId);

    PlaceOrderResponse placeOrder(PlaceOrderRequest request);

    String placeOrderCallback(Long orderId, String code);

    Page<GetOrdersListResponse> getOrders(String keyword, int page, int size);

    Page<GetOrdersListResponse> getMyOrders(int page, int size);

    List<OrderReportResponse> getReport(LocalDateTime startDate, LocalDateTime endDate);

    UserOrderReportResponse getUserReport(LocalDateTime startDate, LocalDateTime endDate);
}

package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.backend.railwaybookingsystem.models.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    Order convertToOrder(PlaceOrderRequest request);

    GetOrdersListResponse convertToGetOrdersListResponse(Order orders);

    OrderDetailResponse convertToOrderDetailResponse(Order order);
}

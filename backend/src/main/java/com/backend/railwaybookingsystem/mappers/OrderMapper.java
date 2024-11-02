package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.models.Order;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

import java.util.List;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    Order convertToOrder(PlaceOrderRequest request);

    PlaceOrderResponse convertToPlaceOrderResponse(Order order);

    GetOrdersListResponse convertToGetOrdersListResponse(Order orders);
}

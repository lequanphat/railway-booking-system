package com.backend.railwaybookingsystem.mappers;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.tickets.responses.MyTicketResponse;
import com.backend.railwaybookingsystem.models.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;


@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface TicketMapper {
    TicketMapper INSTANCE = Mappers.getMapper(TicketMapper.class);


    Ticket convertToTicket(PlaceOrderRequest.TicketDto ticketDto);

    @Mapping(target = "trainName", source = "schedule.train.name")
    MyTicketResponse convertToMyTicketResponse(Ticket ticket);
}

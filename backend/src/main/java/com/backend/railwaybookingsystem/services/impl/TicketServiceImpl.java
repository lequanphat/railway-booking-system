package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.orders.requests.PlaceOrderRequest;
import com.backend.railwaybookingsystem.dtos.orders.response.GetOrdersListResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.PlaceOrderResponse;
import com.backend.railwaybookingsystem.dtos.tickets.responses.MyTicketResponse;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.mappers.OrderMapper;
import com.backend.railwaybookingsystem.mappers.TicketMapper;
import com.backend.railwaybookingsystem.models.*;
import com.backend.railwaybookingsystem.repositories.*;
import com.backend.railwaybookingsystem.services.OrderService;
import com.backend.railwaybookingsystem.services.TicketService;
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

import java.time.format.DateTimeFormatter;
import java.util.Optional;

@Service
@Slf4j
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Page<MyTicketResponse> getMyTickets(String keyword, int page, int size){
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "id"));

        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = "";
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            email = userDetails.getUsername();
        }
        Optional<User> user = userRepository.findByEmail(email);

        assert user.isPresent();

        Page<MyTicketResponse> tickets = ticketRepository.findTicketByOrderUserId(user.get().getId(), pageRequest)
                .map(TicketMapper.INSTANCE::convertToMyTicketResponse);

        return new PageImpl<>(tickets.getContent(), pageRequest, tickets.getTotalElements());
    }

}


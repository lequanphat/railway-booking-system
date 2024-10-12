package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceResponse;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.mappers.SeatPriceMapper;
import com.backend.railwaybookingsystem.mappers.SeatTypeMapper;
import com.backend.railwaybookingsystem.models.SeatPrice;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.models.Train;
import com.backend.railwaybookingsystem.repositories.SeatPriceRepository;
import com.backend.railwaybookingsystem.repositories.SeatTypeRepository;
import com.backend.railwaybookingsystem.repositories.TrainRepository;
import com.backend.railwaybookingsystem.services.SeatPriceService;
import com.backend.railwaybookingsystem.services.SeatTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class SeatPriceServiceImpl implements SeatPriceService {

}


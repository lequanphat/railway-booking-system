package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.mappers.SeatTypeMapper;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.repositories.SeatTypeRepository;
import com.backend.railwaybookingsystem.services.SeatTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class SeatTypeServiceImpl implements SeatTypeService {
    @Autowired
    private SeatTypeRepository seatTypeRepository;

    public List<SeatTypeResponse> getAllSeatTypes() {
        List<SeatType> seatTypes = seatTypeRepository.findAll();
        return SeatTypeMapper.INSTANCE.convertToSeatTypeResponses(seatTypes);
    }

    public Page<SeatTypeResponse> getSeatTypes(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        var seatTypes = seatTypeRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword, pageRequest)
                .map(SeatTypeMapper.INSTANCE::convertToSeatTypeResponse);

        return seatTypes;
    }

    public SeatTypeResponse saveSeatType(CreateSeatTypeRequest request) {
        SeatType seatType = SeatTypeMapper.INSTANCE.convertToSeatType(request);
        SeatType savedSeatType = seatTypeRepository.save(seatType);
        return SeatTypeMapper.INSTANCE.convertToSeatTypeResponse(savedSeatType);
    }

}


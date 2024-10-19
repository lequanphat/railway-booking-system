package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.requests.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutListResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.response.CreateCarriageLayoutResponse;
import com.backend.railwaybookingsystem.mappers.CarriageLayoutMapper;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.repositories.CarriageLayoutRepository;
import com.backend.railwaybookingsystem.repositories.SeatRepository;
import com.backend.railwaybookingsystem.repositories.SeatTypeRepository;
import com.backend.railwaybookingsystem.services.CarriageLayoutService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class CarriageLayoutServiceImpl implements CarriageLayoutService {

    @Autowired
    private CarriageLayoutRepository carriageLayoutRepository;

    @Autowired
    private SeatTypeRepository seatTypeRepository;

    @Autowired
    private SeatRepository seatRepository;


    public CreateCarriageLayoutResponse saveCarriageLayout(CreateCarriageLayoutRequest request){
        List<Long> seatList = request.getLayout();

        CarriageLayout carriageLayout = CarriageLayoutMapper.INSTANCE.convertToCarriageLayout(request);
        CarriageLayout savedCarriageLayout = carriageLayoutRepository.save(carriageLayout);

        for(int i=0; i< seatList.size(); i++){
            Seat seat = new Seat();
            seat.setPosition(i+1);
            seat.setCarriageLayout(savedCarriageLayout);
            seat.setSeatType(seatTypeRepository.findById(seatList.get(i)).orElse(null));
            seatRepository.save(seat);
        }

        return CarriageLayoutMapper.INSTANCE.convertToCreateCarriageLayoutResponse(savedCarriageLayout);
    }


    public Page<CarriageLayoutListResponse> getCarriageLayouts(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<CarriageLayoutListResponse> carriageLayouts = carriageLayoutRepository.findByNameContainingIgnoreCase(keyword, pageRequest)
                .map(CarriageLayoutMapper.INSTANCE::convertToCarriageLayoutListResponse);

        return new PageImpl<>(carriageLayouts.getContent(), pageRequest, carriageLayouts.getTotalElements());
    }

    public CarriageLayoutResponse getCarriageLayoutById(Long id) {
        return carriageLayoutRepository.findById(id)
                .map(CarriageLayoutMapper.INSTANCE::convertToCarriageLayoutResponse)
                .orElse(null);
    }
}


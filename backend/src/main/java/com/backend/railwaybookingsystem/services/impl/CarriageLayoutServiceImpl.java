package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CarriageLayoutResponse;
import com.backend.railwaybookingsystem.dtos.carriage_layouts.CreateCarriageLayoutRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.CreateSeatTypeRequest;
import com.backend.railwaybookingsystem.dtos.seat_types.SeatTypeResponse;
import com.backend.railwaybookingsystem.dtos.seats.SeatResponse;
import com.backend.railwaybookingsystem.mappers.CarriageLayoutMapper;
import com.backend.railwaybookingsystem.mappers.SeatMapper;
import com.backend.railwaybookingsystem.mappers.SeatTypeMapper;
import com.backend.railwaybookingsystem.models.CarriageLayout;
import com.backend.railwaybookingsystem.models.Seat;
import com.backend.railwaybookingsystem.models.SeatType;
import com.backend.railwaybookingsystem.repositories.CarriageLayoutRepository;
import com.backend.railwaybookingsystem.repositories.SeatRepository;
import com.backend.railwaybookingsystem.repositories.SeatTypeRepository;
import com.backend.railwaybookingsystem.services.CarriageLayoutService;
import com.backend.railwaybookingsystem.services.SeatTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CarriageLayoutServiceImpl implements CarriageLayoutService {

    @Autowired
    private CarriageLayoutRepository carriageLayoutRepository;

    @Autowired
    private SeatTypeRepository seatTypeRepository;

    @Autowired
    private SeatRepository seatRepository;


    public CarriageLayoutResponse saveCarriageLayout(CreateCarriageLayoutRequest request){
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

        return CarriageLayoutMapper.INSTANCE.convertToCarriageLayoutResponse(savedCarriageLayout);
    }

    public Page<CarriageLayoutResponse> getCarriageLayouts(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<CarriageLayout> carriageLayouts = carriageLayoutRepository.findByNameContainingIgnoreCase(keyword, pageRequest);

        List<CarriageLayoutResponse> carriageLayoutsList = CarriageLayoutMapper.INSTANCE.convertToCarriageLayoutResponses(carriageLayouts.getContent());

        return new PageImpl<>(carriageLayoutsList, pageRequest, carriageLayouts.getTotalElements());
    }

    public CarriageLayoutResponse getCarriageLayoutById(Long id) {
        CarriageLayout carriageLayout = carriageLayoutRepository.findById(id).orElse(null);

        if (carriageLayout != null) {
            List<SeatResponse> seatResponses = carriageLayout.getSeats().stream()
                    .map(SeatMapper.INSTANCE::convertToSeatResponseWithType) // Sử dụng phương thức mới
                    .collect(Collectors.toList());

            CarriageLayoutResponse response = CarriageLayoutMapper.INSTANCE.convertToCarriageLayoutResponse(carriageLayout);
            response.setSeats(seatResponses);
            return response;
        }
        return null;
    }
}


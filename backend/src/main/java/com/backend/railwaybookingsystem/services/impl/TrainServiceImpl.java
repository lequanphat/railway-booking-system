package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetAllTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.*;
import com.backend.railwaybookingsystem.models.*;
import com.backend.railwaybookingsystem.repositories.*;
import com.backend.railwaybookingsystem.services.TrainService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@Slf4j
public class TrainServiceImpl implements TrainService {

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private CarriageRepository carriageRepository;

    @Autowired
    private CarriageLayoutRepository carriageLayoutRepository;

    @Autowired
    private SeatTypeRepository seatTypeRepository;

    @Autowired
    private SeatPriceRepository seatPriceRepository;


    public CreateTrainResponse saveTrain(CreateTrainRequest request) {
        List<Long> carriages = request.getCarriagesList();

        List<SeatPriceRequest> seatPricesList = request.getSeatPricesList();

        Train train = TrainMapper.INSTANCE.convertToTrain(request);
        Train savedTrain = trainRepository.save(train);

        for (int i = 0; i < carriages.size(); i++) {
            Carriage carriage = new Carriage();
            carriage.setPosition(i + 1);
            carriage.setCarriageLayout(carriageLayoutRepository.findById(carriages.get(i)).orElse(null));
            carriage.setTrain(train);
            carriageRepository.save(carriage);
        }

        for (SeatPriceRequest seatPriceRequest : seatPricesList) {
            SeatPrice seatPrice = new SeatPrice();
            seatPrice.setOriginal_price_per_km(seatPriceRequest.getPrice());
            seatPrice.setSeatType(seatTypeRepository.findById(seatPriceRequest.getSeat_type_id()).orElse(null));
            seatPrice.setTrain(train);
            seatPriceRepository.save(seatPrice);
        }

        return TrainMapper.INSTANCE.convertToCreateTrainResponse(savedTrain);
    }

    public Page<TrainListResponse> getTrains(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<TrainListResponse> trains = trainRepository.findByNameContainingIgnoreCase(keyword, pageRequest)
                .map(TrainMapper.INSTANCE::convertToTrainListResponse);

        return new PageImpl<>(trains.getContent(), pageRequest, trains.getTotalElements());
    }

    @Override
    public List<GetAllTrainResponse> getAllTrains() {
        return TrainMapper.INSTANCE.convertToTrainListResponseList(trainRepository.findAll());
    }

    public TrainDetailResponse getTrainDetailById(Long id) {
        TrainDetailResponse train = trainRepository.findById(id)
                .map(TrainMapper.INSTANCE::convertToTrainDetailResponse)
                .orElse(null);

        if(train == null){
            throw new NotFoundException("Train not found");
        }
        List<TrainDetailResponse.CarriageDto> carriages = train.getCarriages();
        Collections.sort(carriages, Comparator.comparingInt(TrainDetailResponse.CarriageDto::getPosition));

        for (TrainDetailResponse.CarriageDto carriage : carriages) {
            List<TrainDetailResponse.CarriageDto.CarriageLayoutDto.SeatDto> seats = carriage.getCarriageLayout().getSeats();
            Collections.sort(seats, Comparator.comparingInt(TrainDetailResponse.CarriageDto.CarriageLayoutDto.SeatDto::getPosition));
        }
        return train;
    }
}


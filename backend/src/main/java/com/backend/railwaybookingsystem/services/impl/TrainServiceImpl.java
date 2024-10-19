package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
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

    public TrainDetailResponse getTrainDetailById(Long id) {
        return trainRepository.findById(id)
                .map(TrainMapper.INSTANCE::convertToTrainDetailResponse)
                .orElse(null);
    }
}


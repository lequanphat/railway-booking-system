package com.backend.railwaybookingsystem.services.impl;
import com.backend.railwaybookingsystem.dtos.carriages.CarriageResponse;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceRequest;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceResponse;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainResponse;
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
import java.util.stream.Collectors;

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


    public TrainResponse saveTrain(CreateTrainRequest request){
        List<Long> carriages = request.getCarriagesList();

        List<SeatPriceRequest> seatPricesList = request.getSeatPricesList();

        Train train = TrainMapper.INSTANCE.convertToTrain(request);
        Train savedTrain = trainRepository.save(train);

        for(int i=0; i< carriages.size(); i++){
            Carriage carriage = new Carriage();
            carriage.setPosition(i+1);
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

        return TrainMapper.INSTANCE.convertToTrainResponse(savedTrain);
    }

    public Page<TrainResponse> getTrains(String keyword, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "id"));

        Page<Train> trains = trainRepository.findByNameContainingIgnoreCase(keyword, pageRequest);

        List<TrainResponse> trainsList = TrainMapper.INSTANCE.convertToTrainResponses(trains.getContent());

        return new PageImpl<>(trainsList, pageRequest, trains.getTotalElements());
    }

    public TrainResponse getTrainById(Long id) {
        Train train = trainRepository.findById(id).orElse(null);

        if (train != null) {
            List<CarriageResponse> carriages = train.getCarriages().stream()
                    .map(CarriageMapper.INSTANCE::convertToCarriageResponseWithLayout)
                    .collect(Collectors.toList());

            List<SeatPriceResponse> seatPrices = train.getSeatPrices().stream()
                    .map(SeatPriceMapper.INSTANCE::convertToSeatPriceResponseWithType)
                    .collect(Collectors.toList());

            TrainResponse response = TrainMapper.INSTANCE.convertToTrainResponse(train);
            response.setCarriages(carriages);
            response.setSeatPrices(seatPrices);
            return response;
        }
        return null;
    }
}


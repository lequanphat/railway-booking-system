package com.backend.railwaybookingsystem.services.impl;

import com.backend.railwaybookingsystem.dtos.carriages.GetCarriageOfTrainResponse;
import com.backend.railwaybookingsystem.dtos.orders.response.OrderDetailResponse;
import com.backend.railwaybookingsystem.dtos.reports.OrderReportResponse;
import com.backend.railwaybookingsystem.dtos.reports.TrainReportResponse;
import com.backend.railwaybookingsystem.dtos.seat_prices.SeatPriceRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.CreateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.requests.UpdateTrainRequest;
import com.backend.railwaybookingsystem.dtos.trains.responses.CreateTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.GetAllTrainResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainDetailResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.TrainListResponse;
import com.backend.railwaybookingsystem.dtos.trains.responses.UpdateTrainResponse;
import com.backend.railwaybookingsystem.exceptions.BadRequestException;
import com.backend.railwaybookingsystem.exceptions.NotFoundException;
import com.backend.railwaybookingsystem.mappers.*;
import com.backend.railwaybookingsystem.models.*;
import com.backend.railwaybookingsystem.repositories.*;
import com.backend.railwaybookingsystem.services.TrainService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
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

        if (train == null) {
            throw new NotFoundException("Train not found");
        }
        return train;
    }

    @Transactional
    public UpdateTrainResponse updateTrain(Long id, UpdateTrainRequest request) {
        Train train = trainRepository.findById(id).orElse(null);
        if (train == null) {
            throw new NotFoundException("Train not found");
        }

        List<Long> newCarriages = request.getCarriagesList();

        // update carriage in same block

        int updatedLength = Math.min(newCarriages.size(), train.getCarriages().size());

        for (int i = 0; i < updatedLength; i++) {
            Carriage preCarriage = train.getCarriages().get(i);
            if (!Objects.equals(preCarriage.getCarriageLayout().getId(), newCarriages.get(i))) {
                preCarriage.setCarriageLayout(carriageLayoutRepository.getReferenceById(newCarriages.get(i)));
                carriageRepository.save(preCarriage);
            }
        }

        // update carriage in different block

        int differentLength = newCarriages.size() - train.getCarriages().size();

        if (differentLength < 0) {
            for (int i = train.getCarriages().size() - 1; i >= updatedLength; i--) {
                Carriage carriage = train.getCarriages().get(i);
                train.getCarriages().remove(carriage);
                carriageRepository.delete(carriage);
            }
        } else if (differentLength > 0) {
            for (int i = 0; i < differentLength; i++) {
                Carriage carriage = new Carriage();
                carriage.setPosition(updatedLength + i + 1);
                carriage.setCarriageLayout(carriageLayoutRepository.findById(newCarriages.get(updatedLength + i)).orElse(null));
                carriage.setTrain(train);
                carriageRepository.save(carriage);
            }
        }

        // update seat prices
        List<SeatPriceRequest> seatPricesList = request.getSeatPricesList();

        for (SeatPriceRequest seatPriceRequest : seatPricesList) {
            SeatPrice seatPrice = seatPriceRepository.findByTrainIdAndSeatTypeId(train.getId(), seatPriceRequest.getSeat_type_id());
            if (seatPrice == null) {
                seatPrice = new SeatPrice();
                seatPrice.setTrain(train);
                seatPrice.setSeatType(seatTypeRepository.findById(seatPriceRequest.getSeat_type_id()).orElse(null));
            }
            seatPrice.setOriginal_price_per_km(seatPriceRequest.getPrice());
            seatPriceRepository.save(seatPrice);
        }

        return TrainMapper.INSTANCE.convertToUpdateTrainResponse(train);
    }

    @Override
    public List<TrainReportResponse> getReport(LocalDateTime startDate, LocalDateTime endDate) {
        List<Object[]> results = trainRepository.getReport(startDate, endDate);
        return results.stream()
                .map(row -> new TrainReportResponse(
                        ((Number) row[0]).longValue(),
                        ((Number) row[1]).doubleValue(),
                        ((String) row[2])
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<GetCarriageOfTrainResponse> getCarriagesOfTrain(Long trainId) {
        var result = carriageRepository.findCarriagesByTrainIdOrOrderByPosition(trainId);
        return CarriageMapper.INSTANCE.toGetCarriageOfTrainResponseList(result);
    }
}


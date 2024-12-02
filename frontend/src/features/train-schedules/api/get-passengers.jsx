import { useQuery } from '@tanstack/react-query';
import { api } from '~/lib/api';

export const searchPassengers = ({
  trainId,
  departureTime,
  personTypeId,
  carriageId,
  departureStation,
  arrivalStation,
  keyword,
  page,
  size,
}) => {
  return api.get(`/ad/tickets/search`, {
    params: {
      trainId,
      departureTime,
      personTypeId,
      carriageId,
      departureStation,
      arrivalStation,
      keyword,
      page,
      size,
    },
  });
};

export const useSearchPassengers = ({
  trainId,
  departureTime,
  personTypeId,
  carriageId,
  departureStation,
  arrivalStation,
  keyword,
  page,
  size,
}) => {
  return useQuery({
    queryKey: [
      'passengers',
      {
        trainId,
        departureTime,
        personTypeId,
        carriageId,
        departureStation,
        arrivalStation,
        keyword,
        page,
        size,
      },
    ],
    queryFn: () =>
      searchPassengers({
        trainId,
        departureTime,
        personTypeId,
        carriageId,
        departureStation,
        arrivalStation,
        keyword,
        page,
        size,
      }),
  });
};

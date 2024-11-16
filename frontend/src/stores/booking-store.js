import { create } from 'zustand';

const useBookingStore = create((set) => ({
  scheduleId: null,
  train: null,
  currentStep: 1,
  departureStation: null,
  arrivalStation: null,
  arrivalRouteIndex: -1,
  departureRouteIndex: -1,
  totalDistance: 0,
  departureDate: null,
  routeSegments: [],
  selectedSeats: [],
  passengerInformation: null,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  initBookingStore: ({
    scheduleId,
    train,
    totalDistance,
    arrivalRouteIndex,
    departureRouteIndex,
    routeSegments,
    departureDate,
    departureStation,
    arrivalStation,
  }) =>
    set({
      scheduleId,
      train,
      totalDistance,
      arrivalRouteIndex,
      departureRouteIndex,
      routeSegments,
      departureDate,
      departureStation,
      arrivalStation,
    }),
  setSelectedSeats: (selectedSeats) => set({ selectedSeats }),
  setPassengerInformation: (passengerInformation) => set({ passengerInformation }),
}));

export default useBookingStore;

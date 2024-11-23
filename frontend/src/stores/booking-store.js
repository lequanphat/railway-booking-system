import { create } from 'zustand';
import { TripType } from '~/enums/trip-type';

const useBookingStore = create((set, get) => ({
  // app state
  isOpenBookingModal: false,
  // booking data
  type: TripType.OneWay,
  oneWay: {
    scheduleId: null,
    train: null,
    departureStation: null,
    arrivalStation: null,
    arrivalRouteIndex: -1,
    departureRouteIndex: -1,
    totalDistance: 0,
    departureDate: null,
    routeSegments: [],
    selectedSeats: [],
    tickets: [],
  },
  roundTrip: {
    scheduleId: null,
    train: null,
    totalDistance: 0,
    departureStation: null,
    arrivalStation: null,
    arrivalRouteIndex: -1,
    departureRouteIndex: -1,
    departureDate: null,
    routeSegments: [],
    selectedSeats: [],
    tickets: [],
  },

  // biller info
  billerInformation: {
    fullName: null,
    identity: null,
    email: null,
    phoneNumber: null,
  },

  // steps
  paymentStep: 1,
  seatSelectionStep: 1,

  // actions
  openBookingModal: ({ scheduleId, departureStation, arrivalStation }) =>
    set((state) => {
      if (state.seatSelectionStep === 1) {
        return {
          isOpenBookingModal: true,
          oneWay: {
            ...state.oneWay,
            scheduleId,
            departureStation,
            arrivalStation,
          },
        };
      }
      return {
        isOpenBookingModal: true,
        roundTrip: {
          ...state.roundTrip,
          scheduleId,
          departureStation,
          arrivalStation,
        },
      };
    }),

  closeBookingModal: () => set({ isOpenBookingModal: false }),
  setBookingType: (type) => set({ type }),
  nextPaymentStep: () => set((state) => ({ paymentStep: state.paymentStep + 1 })),
  prevPaymentStep: () => set((state) => ({ paymentStep: state.paymentStep - 1 })),
  nextSeatSelectionStep: () => set((state) => ({ seatSelectionStep: state.seatSelectionStep + 1 })),
  prevSeatSelectionStep: () => set((state) => ({ seatSelectionStep: state.seatSelectionStep - 1 })),
  initBookingStore: ({ train, totalDistance, arrivalRouteIndex, departureRouteIndex, routeSegments, departureDate }) =>
    set((state) => {
      if (state.seatSelectionStep === 1) {
        // handle oneway
        return {
          oneWay: {
            ...state.oneWay,
            train,
            totalDistance,
            arrivalRouteIndex,
            departureRouteIndex,
            departureDate,
            routeSegments,
          },
        };
      }
      // handle roundtrip
      return {
        roundTrip: {
          ...state.roundTrip,
          train,
          totalDistance,
          arrivalRouteIndex,
          departureRouteIndex,
          departureDate,
          routeSegments,
        },
      };
    }),

  setSelectedSeats: (selectedSeats) =>
    set((state) => {
      if (state.seatSelectionStep === 1) {
        return {
          oneWay: {
            ...state.oneWay,
            selectedSeats,
          },
        };
      }
      return {
        roundTrip: {
          ...state.roundTrip,
          selectedSeats,
        },
      };
    }),

  resetSelectedSeats: () =>
    set((state) => {
      if (state.seatSelectionStep === 1) {
        return {
          oneWay: {
            ...state.oneWay,
            selectedSeats: [],
          },
        };
      }
      return {
        roundTrip: {
          ...state.roundTrip,
          selectedSeats: [],
        },
      };
    }),

  setTickets: ({ oneWayTickets, roundTripTickets }) =>
    set((state) => ({
      oneWay: {
        ...state.oneWay,
        tickets: oneWayTickets,
      },
      roundTrip: {
        ...state.roundTrip,
        tickets: roundTripTickets,
      },
    })),

  setBillerInformation: ({ fullName, identity, email, phoneNumber }) =>
    set({ billerInformation: { fullName, identity, email, phoneNumber } }),

  // selectors
  getRouteSegments: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.routeSegments : state.roundTrip.routeSegments;
  },

  getTrain: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.train : state.roundTrip.train;
  },

  getTotalDistance: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.totalDistance : state.roundTrip.totalDistance;
  },

  getArrivalRouteIndex: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.arrivalRouteIndex : state.roundTrip.arrivalRouteIndex;
  },

  getDepartureRouteIndex: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.departureRouteIndex : state.roundTrip.departureRouteIndex;
  },

  getDepartureStation: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.departureStation : state.roundTrip.departureStation;
  },

  getArrivalStation: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.arrivalStation : state.roundTrip.arrivalStation;
  },
  getDepartureDate: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.departureDate : state.roundTrip.departureDate;
  },

  getSelectedSeats: () => {
    const state = get();
    return state.seatSelectionStep === 1 ? state.oneWay.selectedSeats : state.roundTrip.selectedSeats;
  },
}));

export default useBookingStore;

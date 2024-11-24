import { create } from 'zustand';
import { BOOKING_TYPE } from '~/config/constants';
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

  // temp state
  personTypes: [],
  setPersonTypes: (personTypes) => set({ personTypes }),

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
            selectedSeats: [],
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
          selectedSeats: [],
        },
      };
    }),

  closeBookingModal: () => set({ isOpenBookingModal: false }),
  nextPaymentStep: () => set((state) => ({ paymentStep: state.paymentStep + 1 })),
  prevPaymentStep: () => set((state) => ({ paymentStep: state.paymentStep - 1 })),
  nextSeatSelectionStep: () => set((state) => ({ seatSelectionStep: state.seatSelectionStep + 1 })),
  prevSeatSelectionStep: () => set((state) => ({ seatSelectionStep: state.seatSelectionStep - 1 })),

  setBookingType: (type) => {
    set({
      type,
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
      billerInformation: {
        fullName: null,
        identity: null,
        email: null,
        phoneNumber: null,
      },
      paymentStep: 1,
      seatSelectionStep: 1,
      personTypes: [],
    });
  },
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

  setDiscountForSeat: ({ objectId, seatId, carriageId, type = BOOKING_TYPE.ONE_WAY }) =>
    set((state) => {
      const personType = state.personTypes.find((person) => person.id === objectId);
      if (!personType) return state;

      if (type === BOOKING_TYPE.ONE_WAY) {
        const seat = state.oneWay.selectedSeats.find((seat) => seat.id === seatId && seat.carriageId === carriageId);
        if (seat) {
          return {
            oneWay: {
              ...state.oneWay,
              selectedSeats: state.oneWay.selectedSeats.map((s) => {
                if (s.id === seatId && s.carriageId === carriageId) {
                  return {
                    ...s,
                    discounts: [
                      {
                        percentage: personType.percentage,
                        description: personType.description,
                        type: 'OBJECT_DISCOUNT',
                      },
                    ],
                  };
                }
                return s;
              }),
            },
          };
        }
      }

      const seat = state.roundTrip.selectedSeats.find((seat) => seat.id === seatId && seat.carriageId === carriageId);
      if (seat) {
        return {
          roundTrip: {
            ...state.roundTrip,
            selectedSeats: state.roundTrip.selectedSeats.map((s) => {
              if (s.id === seatId && s.carriageId === carriageId) {
                return {
                  ...s,
                  discounts: [
                    { percentage: personType.percentage, description: personType.description, type: 'OBJECT_DISCOUNT' },
                    { percentage: 10, description: 'Giảm giá 10% khi đặt vé khứ hồi', type: 'ROUNDTRIP_DISCOUNT' },
                  ],
                };
              }
              return s;
            }),
          },
        };
      }
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

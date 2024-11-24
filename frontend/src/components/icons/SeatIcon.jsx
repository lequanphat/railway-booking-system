import { SEAT_TYPE } from '~/config/constants';

const SeatIcon = ({ type = SEAT_TYPE.AVAILABLE }) => {
  if (type === SEAT_TYPE.SELECTED) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24">
        <path
          fill="#006dae"
          d="M5 21q-.425 0-.712-.288T4 20v-1q-1.25 0-2.125-.875T1 16v-5q0-.825.588-1.412T3 9t1.413.588T5 11v4h14v-4q0-.825.588-1.412T21 9t1.413.588T23 11v5q0 1.25-.875 2.125T20 19v1q0 .425-.288.713T19 21t-.712-.288T18 20v-1H6v1q0 .425-.288.713T5 21m2-8v-2q0-1.375-.837-2.463T4 7V6q0-1.25.875-2.125T7 3h10q1.25 0 2.125.875T20 6v1q-1.35.35-2.175 1.463T17 11v2z"
        />
      </svg>
    );
  }
  if (type === SEAT_TYPE.UNAVAILABLE) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24">
        <path
          fill="#8c8c8c"
          d="M5 21q-.425 0-.712-.288T4 20v-1q-1.25 0-2.125-.875T1 16v-5q0-.825.588-1.412T3 9t1.413.588T5 11v4h14v-4q0-.825.588-1.412T21 9t1.413.588T23 11v5q0 1.25-.875 2.125T20 19v1q0 .425-.288.713T19 21t-.712-.288T18 20v-1H6v1q0 .425-.288.713T5 21m2-8v-2q0-1.375-.837-2.463T4 7V6q0-1.25.875-2.125T7 3h10q1.25 0 2.125.875T20 6v1q-1.35.35-2.175 1.463T17 11v2z"
        />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="4rem" height="4rem" viewBox="0 0 24 24">
      <path
        fill="#a1b7d4"
        d="M5 21q-.425 0-.712-.288T4 20v-1q-1.25 0-2.125-.875T1 16v-5q0-.825.588-1.412T3 9t1.413.588T5 11v4h14v-4q0-.825.588-1.412T21 9t1.413.588T23 11v5q0 1.25-.875 2.125T20 19v1q0 .425-.288.713T19 21t-.712-.288T18 20v-1H6v1q0 .425-.288.713T5 21m2-8v-2q0-1.375-.837-2.463T4 7V6q0-1.25.875-2.125T7 3h10q1.25 0 2.125.875T20 6v1q-1.35.35-2.175 1.463T17 11v2z"
      />
    </svg>
  );
};

export default SeatIcon;

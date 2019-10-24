import { BASE_URL, APP_KEY, API_ID } from "./../constants";

export const getStopPointTimetableURL = (lineId, stopPointId) => {
  return `${BASE_URL}/Line/${lineId}/Timetable/${stopPointId}?app_key=${APP_KEY}&app_id=${API_ID}`;
};

export const getNearbyStopsURL = (lat, lon) => {
  return `${BASE_URL}/Stoppoint?lat=${lat}&lon=${lon}&stoptypes=NaptanMetroStation,NaptanRailStation,NaptanBusCoachStation,NaptanPublicBusCoachTram&radius=200&app_key=${APP_KEY}&app_id=${API_ID}`;
};

export const getDate = (hour, min) => {
  const date = new Date();
  date.setHours(hour, min);

  return date;
};

export const formatDate = (hour, min) => {
  const formattedHour = (parseInt(hour) < 10 ? "0" : "") + hour;
  const formattedMin = (parseInt(min) < 10 ? "0" : "") + min;

  return `${formattedHour}:${formattedMin}`;
};

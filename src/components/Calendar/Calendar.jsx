import React, { useState } from "react";
import "react-dates/initialize";
import { useDispatch,  useSelector } from 'react-redux';
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { isCalendar } from "../../containers/Home/Carousel/module/action";
function DatePicker(props) {
  const { StartDate, EndDate} = useSelector(state => state.CarouselReducer)
  const [startDate, setStartDate] = useState(StartDate);
  const dispatch = useDispatch()
  const [endDate, setEndDate] = useState( EndDate);
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    dispatch(isCalendar(startDate, endDate))
  };
  return (
    <div className="date">
      <DateRangePicker
        startDate={startDate}
        startDateId="tata-start-date"
        endDate={endDate}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        width={900}
        showClearDates={true}
        displayFormat="MMM D"
      />
      </div>
  );
}

export default DatePicker;
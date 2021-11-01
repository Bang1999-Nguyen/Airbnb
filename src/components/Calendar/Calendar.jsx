import React, { useState } from "react";
import "react-dates/initialize";
import { useDispatch } from 'react-redux';
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { isCalendar } from "../../containers/Home/Carousel/module/action";
function DatePicker(props) {
  // console.log(startOfDate, endOfDate);
  const [startDate, setStartDate] = useState(null);
  const dispatch = useDispatch()
  const [endDate, setEndDate] = useState(null);
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
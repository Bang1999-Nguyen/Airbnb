import React, { useState } from "react";
import "react-dates/initialize";
import { useDispatch,  useSelector } from 'react-redux';
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { isCalendar } from "../../containers/Home/Carousel/module/action";
import moment from "moment";
function DatePicker(props) {
  const { StartDate, EndDate} = useSelector(state => state.CarouselReducer)
  const [startDate, setStartDate] = useState('');
  const dispatch = useDispatch()
  const [endDate, setEndDate] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  const FirstDay = (moment(startDate).format('YYYY/MM/DD'));
  const LastDay = (moment(endDate).format('YYYY/MM/DD'));
    dispatch(isCalendar(startDate, endDate))
    dispatch({
      type:'START_DATE',
      payload: FirstDay
    })
    dispatch({
      type:'END_DATE',
      payload: LastDay
    })
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
        displayFormat="DD/MM/YYYY"
      />
      </div>
  );
}

export default DatePicker;
import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const DateRangePickerComponent = ({data, setData}) => {
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: null,
  //     key: 'selection'
  //   }
  // ]);
  // console.log(state);

  return (
    <DateRange
      editableDateInputs={true}
      onChange={item => setData([item.selection])}
      moveRangeOnFirstSelection={false}
      ranges={data}
    />
  )
}

export default DateRangePickerComponent
import React from 'react';
import Analytics from './analytics';
import Analytics2 from './analytics2';
import Analytics3 from './analytics3';
import '../../Css/admin/analytics.css'
import LineChart from './analytics3';

class HotelAnalysis extends React.Component {
  render() {
    return (
    <>
      <Analytics2 />
    </>
    );
  }
}

export default HotelAnalysis;
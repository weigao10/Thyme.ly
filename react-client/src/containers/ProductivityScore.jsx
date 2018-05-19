import React from "react";
import Paper from "material-ui/Paper";

import ReactSpeedometer from "react-d3-speedometer";

//import rd3 from 'react-d3-library';
//import node from 'd3file';
//const RD3Component = rd3.Component;

//import {PieChart} from 'react-d3-components';

//import c3 from "c3";
// import 'c3/c3.css';

class ProductivityScore extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  //   var chart = c3.generate({
  //     bindto: "#gauge",
  //     data: {
  //       columns: [["data", 92]],
  //       type: "gauge"
  //       // onclick: function (d, i) { console.log("onclick", d, i); },
  //       // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
  //       // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  //     },
  //     gauge: {
  //        label: {
  //            format: function(value, ratio) {
  //                return value + '%';
  //            },
  //            show: false // to turn off the min/max labels.
  //        },
  // //    min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
  // //    max: 100, // 100 is default
  // //    units: ' %',
  //      width: 30 // for adjusting arc thickness
  //     },
  //     color: {
  //       pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"], // the three color levels for the percentage values.
  //       threshold: {
  //         //            unit: 'value', // percentage is default
  //         //            max: 200, // 100 is default
  //         values: [30, 60, 90, 100]
  //       }
  //     },
  //     size: {
  //         height: 150
  //     }
  //   });
  }

  calculateProductivityScore() {
    //add up all the time spent on (1) productive activities (2) distracting activities
    //then, return the score according to a formula
    var productive = 0; 
    var neutral = 0;
    var distracting = 0;
    var productivityScore = 0;

    this.props.activities.productive.forEach((activityCard) => {
      productive += activityCard.duration;
    })

    this.props.activities.neutral.forEach((activityCard) => {
      neutral += activityCard.duration;
    })

    this.props.activities.distracting.forEach((activityCard) => {
      distracting += activityCard.duration;
    })

    productivityScore = Math.floor( (productive / (productive + neutral + distracting) * 100 ) );

    console.error('productivity score is:', productivityScore)
    console.error('productivity and distracting are:', productive, distracting, neutral)

    return productivityScore;
  }


  render() {
 
    console.log('PROD SCORE props.activities are:', this.props.activities)
    // const data = {}
    // data.width = 500;
    // data.height = 750;

    // data.dataset = [
    //   {label: 'dogs', quantity: 140},
    //   {label: 'cats', quantity: 91},
    //   {label: 'hamsters', quantity: 88},
    //   {label: 'parrots', quantity: 74},
    //   {label: 'rabbits', quantity: 63},
    // ]

    // data.colors = ["blue", "orange", "purple", 'green', 'red', "yellow", 'lemonChiffon'];

    // data.arcClass = 'arc';

    return (
        <Paper style={{ fontSize: "125%", textAlign: "center" }}>
          <h3>Your Productivity Score</h3>
          {/* <div id="gauge" style={{ lineHeight: "300px" }} /> */}

          <ReactSpeedometer 
            value={this.calculateProductivityScore()}
            minValue={0}
            maxValue={100}
            segments={5}
            width={200}
            height={200}
            needleColor={'black'}
            ringWidth={35}
            currentValueText={''}
          />

        </Paper>
    );
  }
}

export default ProductivityScore;

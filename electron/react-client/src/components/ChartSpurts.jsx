import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';
import clone from 'clone';

const data = [
  {name: '8am', uv: 280, pv: 450, amt: 360},
];
const data2 = [
  {name: '9am', uv: 280, pv: 450, amt: 360},
];
const data3 = [
  {name: '10am', uv: 280, pv: 450, amt: 360},
];
const data4 = [
  {name: '11am', uv: 280, pv: 450, amt: 360},
];

const createBarChartSpurts = (activities) => {

  let barChartSpurts = [];

  //Loop through all nested objects and nested arrays to accumulate all spurts into one array
  for (var key in activities) { //keys are: productive, neutral, distracting, nextId
    if (key !== 'nextId') {
      for (var i = 0; i < activities[key].length; i++) {
        let currentApp = activities[key][i];
        let currentAppName = currentApp.app;

        for (var j = 0; j < currentApp.spurts.length; j++) {
          console.warn('current spurt', currentSpurt)
          let currentSpurt = currentApp.spurts[j];

          let mappedSpurt = {
            name: currentAppName,
            startTime: currentSpurt.startTime,
            endTime: currentSpurt.endTime
          }

          barChartSpurts.push(mappedSpurt);

        }
      }
    }
  }

  return barChartSpurts;
}

const formatXAxis = function(tickItem) {
  if (tickItem === 3600)
    return ''

  return ':' + tickItem / 60;
}

const ChartSpurts = ({activities}) => {

    let currentActivities = clone(activities);
    // console.error('barChartSpurts is:\n"', createBarChartSpurts(currentActivities));
    console.error(JSON.stringify(activities));

    let sampleData = [
    {id: 2, app: "Google Chrome", title: "Label in center of PieChart · Issue #191 · recharts/recharts", spurts: Array(32), duration: 37},
    {id: 4, app: "Google Chrome", title: "CustomActiveShapePieChart | Recharts", spurts: Array(3), duration: 4},
    {id: 5, app: "Google Chrome", title: "A pie chart that has customized label - JSFiddle", spurts: Array(7), duration: 557},
    {id: 9, app: "Slack", title: "Slack - Hack Reactor NYC - Students", spurts: Array(14), duration: 14},
    ];

    let sampleSpurts1 = [
    {startTime: "May 21st 2018, 7:38:43 pm", endTime: "May 21st 2018, 7:38:44 pm"},
    {startTime: "May 21st 2018, 7:38:43 pm", endTime: "May 21st 2018, 7:38:44 pm"},
    {startTime: "May 21st 2018, 7:38:43 pm", endTime: "May 21st 2018, 7:38:44 pm"}
    ];



    //make the spurts data 1 object with keys, and each key represents a bar/spurt
    const mappedSpurts = [
      {name: '11am', uv: 280, pv: 450, amt: 360},
    ];

    return (
    <div style={{marginTop: '15px'}}>
      <h3>Your Timeline</h3>
      <BarChart 
        width={700} 
        height={65} 
        data={data} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 0, bottom: 5}}
      >
        <XAxis axisLine={false} type="number"
          ticks={[600, 1200, 1800, 2400, 3000, 3600]}
          tickFormatter={formatXAxis}  
        />
        <YAxis tickLine={false} type="category" dataKey="name" />
        <CartesianGrid horizontal={false} verticalFill={['#FFF']} />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#82ca9d" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
      </BarChart>
      
      <BarChart 
        width={600} 
        height={65} 
        data={data2} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 0, bottom: 5}}
      >
        <XAxis axisLine={false} type="number"
          ticks={[600, 1200, 1800, 2400, 3000, 3600]}
          tickFormatter={formatXAxis}  
        />
        <YAxis tickLine={false} type="category" dataKey="name" />
        <CartesianGrid horizontal={false} verticalFill={['#FFF']} />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#8884d8" />
        
        <Bar dataKey="uv" stackId='1' fill="#82ca9d" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
      </BarChart>
      
      <BarChart 
        width={600} 
        height={65} 
        data={data3} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 0, bottom: 5}}
      >
        <XAxis axisLine={false} type="number"
          ticks={[600, 1200, 1800, 2400, 3000, 3600]}
          tickFormatter={formatXAxis}  
        />
        <YAxis tickLine={false} type="category" dataKey="name" />
        <CartesianGrid horizontal={false} verticalFill={['#FFF']} />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="pv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#8884d8" />
        <Bar dataKey="uv" stackId='1' fill="#82ca9d" />
        <Bar dataKey="uv" stackId='1' fill="#ffcc33" />
      </BarChart>
    </div>
    );
}

export default ChartSpurts;

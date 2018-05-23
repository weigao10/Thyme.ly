import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import moment from 'moment';

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
const formatXAxis = function(tickItem) {
  if (tickItem === 3600)
    return ''

  return ':' + tickItem / 60;
}

const timestampToUnix = (timeStamp) => {
  return moment(timeStamp, 'MMMM Do YYYY, h:mm:ss a').valueOf();
}

const getSpurts = (activities, category) => {
  const extractedSpurts = activities[category].map((activity) => {
    return activity.spurts.map(spurt => {
      return {
        app: activity.app,
        title: activity.title,
        startTime: spurt.startTime,
        endTime: spurt.endTime,
        productivity_class: activity.productivity.class,
        productivity_source: activity.productivity.source, // in case necessary
      }
    })
  });
  return extractedSpurts.length ? extractedSpurts.reduce((a, b) => a.concat(b)) : [];
}

const getAllSpurts = (activities) => {
  const flattenedSpurts = [...getSpurts(activities, 'productive'), ...getSpurts(activities, 'neutral'), ...getSpurts(activities, 'distracting')]
  return flattenedSpurts.sort((a, b) => timestampToUnix(a.startTime) - timestampToUnix(b.startTime))
}

const ChartSpurts = (props) => {

  console.log(JSON.stringify(getAllSpurts(props.activities)))

    let sampleData = [
    {id: 2, app: "Google Chrome", title: "Label in center of PieChart · Issue #191 · recharts/recharts", spurts: Array(32), duration: 37},
    {id: 4, app: "Google Chrome", title: "CustomActiveShapePieChart | Recharts", spurts: Array(3), duration: 4},
    {id: 5, app: "Google Chrome", title: "A pie chart that has customized label - JSFiddle", spurts: Array(7), duration: 557},
    {id: 9, app: "Slack", title: "Slack - Hack Reactor NYC - Students", spurts: Array(14), duration: 14},
    ];

    let sampleSpurts = [
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

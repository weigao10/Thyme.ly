import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const sumDuration = (activityArr) => {
  if (!activityArr.length) return 0;
  return activityArr.reduce((a, b) => {
    return a + b.duration;
  }, 0);
}

const ActivityRadarChart = ({ activities }) => {
  console.log('Activities inside ActivityRadarChart are', activities);
  const data = [
    {
      category: 'distracting',
      duration: sumDuration(activities.distracting)
    },
    {
      category: 'neutral',
      duration: sumDuration(activities.neutral)
    },
    {
      category: 'productive',
      duration: sumDuration(activities.productive)
    }
  ];

  return (
    <RadarChart cx={300} cy={250} outerRadius={150} width={600} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="category" />
        <PolarRadiusAxis/>
        <Radar name="Mike" dataKey="duration" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6}/>
      </RadarChart>
  );
}

export default ActivityRadarChart;

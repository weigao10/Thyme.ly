import React from 'react';
import { PieChart, Pie } from 'recharts';

const prettifier = (text) => {
  //truncates really long App names and adds an ellipsis if too long
  if (text.length >= 25) {
    return text.slice(0, 22) + '...';
  } else {
    return text;
  }
}

const mapAndSortActivitiesByDuration = (activities, category) => {
  const mappedActivities = activities[category].map((activity) => {
    return {
      app: activity.app,
      duration: activity.duration,
      source: activity.productivity.source, //in case we want to distinguish based on user or ML-categorized activities
      title: activity.title
    }
  });
  return mappedActivities.sort((a, b) => {
    return b.duration - a.duration
  });
}

const ChartTopRankings = (props) => {
  const { activities } = props;
  const topFiveProductive = mapAndSortActivitiesByDuration(activities, 'productive').slice(0, 5);
  const topFiveDistracting = mapAndSortActivitiesByDuration(activities, 'distracting').slice(0, 5);

  return (
    <div>
      <h3>Top 5 Productive Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={topFiveProductive} 
                dataKey="duration" 
                nameKey="title" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity) => prettifier(activity.title)}
              >
                
              </Pie>
          
            </PieChart>

            <h3>Top 5 Distracting Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={topFiveDistracting} 
                dataKey="duration" 
                nameKey="title" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity) => prettifier(activity.title)}
              >
                
              </Pie>
          
            </PieChart>
    </div>
  );
}

export default ChartTopRankings;
import React from 'react';
import {PieChart, Pie} from 'recharts';

var prettifier = (text) => {
  //truncates really long App names and adds an ellipsis if too long

  if (text.length >= 25) {
    return text.slice(0, 22) + '...';
  } else {
    return text;
  }
}

const ChartTopRankings = (props) => {

  let productive = props.activities.productive.sort();
  let productiveData = [];

  for (let i = 0; i < productive.length; i++) {
    productiveData.push({
      name: productive[i].title,
      duration: productive[i].duration
    });

    if (i === 4) break; //only do the first five entries for the pie chart
  }

  let distracting = props.activities.distracting.sort();
  let distractingData = [];

  for (let i = 0; i < distracting.length; i++) {
    distractingData.push({
      name: distracting[i].title,
      duration: distracting[i].duration
    });

    if (i === 4) break; //only do the first five entries for the pie chart
  }

  return (
    <div>
      <h3>Top 5 Productive Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={productiveData} 
                dataKey="duration" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity) => prettifier(activity.name)}
              >
                
              </Pie>
          
            </PieChart>

            <h3>Top 5 Distracting Apps</h3>
            <PieChart width={550} height={300}>
              <Pie 
                data={distractingData} 
                dataKey="duration" 
                nameKey="name" 
                cx="50%" 
                cy="50%" 
                outerRadius={50} 
                fill="#8884d8"
                label={(activity) => prettifier(activity.name)}
              >
                
              </Pie>
          
            </PieChart>
    </div>
  );
}

export default ChartTopRankings;
import React from 'react';
import { Treemap, Tooltip } from 'recharts';
import moment from 'moment';

const timestampToUnix = (timeStamp) => {
  return moment(timeStamp, 'MMMM Do YYYY, h:mm:ss a').valueOf();
};

const momentDiff = (startTimestamp, endTimestamp) => {
  const startMoment = moment(startTimestamp, 'MMMM Do YYYY, h:mm:ss a');
  const endMoment = moment(endTimestamp, 'MMMM Do YYYY, h:mm:ss a');
  return endMoment.diff(startMoment, 'seconds');
}

const getSpurts = (activities, category) => {
  const extractedSpurts = activities[category].map((activity) => {
    return activity.spurts.map(spurt => {
      return {
        app: activity.app,
        title: activity.title,
        startTime: timestampToUnix(spurt.startTime),
        endTime: timestampToUnix(spurt.endTime),
        duration: momentDiff(spurt.startTime, spurt.endTime),
        productivity_class: activity.productivity.class,
        productivity_source: activity.productivity.source, // in case necessary
      }
    })
  });
  return extractedSpurts.length ? extractedSpurts.reduce((a, b) => a.concat(b)) : [];
}

const getAllSpurts = (activities) => {
  const flattenedSpurts = [...getSpurts(activities, 'productive'), ...getSpurts(activities, 'neutral'), ...getSpurts(activities, 'distracting')]
  return flattenedSpurts.sort((a, b) => a.startTime - b.startTime)
}

const mapActivitiesArr = (activitiesArr) => {
  if (!activitiesArr.length) return [];
  return activitiesArr.map((activity) => ({
    name: `${activity.app} - ${activity.title}`,
    size: activity.duration
  }));
}

const treeMapActivities = (activities) => {
  return [
    {
      name: 'distracting',
      children: mapActivitiesArr(activities.distracting)
    },
    {
      name: 'neutral',
      children: mapActivitiesArr(activities.neutral)
    },
    {
      name: 'productive',
      children: mapActivitiesArr(activities.productive)
    }
  ];
}

const COLORS = ['#CF3721', '#F5BE41', '#258039'];

class CustomizedContent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor(index / root.children.length * 3)] : 'none',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
          }}
        />
        {
          depth === 1 ?
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
          >
            {name}
          </text>
          : null
        }
        {
          depth === 1 ?
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
          : null
        }
      </g>
    );
  }
};

class ActivityTreeMap extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    const data = treeMapActivities(this.props.activities)

    return (
      <Treemap
      width={400}
      height={200}
      data={data}
      dataKey="size"
      ratio={4/3}
      stroke="#fff"
      fill="#8884d8"
      content={<CustomizedContent colors={COLORS}/>}
      isAnimationActive={true}
    >
     <Tooltip></Tooltip>
    </Treemap>
    );
  }
} 

export default ActivityTreeMap;

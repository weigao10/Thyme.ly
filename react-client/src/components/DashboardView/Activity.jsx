import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ProductivityScore from '../../containers/ProductivityScore.jsx';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const renderActivities = (category, activities) => {

  return (
    <div>
      <Paper 
        style={
          {font: 'Open Sans', 
          background: '#00BCD4', 
          padding: '10px 5px 10px 5px',
          textAlign: 'center',
          color: 'white',
          fontWeight: 'bolder',
          fontSize: '115%'}}
      >
        {category[0].toUpperCase() + category.slice(1, category.length)}
      </Paper>
      {activities[category].map((activity, index) => {

        let duration = moment
          .duration(
            moment(activity.endTime, "MMMM Do YYYY, h:mm:ss a")
            .diff(moment(activity.startTime, "MMMM Do YYYY, h:mm:ss a"))
          )
          .asSeconds();

        let styleTick = {
          font: 'Arial', 
          //background: '#E8F5E9', 
          background: '#DDD',
          padding: '10px 5px 10px 5px',
          margin: '10px 0px 10px 0px',
          textAlign: 'left',
          color: 'black',
          fontSize: '80%',
        }

        let styleTock = {
          font: 'Arial', 
          // background: '#C8E6C9', 
          background: '#BBB',
          padding: '10px 5px 10px 5px',
          margin: '10px 0px 10px 0px',
          textAlign: 'left',
          color: 'black',
          fontSize: '80%',
        }

        return (
          <Paper
            key={activity.title + index}
            style={index % 2 === 0 ? styleTick : styleTock}
          >
            <b>{activity.app}</b> <br/>
            {activity.title} <br/>
            <i>{duration}</i> seconds <br/>
            <br/>
            <button>productive</button> <button>neutral</button> <button>distracting</button>

          </Paper>
        )
      })}
    </div>
  );
}

const Activity = ({activities}) => {

  const style = {
    margin: '8px',
    padding: '10px',
    width: 'calc(25% - 16px)',
    float: 'left',
    verticalAlign: 'top',
    minHeight: '525px',
    maxHeight: '525px',
    overflowY: 'scroll',
  }

  return (
    <div>
      <Paper style={style}>
        {renderActivities('productive', activities)}
      </Paper>
      <Paper style={style}>
        {renderActivities('neutral', activities)}
      </Paper>
      <Paper style={style}>
        {renderActivities('distracting', activities)}
      </Paper>
      <Paper style={style}>
        <ProductivityScore />
      </Paper>
    </div>
  )
}


const mapStateToProps = state => ({
  activities: state.activities
})

export default connect(mapStateToProps)(Activity) 

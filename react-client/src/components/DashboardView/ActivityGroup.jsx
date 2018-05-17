import React from "react";
import clone from "clone";
import moment from "moment";
import momentFormat from "moment-duration-format";
import { DropTarget } from "react-dnd";

import { ItemTypes } from "../../constants.js";
import ActivityCard from "./ActivityCard.jsx";

import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";

const comparisonTarget = {
  drop(props, monitor) {
    const { activity, oldCategory } = monitor.getItem();
    const newCategory = props.category;
    const user = props.user
    props.changeCategory(activity, oldCategory, newCategory, user);
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

const ActivityGroup = props => {
  const {
    connectDropTarget,
    isOver,
    category,
    activities,
    changeCategory,
    deleteActivity,
    style,
    preferences,
    user
  } = props;
  const sortedActivities = [...activities].sort(
    (a, b) => b.duration - a.duration
  );
  return connectDropTarget(
    <div
      style={{
        width: "33%",
        height: "100%",
        display: "inline-block",
        verticalAlign: "top"
      }}
    >
      <Paper style={{margin: '5px'}}>
        <Paper style={styleMap[category]}>
          {category[0].toUpperCase() + category.slice(1, category.length)}{" "}
          &nbsp;
          <span
            style={{
              fontSize: "75%",
              fontStyle: "italic"
            }}
          >
            {getTotalDuration(activities)}
          </span>
        </Paper>
        {sortedActivities.map((activity, index) => {
          return (
            <ActivityCard
              key={activity + index + Math.random() * 10}
              activity={activity}
              index={index}
              category={category}
              changeCategory={changeCategory}
              deleteActivity={deleteActivity}
              preferences={preferences}
              user={user}
            />
          );
        })}
      </Paper>
    </div>
  );
};

const getTotalDuration = activities => {
  let duration = 0;
  activities.forEach(activity => {
    duration += activity.duration;
  });
  let formatDuration = moment
    .duration(duration, "seconds")
    .format("h[h], m[m] s[s]");
  return formatDuration;
};

let styleCategoryP = {
  font: "Open Sans",
  background: "#43A047",
  padding: "10px 5px 10px 5px",
  textAlign: "center",
  color: "white",
  fontWeight: "bolder",
  fontSize: "115%",
  onMouseOver: "#FFF",
  borderRadius: "15px 15px 0px 0px"
};

let styleCategoryN = {
  font: "Open Sans",
  background: "#00BCD4",
  padding: "10px 5px 10px 5px",
  textAlign: "center",
  color: "white",
  fontWeight: "bolder",
  fontSize: "115%",
  onMouseOver: "#FFF",
  borderRadius: "15px 15px 0px 0px"
};

let styleCategoryD = {
  font: "Open Sans",
  background: "#FF5722",
  padding: "10px 5px 10px 5px",
  textAlign: "center",
  color: "white",
  fontWeight: "bolder",
  fontSize: "115%",
  onMouseOver: "#FFF",
  borderRadius: "15px 15px 0px 0px"
};

const style = {
  margin: "8px",
  padding: "10px",
  width: "calc(25% - 16px)",
  float: "left",
  verticalAlign: "top",
  minHeight: "475px",
  maxHeight: "475px",
  overflowY: "scroll",
  background: "#E0F2F1"
};

const styleScore = {
  margin: "8px",
  padding: "10px",
  width: "calc(25% - 16px)",
  float: "left",
  verticalAlign: "top",
  minHeight: "475px",
  maxHeight: "475px",
  background: "#E0F2F1"
};

const styleMap = {
  productive: styleCategoryP,
  neutral: styleCategoryN,
  distracting: styleCategoryD
};

 export default DropTarget(ItemTypes.CARD, comparisonTarget, collect)(ActivityGroup);

describe('monitor' , function(){
  it(`start automatically once a user logs in`, function(){
  });
  it(`should pause and resume based on user button click`, function(){
  });
  it(`should pause on a pomodoro break`, function(){
  });
  it(`should resume on a pomodoro work session`, function(){
  });
  it(`should make its status available to the rest of the app`, function(){
  });
  it(`should never be able to be started again if its current status is running`, function(){
  });
});

describe('sessions' , function(){
  it(`should set a cookie that lasts a week once a user logs in`, function(){
  });
  it(`should destroy the cookie once the user logs out`, function(){
  });
  it(`should skip the login screen entirely if the user cookie is set`, function(){
  });
  it(`should send the current user id to the Redux store`, function(){
  });
});

describe('pomodoro timer' , function(){
  it(`should animate as time passes`, function(){
  });
  it(`should animate short spurt and long spurt progress`, function(){
  });
  it(`should display the amount of time left in the current session`, function(){
  });
  it(`should allow the user to pause and restart the timer`, function(){
  });
  it(`should keep track of the time even when it's not the active tab`, function(){
  });
  it(`should alert the user when a new session is starting`, function(){
  });
  it(`should not allow a user to click a button that would break functionality (i.e. starting two timers)`, function(){
  });
});
describe('cloud database functionality' , function(){
  it(`checks to see if an app has been previously categorized by that user`, function(){
  });
  it(`is unaffected by other users' categorizations of that app`, function(){
  });
  it(`checks to see if a browser's specific window title has been previously categorized by that user`, function(){
  });
  it(`is unaffected by other users' categorizations of that window title`, function(){
  });
  it(`does not save neutral apps into the database` , function(){
  });
  it(`deletes a user's categorization of an app or window title if a user recategorizes it as neutral`, function(){
    //in progress
  });
});

describe('machine learning functionality' , function(){
  it(`doesn't make predictions for "untracked" apps`, function(){
  });
  it(`only predicts a category for a window title if the user hasn't categorized it already`, function(){
  });
  it(`makes predictions based on all users' classifications of that window title`, function(){
  });
  it(`stamps the activity with a classification if it is sufficiently confident of its category`, function(){
  });
  it(`lets react/redux know that this is only a suggested classification, not a user classification` , function(){
  });
  it(`renders an activity card with a suggested classification differently than a user-classified activity`, function(){
  });
});
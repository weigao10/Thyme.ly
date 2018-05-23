const bayes = require('classificator');
let classifier = bayes();
const { getBrowserActivities } = require('../database/index.js');

const initClassifier = async () => {
  const activities = await getBrowserActivities();
  try {
    bulkLearn(activities);
    console.log('classifier initialized!');
  } catch(e) {
    console.error('error in trying to run naive-bayes', e)
  }
};

const bulkLearn = (activities) => {
  activities.filter(({ app_name, prod_class }) => app_name === 'Google Chrome' && prod_class !== 'neutral')
            .forEach(({window_title, prod_class}) => {
              classifier.learn(window_title, prod_class);
            });
};

const REQUIRED_CONFIDENCE = 0.9;
const predictProductivityClass = (title, user_name) => {
  const prediction = classifier.categorize(title).likelihoods
                                .filter(cat => cat.proba > REQUIRED_CONFIDENCE)
  if (prediction.length) return prediction[0].category;
  else return null;
};

//real time learning
const learnProductivityClass = (title, productivityClass) => {
  classifier.learn(title, productivityClass);
  console.log(`ml is learning that ${title} is ${productivityClass}`);
};

const unlearnProductivityClass = (title, oldProdClass) => {
  classifier.unlearn(title, oldProdClass);
  console.log(`ml is UNlearning that ${title} was classified ${oldProdClass}`);
}

//periodic loading and saving
const saveClassifier = () => {
  const classifierJSON = classifier.toJson(); 
  //save this JSON to database
};

const loadClassifier = (classifierJSON) => {
  classifier = bayes.fromJson(classifierJSON)
};

//cron job to sync from activities db (main source of truth)
const syncClassifierToDb = () => {
  //TODO
};

exports.initClassifier = initClassifier;
exports.predictProductivityClass = predictProductivityClass;
exports.learnProductivityClass = learnProductivityClass;
exports.unlearnProductivityClass = unlearnProductivityClass;
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('projects').insert([
    {
      "id": 1,
      "project_name": "Static Code Checker",
      "project_deadline": "2019-05-08 12:00:00",
      "feedback_deadline": "2019-05-10 12:00:00",
      "recommendation_deadline": "2019-06-01 12:00:00"
    },
    {
      "id": 2,
      "project_name": "dynamic Hand Gesture Recognition using neural network",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    },
    {
      "id": 3,
      "project_name": "College Connect",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    }, {
      "id": 4,
      "project_name": "Sun Rise/set Time Finder",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    },
    {
      "id": 5,
      "project_name": "Automatic youtube Playlist Downloader",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    },
    {
      "id": 6,
      "project_name": "AI Therapist",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    }, {
      "id": 7,
      "project_name": "Breakout Game in Javascript",
      "project_deadline": "2019-04-18 12:00:00",
      "feedback_deadline": "2019-04-20 12:00:00",
      "recommendation_deadline": "2019-05-01 12:00:00"
    }
  ]);
};


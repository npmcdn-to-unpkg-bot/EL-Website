module.exports = {

  restore: {
    options: { 
      question: 'Easy, action, easy! You will be overriding the current database with the data in /dump/engagement-lab. Proceed?',
      input: '_key:y'
    }
  },
  production: {
    options: { 
      question: "You are about to tag a new production release and deploy the master branch HEAD to the production server.\nThis will also run the 'compile' task and reboot keystone.\n\n\nAre you sure?",
      input: '_key:y'
    }
  },
  staging: {
    options: { 
      question: "You are about to deploy the master branch HEAD to the staging server.\n\nAre you sure?",
      input: '_key:y'
    }
  }

};

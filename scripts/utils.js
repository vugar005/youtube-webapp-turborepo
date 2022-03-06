const rimraf = require('rimraf');

const { execSync } = require('child_process');

const rimrafPromise = (...args) => {
  return new Promise((resolve, reject) => {
    rimraf(...args, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

const execPromise = (...args) => {
  return new Promise((resolve, reject) => {
    execSync(...args, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports = {
  rimrafPromise,
  execPromise
};

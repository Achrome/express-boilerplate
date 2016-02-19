import bcrypt from 'bcrypt';

const genSalt = (rounds, length) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(rounds, length, (err, salt) => {
      if (err) {
        return reject(err);
      }
      return resolve(salt);
    });
  });
};

const hash = (str, salt) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(str, salt, (err, hashed) => {
      if (err) {
        return reject(err);
      }
      return resolve(hashed);
    });
  });
};

const compare = (str, hashed) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(str, hashed, (err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });
  });
};

export default {
  genSalt,
  hash,
  compare
};

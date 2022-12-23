/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (id SERIAL PRIMARY KEY, 
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIME,
        Updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIME,
        bio VARCHAR(240)
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
    `);
};

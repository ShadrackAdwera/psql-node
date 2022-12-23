/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (id SERIAL PRIMARY KEY, 
        username VARCHAR(20) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        Updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        bio VARCHAR(240),
        UNIQUE(username)
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE users;
    `);
};

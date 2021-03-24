// Update with your config settings.

module.exports = {
    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
            filename: './data/lessons.db3'
        },
        pool: {
            afterCreate: (conn, done) => {
                conn.run('PRAGMA foreing_keys = ON', done);
            }
        }
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        dialect: 'postgres',
        dialectOptions: {
          ssl: true,
        },
        migrations: {
            tablename: 'knex_migrations',
            directory: './migrations',
        }
    },
};

const pg = require('pg');
const { Client } = pg;
const uuid = require('uuid');

const client = new Client('postgres://localhost/the_db');

client.connect();

const frontId = uuid.v4();
const maintId = uuid.v4();
const houseId = uuid.v4();

const artId = uuid.v4();
const natId = uuid.v4();
const robId = uuid.v4();
const meowId = uuid.v4();


const SQL = `
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS departments;
    CREATE TABLE departments(
        id UUID PRIMARY KEY, 
        name VARCHAR(255) UNIQUE NOT NULL
    );
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL, 
        bio TEXT,
        departments_id UUID REFERENCES departments(id)
    );
    INSERT INTO departments(id, name) VALUES('${frontId}', 'Front Office');
    INSERT INTO departments(id, name) VALUES('${maintId}', 'Maintenance');
    INSERT INTO departments(id, name) VALUES('${houseId}', 'Housekeeping');

    INSERT INTO users(id, name, bio, departments_id) VALUES('${artId}', 'Arthur Sandro','Arthur likes sandwiches and pineapples', '${frontId}');
    INSERT INTO users(id, name, bio, departments_id) VALUES('${natId}', 'Nathan Roy', 'Nathan really likes pickles and egyptians', '${maintId}');
    INSERT INTO users(id, name, bio, departments_id) VALUES('${robId}', 'Robert Freeman', 'Robert is controlled by Meow Mow Zedong',  '${houseId}');
    INSERT INTO users(id, name, bio) VALUES('${meowId}', 'Meow Mow', 'Chairman Meow Mow Zedong is an evil dictator');
`;

const syncAndSeed = async()=> {
    await client.query(SQL);
};

const findAllDepartments = async () => {
    const response = await client.query('SELECT * FROM departments;');
    return response.rows;
};

const findAllUsers = async () => {
    const response = await client.query('SELECT * FROM users;');
    return response.rows;
};

module.exports = {
    syncAndSeed,
    findAllDepartments,
    findAllUsers
}


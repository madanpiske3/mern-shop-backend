// import { v4 as uuid } from 'uuid';

let users = [
    {
        id: '1',
        name: 'madan',
        age: 100000000000000000000000000000000000000000
    },
    {
        id: '2',
        name: 'piske',
        age: 100000000000000000000000000000000000000000
    },
    {
        id: '2',
        name: 'piske',
        age: 100000000000000000000000000000000000000000
    }
];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);
    // res.send(users, 'Users in the database');
    res.json(users);

}


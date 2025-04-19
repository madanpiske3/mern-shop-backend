import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    res.send('User registered successfully!');
}
export const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    const isPasswordValid = await bcrypt.compare(req.body.password, user.passwordHash);
    if (!user) {
        // need to unhash the hashed password
        return res.status(400).send('Invalid email or password');
        console.log(isPasswordValid);
    }
    try{
        console.log(isPasswordValid);
        console.log(process.env.secret);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Authentication failed: Invalid password' });
        }
        if (user && isPasswordValid) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    // name: user.name,
                },
                process.env.secret,
                { expiresIn: '1y'}
            )

            return res.status(200).send({user: user.email, token: token}); // Send the created category as a response
        }
        else{
            return res.status(400).send('Invalid email or password');
        }
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }


}

export const getUsers = async (req, res) => {
    try {
        const user = await User.find().select('name phone email'); // Exclude passwordHash from the response
        res.status(200).json(user); // Send all categories as a response
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash'); // Exclude passwordHash from the response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json(user); // Send all categories as a response
    }catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const postUsers = async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10), // Hash the password before saving
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
            // id: uuid(),
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser); // Send the created category as a response
    } catch (error) {
        res.status(500).json(error); // Send the created category as a response

    }
}

// export const getCount = async (_, res) => {
//     try {
//         const userCount = await User.countDocuments();

//         if (userCount === 0) {
//             return res.status(404).send('No users found');
//         }

//         res.send({ userCount: userCount });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// }

export const deleteUsers = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCountUsers = async (req, res) => {
    try{
    const userCount = await User.countDocuments();
    if (!userCount) {
        return res.status(400).send('User not found');
    }
    console.log(typeof(userCount));
    res.send({ userCount: userCount });
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
    // res.send('Get Count Products!');
}

// import { v4 as uuid } from 'uuid';

// let users = [
//     {
//         id: '1',
//         name: 'madan',
//         age: 100000000000000000000000000000000000000000
//     },
//     {
//         id: '2',
//         name: 'piske',
//         age: 100000000000000000000000000000000000000000
//     },
//     {
//         id: '2',
//         name: 'piske',
//         age: 100000000000000000000000000000000000000000
//     }
// ];
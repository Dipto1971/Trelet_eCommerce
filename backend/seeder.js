import dotenv from 'dotenv';
import products from './data/products.js';
import users from './data/users.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import User from './models/userModel.js';
// explanation: Here we are importing the data from the data folder and the models from the models folder.

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // explanation: Here we are deleting all the data from the database.

        const createdUsers = await User.insertMany(users);
        // explanation: Here we are inserting the data from the users.js file to the database.
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
            // explanation: Here we are mapping through the products and adding the adminUser to each product. "..." is the spread operator which is used to copy the product object.
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!'.green);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red);
        process.exit(1);
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        // explanation: Here we are deleting all the data from the database.

        console.log('Data Destroyed!'.red);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    destroyData();
} else if ( process.argv[2] === '-i' ){
    importData();
}

// In package.json file we have added the following scripts:
// "data:import": "node backend/seeder -i",
// "data:destroy": "node backend/seeder -d"

// seeder.js is used to import the data to the database. We are using the try catch block to catch any errors that may occur. We are also using the process.exit() method to exit the process after the data is imported. Both the importData and destroyData functions are asynchronous functions. We are using the await keyword to wait for the data to be imported or destroyed before exiting the process.


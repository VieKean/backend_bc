import bcrypt from 'bcryptjs';
import db from '../models/index';

const saltRounds = 10;

const getAllAccounts = async () => {
    try {
        const accounts = await db.Account.findAll();
        return accounts;
    } catch (error) {
        console.error('Error fetching accounts:', error);
        throw error;
    }
};

const hashPassword = (userPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(userPassword, salt);
};

const createNewAccount = async (username, password, fullname, address, phonenumber, email, role) => {
    try {
        const hashedPassword = hashPassword(password);
        const newAccount = await db.Account.create({
            username,
            password: hashedPassword,
            full_name: fullname,
            address,
            phone_number: phonenumber,
            email,
            role,
            creation_date: new Date()
        });
        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};

// const createNewCustomer = async (username, password, fullname, address, phonenumber, email, role) => {
//     try {
//         const hashedPassword = hashPassword(password);
//         const newAccount = await db.Customer.create({
//             username,
//             password: hashedPassword,
//             full_name: fullname,
//             address,
//             phone_number: phonenumber,
//             email,
//             role,
//             creation_date: new Date()
//         });
//         return newAccount;
//     } catch (error) {
//         console.error('Error creating account:', error);
//         throw error;
//     }
// };

// check check check input
const checkUsername = async (username) => {
    let check = await db.Customer.findOne(
        {
            where: { username: username }
        }
    )
    if (check) {
        return true
    }

    return false
}

const checkEmail = async (email) => {
    let check = await db.Customer.findOne(
        {
            where: { email: email }
        }
    )
    if (check) {
        return true
    }

    return false
}

const checkPhoneNumber = async (phonenumber) => {
    let check = await db.Customer.findOne(
        {
            where: { phone_number: phonenumber }
        }
    )
    if (check) {
        return true
    }

    return false
}

const createNewCustomer = async (username, password, fullname, address, phonenumber, email, role) => {
    try {

        let check1 = await checkUsername(username)
        let check2 = await checkEmail(email)
        let check3 = await checkPhoneNumber(phonenumber)

        if (check1 === true) {
            console.log('tồn tại r')
            return {
                err: '1',
                message: 'Tài khoản đã tồn tại',
                data: ''
            }
        }
        if (check2 === true) {
            console.log('tồn tại r')
            return {
                err: '1',
                message: 'Email đã tồn tại',
                data: ''
            }
        }

        if (check3 === true) {
            console.log('tồn tại r')
            return {
                err: '1',
                message: 'Số điện thoại đã tồn tại',
                data: ''
            }
        }

        const hashedPassword = hashPassword(password);
        const newAccount = await db.Customer.create({
            username,
            password: hashedPassword,
            full_name: fullname,
            address,
            phone_number: phonenumber,
            email,
            role,
            creation_date: new Date()
        });
        return newAccount;
    } catch (error) {
        console.error('Error creating account:', error);
        throw error;
    }
};





const deleteAccount = async (id) => {
    try {
        await db.Account.destroy({ where: { id } });
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};

const getAccountById = async (id) => {
    try {
        const account = await db.Account.findOne({ where: { id } });
        return account;
    } catch (error) {
        console.error('Error fetching account:', error);
        throw error;
    }
};

const updateAccount = async (id, username, fullname, address, phonenumber, email, role) => {
    try {
        await db.Account.update(
            { username, full_name: fullname, address, phone_number: phonenumber, email, role },
            { where: { id } }
        );
    } catch (error) {
        console.error('Error updating account:', error);
        throw error;
    }
};

const checkLogin = async (username, password) => {
    try {
        const account = await db.Account.findOne({ where: { username } });
        if (account) {
            const isPasswordValid = bcrypt.compareSync(password, account.password);
            return isPasswordValid ? account : null;
        }
        return null;
    } catch (error) {
        console.error('Error checking login:', error);
        throw error;
    }
};
const checkLoginCustomer = async (username, password) => {
    try {
        const account = await db.Customer.findOne({ where: { username } });
        if (account) {
            const isPasswordValid = bcrypt.compareSync(password, account.password);
            return isPasswordValid ? account : null;
        }
        return null;
    } catch (error) {
        console.error('Error checking login:', error);
        throw error;
    }
};


export default { getAllAccounts, createNewAccount, deleteAccount, getAccountById, updateAccount, checkLogin, createNewCustomer, checkLoginCustomer };
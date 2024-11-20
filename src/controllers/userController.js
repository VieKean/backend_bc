//homeController.js
import userService from "../services/userService";

// const getHomepage = (req, res) => {
//     res.render('home.ejs', { 
//         data: { 
//             page: null, 
//             username: req.session.user.username
//         }
//     });
// }

const handleAccountPage = async (req, res) => {
    let accountList = await userService.getAllAccounts();
    res.render('home.ejs', {
        data: {
            title: 'List account',
            page: 'account',
            rows: accountList,
            username: req.session.user.username
        }
    });
}
const handleCreateAccount = async (req, res) => {
    let {username, password, fullname, address, phonenumber, email, role} = req.body;
    await userService.createNewAccount(username, password, fullname, address, phonenumber, email, role);
    res.redirect('/account');
}

const handleDeleteAccount = async (req, res) => {
    let id = req.params.id;
    await userService.deleteAccount(id);
    res.redirect('/account');
}

const getUpdateAccountPage = async (req, res) => {
    let id = req.params.id;
    let account = await userService.getAccountById(id);
    
    // Kiểm tra xem tài khoản có tồn tại hay không
    if (!account) {
        return res.status(404).send("Account not found");
    }

    // Truyền đúng tham số vào view
    return res.render('home.ejs', {
        data: {
            title: 'Update account',
            page: 'updateAccountPage', 
            accountData: account,
            username: req.session.user.username
        }
    });
};

const handleUpdateAccountPage = async (req, res) => {
    let id = req.params.id;
    let {username, fullname, address, phonenumber, email, role} = req.body;
    await userService.updateAccount(id, username, fullname, address, phonenumber, email, role);
    res.redirect('/account');
}

const handleLoginPage = async (req, res) => {
    if (req.session.user) {
        return res.redirect('/');
    }

    return res.render('login');
}

const handlePostLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userService.checkLogin(username, password);
    if (user) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        return res.render('login', { message: 'Tài khoản hoặc mật khẩu không đúng!' });
    }
}

const handleLogout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
}



export default {  handleAccountPage, handleCreateAccount, handleDeleteAccount, getUpdateAccountPage, handleUpdateAccountPage, handleLoginPage, handlePostLogin, handleLogout };

const db = require('../db');

let auth = (req, res, next) => {
    let cookie = req.cookies.x_token;
    let id;
    if(cookie !== undefined) id = cookie.split('id=')[1];
    let param = [
        id,
        cookie
    ];
    var sql = `
        SELECT * 
        FROM users
        WHERE id=? AND login_token=?
    `;
    db.query(sql, param, (err, rows) => {
        if (err) throw err;
        if (rows.length === 0) return res.json({
            isAuth: false,
            error: true
        });
        else {
            rows[0]. isAuth = true;
        }
        req.user = rows[0]
        delete req.user.password;      
        next();
    })
}

module.exports = {
    auth
}
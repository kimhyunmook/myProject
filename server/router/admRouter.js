const express = require('express');
const router = express.Router();
const {
    db,
    db2
} = require('../db');
const fs = require('fs');
const createMenu = require('../middleware/createMenu');
const {
    readSQL,
    errorMessage,
    correctMessage,
    menuFactoring
} = require('../util');
const setting = require('../setting.json');

router.post('/createboard', createMenu, async (req, res) => {
    const routerName = req.originalUrl;
    let query, rows, sql, meesage;
    try {
        message = 'CREATE BOARD TABLE';
        const conn = await db2.getConnection();
        await conn.query(readSQL('board/create.sql', {
            createName: req.createName
        }));
        sql = `SELECT * FROM adm_menu`
        rows = await conn.query(sql)
        let menu = menuFactoring(rows[0]);
        res.status(200).json({
            menu
        });
        correctMessage(routerName, message)
        conn.release();
    } catch (error) {
        errorMessage(routerName, error)
    }
});

router.post('/settingmenu', async (req, res) => {
    const routerName = req.originalUrl;
    let param = [];
    let query, rows, sql, meesage;

    db.query(readSQL('menu/select.sql'), param, (err, rows) => {
        if (err) throw err;
        let list = []
        rows.map(el => {
            list.push(el);
        })
        console.log(list)
        res.status(200).json(list)
    })
})

module.exports = router
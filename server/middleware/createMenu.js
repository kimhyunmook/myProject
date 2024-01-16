const {
    db2
} = require('../db');
const {
    readSQL,
    errorMessage
} = require('../util')

async function createMenu(req, res, next) {
    // `name`,`href`,`menu_type`,`description`,`depth`,`admin`,`parent`,`custom`,`custom_comment`
    let name = req.body.name;
    let href = req.body.href;
    let menu_type = req.body.menu_type;
    let description = req.body.description;
    let depth = req.body.depth;
    let admin = 0;
    let parent = req.body.parent;
    let custom = req.body.custom;
    let custom_comment = req.body.custom_comment;
    let param = [
        name,
        href,
        menu_type,
        description,
        depth,
        admin,
        parent,
        custom,
        custom_comment
    ]
    let overlap = false;
    let sql, query, result;
    try {
        const conn = await db2.getConnection();
        sql = `SELECT * FROM adm_menu`
        query = await conn.query(sql);
        result = query[0];
        result.map(el => {
            if (req.body.href === el.href) {
                overlap = true;
                res.send('table overlap')
                return;
            }
        })
        if (overlap === false) {
            await conn.query(readSQL('menu/insert.sql'), param)
            req.createName = await req.body.table_name;
            await next();
        }
    } catch (error) {
        errorMessage(error)
    }
}

module.exports = createMenu
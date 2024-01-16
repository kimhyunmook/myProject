const express = require('express');
const router = express.Router();
const {
    db,
    db2
} = require('../db');
const fs = require('fs');
const upload = require('../middleware/upload');
const {
    errorMessage,
    correctMessage,
    commaString,
    sqlText
} = require('../util');
const boardDummy = require('../dummy/board_dummy.json');

/** uploads 폴더 생성 */
try {
    fs.readdirSync('client/public/uploads');
} catch (err) {
    console.error('uploads 폴더가 없습니다. 폴더를 생성합니다.')
    fs.mkdirSync('client/public/uploads');
}

router.get('/list/:name/:page', async (req, res) => {
    const routerName = req.originalUrl;
    const page = req.params.page
    let query, rows, listLength, last;
    let start = 0;
    let pageArray = [];
    let list = []
    let i;
    let sql = `
        SELECT * 
        FROM board_${req.params.name}
        WHERE w_comment=0 AND notice = 'false' ORDER BY w_num DESC
    `;
    const conn = await db2.getConnection();



    try {
        

        listLength = 10; // 1page length
        query = await conn.query(sql);
        rows = query[0]
        const pageNavi = Math.ceil(rows.length / listLength);
        for (i = 0; i < pageNavi; i++) {
            pageArray.push(i + 1);
        }
        last = listLength * page;
        if (page >= 2) start = listLength * (page - 1);

        for (i = start; i < last; i++) {
            if (rows[i] !== undefined)
                if (rows[i].w_comment === 0)
                    list.push(rows[i]);
        }

        res.status(200).json({
            list,
            notice: [],
            pageNavigation: pageArray
        })
        await conn.release();
        correctMessage(routerName);
    } catch (error) {
        errorMessage(routerName, error);
        conn.release();
    }
})

// router.post('/:name/galleryWrite', upload('client/public/uploads/','file'), (req, res) => {
//     let sql = '';
//     let param = [];
//     sql = `
//             INSERT INTO ${req.params.name} (subject, content, time, img, id, board_type) 
//             VALUE (?,?,?,?,?,?)
//         `;

//     let file
//     if (req.file !== undefined) {
//         file = req.file.path.split('\\');
//         file = file[file.length - 1];
//     }
//     param = [
//         req.body.subject,
//         req.body.content,
//         req.body.time,
//         file,
//         req.body.id,
//         req.body.board_type
//     ];
//     db.query(sql, param, (err, rows) => {
//         if (err) throw err;
//         res.status(200).json({
//             create: true,
//             board_type: 'gallery'
//         })
//     })
// })

router.post('/:name/write', async (req, res) => {
    const routerName = req.originalUrl;
    const board = `board_${req.params.name}`;
    const board_type = req.body.board_type;
    let i;
    let query, rows, sql;

    delete req.body.url;
    const conn = await db2.getConnection();

    try {
        let num, reply;
        let message = 'INSERT';
        if (board_type === 'reply') req.body.w_comment = req.body.w_comment + 1;
        let keys = Object.keys(req.body);
        let values = Object.values(req.body);
        let notice = req.body.notice;

        if (board_type === 'reply') {
            message = 'REPLY INSERT';
            keys.push('w_parent');
            values.push(req.body.w_num);

            sql = `SELECT * FROM ${board} WHERE w_num=${req.body.w_num}`;
            let replyCount = await conn.query(sql);
            replyCount = replyCount[0][0];
            replyCount = replyCount.reply_count;
            replyCount++;

            sql = `UPDATE ${board}
                SET reply_count=${replyCount}
                WHERE w_num=${req.body.w_num} AND w_comment=0
            `
            await conn.query(sql);
        } else {
            sql = `
                SELECT * FROM ${board}
                WHERE w_comment=0
                ORDER BY w_num DESC LIMIT 1
            `;
            query = await conn.query(sql)
            rows = query[0][0];

            if (rows === undefined) num = 0;
            else num = rows.w_num;
            keys.push('w_num', 'w_parent');
            for (i = 0; i < 2; i++) {
                values.push(num + 1);
            }
        }

        values = commaString(values);
        keys = commaString(keys, true);

        sql = `
            INSERT INTO ${board}
            (${keys}) 
            VALUE (${values});
        `
        query = await conn.query(sql);
        if (board_type === 'reply') {
            sql = `
                SELECT * FROM ${board}
                WHERE w_num = ${req.body.w_num} AND w_comment != 0;
            `;

            query = await conn.query(sql);
            reply = query[0]
            await res.status(200).json({
                reply
            })
        } else
            await res.status(200).send(message);
        await conn.release();
        await correctMessage(routerName, message);
    } catch (error) {
        errorMessage(routerName, error);
    }
});

// router.post('/:name/replyWrite/:w_num', async (req, res) => {
//     const routerName = req.originalUrl;
//     let message;
//     delete req.body.name;

//     try {
//         const conn = await db2.getConnection();
//         req.body.w_comment = req.body.w_comment + 1;
//         req.body.subject = `reply_${req.params.w_num}`;
//         let keys = Object.keys(req.body);
//         let values = Object.values(req.body);
//         values = commaString(values);
//         keys = commaString(keys, true);

//         let sql = `
//             INSERT INTO board_${req.params.name}
//             (${keys}) 
//             VALUES
//             (${values});
//         `
//         message = 'SUCCESS';
//         await conn.query(sql);
//         await res.status(200).json({
//             reply: message
//         })
//         correctMessage(routerName, message);
//         conn.release();
//     } catch (error) {
//         errorMessage(routerName, error);
//     }

// });

router.post('/:name/contents/:w_num', async (req, res) => {
    const routerName = req.originalUrl;
    const w_num = req.params.w_num;
    const board = `board_${req.params.name}`
    let query, message, sql, result;

    try {
        sql = `
            SELECT *
            FROM ${ board }
            WHERE w_num=${ w_num }
        `;
        message = 'CONTENT_VIEW';
        const conn = await db2.getConnection();
        query = await conn.query(sql); //select
        result = query[0][0]
        sql = `
            UPDATE ${board} 
            SET hit=${result.hit + 1} 
            WHERE w_num=${w_num} AND w_comment=0;
        `
        await conn.query(sql); // hit

        sql = ` 
            SELECT * FROM ${board}
            WHERE w_num = ${w_num} AND w_comment != 0;
        `
        query = await conn.query(sql) // reply
        let reply = query[0]
        if (reply === undefined) reply = {};

        await res.status(200).json({
            data: result,
            reply: reply
        });
        await conn.release();
        await correctMessage(routerName, message)
    } catch (error) {
        errorMessage(routerName, error)
    }
});

router.post('/:name/modify/:w_id', async (req, res) => {
    const routerName = req.originalUrl;
    let message, sql, param
    try {
        sql = `
            UPDATE board_${req.params.name}
            SET subject=?, content=? 
            WHERE w_id=${req.params.w_id};
        `;
        const conn = await db2.getConnection();
        param = [
            req.body.subject,
            req.body.content
        ]
        message = 'MODIFY SUCCESS';
        await conn.query(sql, param);
        await correctMessage(routerName, message);
        await res.status(200).send(true);
    } catch (error) {
        errorMessage(routerName, error)
    }
});


router.post('/:name/delete/:w_num', async (req, res) => {
    const routerName = req.originalUrl;
    const board = `board_${req.params.name}`
    let message, sql, query, result, reply;
    const reply_type = req.body.w_id;
    try {
        const conn = await db2.getConnection();
        if (reply_type !== undefined) {
            message = 'REPLY DELETE';
            sql = `
                SELECT * FROM ${board} 
                WHERE w_id =${reply_type}
            `
            query = await conn.query(sql);
            result = query[0][0].w_num;
            sql = `
                DELETE FROM ${board}
                WHERE w_id=${reply_type}
            `
        } else {
            message = 'DELETE';
            sql = `
                DELETE FROM board_${req.params.name}
                WHERE w_num=${req.params.w_num}
            `;
        }
        await conn.query(sql);
        sql = `ALTER TABLE ${board} AUTO_INCREMENT=1;`;
        await conn.query(sql);
        sql = `SET @COUNT = 0;`;
        await conn.query(sql);
        sql = `UPDATE ${board } SET w_id=@COUNT:=@COUNT+1;`
        await conn.query(sql);

        if (reply_type !== undefined) {
            sql = ` 
                SELECT * FROM ${board}
                WHERE w_num = ${result} AND w_comment != 0;
            `
            query = await conn.query(sql);
            reply = query[0]
            res.status(200).json({
                reply
            })
            //saga 수정 및 reply send했음
        } else res.status(200).send(true);
        await conn.release();
        await correctMessage(routerName, message);
    } catch (error) {
        errorMessage(routerName, error);
    }
});

module.exports = router;
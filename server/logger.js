const winston = require('winston')
const winstonDaily = require('winston-daily-rotate-file');
const appRoot = require('app-root-path');
const process = require('process')

const logDir = `${appRoot}/logs`;

const {
    combine,
    timestamp,
    label,
    printf
} = winston.format;

const logFormat = printf(({level,message,label,timestamp})=>{
    return `${timestamp} [${label}] ${level}: ${message}`; //로그 출력 포맷 정의
});

const  logger = winston.createLogger({
    format:combine(
        label({
            label:'react-plate'
        }),
        timestamp({
            format:'YYYY-MM-DD HH:mm:ss'
        }),
        logFormat
    ),
    transports:[
        new winstonDaily({ //info 레벨 로그를 저장할 파일 설정
            level:'info',
            datePattern:'YYYY-MM-DD',
            dirname:logDir,
            filename:`%DATE%.log`,
            maxFiles:30, //최근 30일치 로그 파일만 저장
            zippedArchive:true
        }),
        new winstonDaily({
            level:'error',
            datePattern:'YYYY-MM-DD',
            dirname:logDir,
            filename:`%DATE%.error.log`,
            maxFiles:30,
            zippedArchive:true
        })
    ],
    exceptionHandles:[
        // uncaughtException 발생 시
        new winstonDaily({
            level:'error',
            datePattern:'YYYY-MM-DD',
            dirname:logDir,
            filename:`%DATE%.exception.log`,
            maxFiles:30,
            zippedArchive:true
        })
    ]
})

/**운영 환경이 아닌 경우 콘솔로도 로그 출력 */
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format:winston.format.combine(
            winston.format.colorize(), //색 넣어서 출력
            winston.format.simple() //간단한 포맷으로 출력
        )
    }))
}

module.exports = logger;
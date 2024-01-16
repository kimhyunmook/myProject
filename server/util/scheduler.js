const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('1분마다 작업이 실행됩니다.')
});

cron.schedule('1,2,3,4,5 * * * *', () => {
    console.log('매 시간의 1분, 2분, 3분, 4분, 5분에 실행됩니다.');
});

cron.schedule('1-5 * * * *', () => {
    console.log('매 시간의 1분, 2분, 3분, 4분, 5분에 실행됩니다.')
});

cron.schedule('0 9 * * Monday', () => {
    console.log('매주 월요일 09:00에 실행됩니다.');
});


/** 타임존 설정하기 */
cron.schedule('0 1 * * *', () => {
    console.log('매일 America/Sao_Paulo 타임존 기준으로 01:00 마다 작업이 실행됩니다.')
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
});

const task = cron.schedule('* * * * *', () => {
    console.log('start() 함수 실행 후 부터 매분마다 실행됩니다.')
}, {
    scheduled: false //start() 함수로 시작하기 전까지는 스케줄링된 작업이 실행되지 않음
});

// task.start();
// task.stop();

const task_destroy = cron.schedule('* * * * *', () => {
    console.log('매분마다 실행되는 작업이 destroy() 함수 실행 후에는 완전히 삭제됨')
});

//작업을 실행시킬 cron 표현식이 올바르게 작성되었는지를 검증해 주는 함수 입니다.
const task_validate = cron.validate('59 * * * *'); // true; 1~59 까지만 가능


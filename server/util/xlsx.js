const xlsx = require('xlsx');

/** xlsx json 변환
 * @param first xlsx 주소
 * @param second sheet 순서 default) 0
 */
export function xlsx_json(file, target = 0) {
    if (file === undefined) throw console.error('xlsx 파일을 지정해주세요.')

    const workbook = xlsx.readFile(file);
    const sheetName = workbook.SheetNames[target]; // 엑셀 파일의 첫 번째 시트 이름 가져오기
    const sheet = workbook.Sheets[sheetName]; // 시트 이름을 사용해서 엑셀 파일의 첫 번째 시트 가져오기
    const sheetJson = xlsx.utils.sheet_to_json(sheet); // utils.sheet_to_json() 함수를 사용해서 첫 번째 시트 내용을 json 데이터로 변환
    console.log(sheetJson);
}

/** xlsx cell target
 * @param file xlsx 주소 req
 * @param target 원하는 cell 값 req
 * @param sheetNumber 원하는 시트 default) 0
 * @param key 
 */
export function xlsx_target(config = {}) {
    if (config.sheetNumber === undefined) config.sheetNumber = 0

    const workbook = xlsx.readFile(config.file);
    const sheetName = workbook.SheetNames[config.sheetNumber]
    const sheet = workbook.Sheets[sheetName];
    let target = sheet[config.target]


    switch (config.key) {
        case 'v':
            target = target.v; // 원시 값
            break;
        case 'w':
            target = target.w; // 포맷이 적용된 텍스트
            break;
        case 't':
            target = target.t; // 셀 데이터 타입을 나타냄 b :blooean, n :Number, d :Data, S : Text, z :Stub(비어있는 셀) 
            break;
        case 'f':
            target = target.f; // 셀 수식
            break;
        case 'F':
            target = target.F; // 셀 수식이 배열 수식인 경우 배열의 범위
            break;
        case 'r':
            target = target.r; // 서식 있는 텍스트
            break;
        case 'h':
            target = target.h; // html로 렌더링 된 서식 있는 텍스트
            break;
        case 'c':
            target = target.c; // 셀에 대한 메모
            break;
        case 'z':
            target = traget.z; // 숫자 포맷 문자열
            break;
        case 'l':
            target = target.l; // 하이퍼링크
            break;
        case 's':
            target = target.s; // 셀의 스타일/테마
            break;
        default:
            target = target.v
    }

    console.log(target)

}
// xlsx_target({
//     file: './test.xlsx',
//     target: 'A2',
//     key: 'v'
// });

/** xlsx modify  
 * @param file xlsx 파일 주소
 * @param newFIle modify xlsx 파일 저장 주소
 * @param sheetNumber 몇 번째 sheet default) 0
 * @param target [] 이여야함 [[cell,value,type]] ex) target : [['A2','test','v'],['A3','test']]
 * @ex 
 * xlsx_modify({
    * file: './test.xlsx',
    * sheetName: 0,
    * target: [
        * ['A2', 'testing'],
        * ['A3', 'testing2']
    * ],
    * newFile: './test2.xlsx'
 * })
*/
export function xlsx_modify(config = {}) {
    if (config.sheetNumber === undefined) config.sheetNumber = 0;
    const workbook = xlsx.readFile(config.file);
    const sheetName = workbook.SheetNames[config.sheetNumber];
    const sheet = workbook.Sheets[sheetName];

    config.target.map(el => {
        let type
        if (el[2] === undefined) type = 'v'
        sheet[el[0]] = {
            t: type,
            v: el[1]
        }
    })
    xlsx.writeFile(workbook, config.newFile)
}

export function xlsx_upload() {
    
}
const fs = require("fs");
const root_dir = __dirname;
let url; // 전역 변수 이기에 확인 필수
/**
 *data backup
 * @param {*} target
 * @param {*} data
 */
function training(target, data) {
  target.includes("json") ? null : (target = target + ".json");
  try {
    let file = fs.readdirSync(root_dir);
    file = file.reduce((a, c, i) => {
      c.split(".")[1] === "json" ? a.push(c) : null;
      return a;
    }, []);
    console.log(target, data);

    let training_target = file.filter((t) => t === target);
    const target_confirm =
      file.filter((t) => t === target).length > 0 ? true : false;
    // console.log(file, target_confirm);
    if (target_confirm) {
      url = root_dir + "/" + training_target[0];
      //   console.log("url", url);
      training_target = require(url);
      training_target.list =
        data !== undefined
          ? training_target.list?.concat(data)
          : training_target.list;
      const result = {
        table_name: training_target.table_name,
        training_traget: target.split(".json")[0],
        list: training_target.list,
      };
      fs.writeFileSync(url, JSON.stringify(result));

      return result;
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = training;

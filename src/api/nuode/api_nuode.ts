import axios from 'axios';


/**
 * 获取平台车辆数、代运车辆数、在途车辆数
 */
export const GetVehicleCount = () => axios.get("../../static/data/GetVehicleCount.json", {});

/**
 * 当月司机提现金额、累计司机提现金额、平均单笔提现金额
 */
export const GetWithdrawalsMoney = () => axios.get("../../static/data/GetWithdrawalsMoney.json", {});

/**
 * 实时订单
 */
export const GetRealTimeOrder = () => axios.get("../../static/data/GetRealTimeOrder.json", {});

/**
 * 热门路线
 */
export const GetHotLinesChartsAsync = () => axios.get("../../static/data/GetHotLinesChartsAsync.json", {});


/**
 * 
 */
export const GetInTransitOrder = () => axios.get("../../static/data/GetInTransitOrder.json", {});




/**
 * 
 */
export const getTransactionChart = () => axios.get("../../static/data/TransactionChart.json", {});


/**
 * 客户订单统计
 */
export const Main_getCustomerOrdersCount = () => axios.get("../../static/data/Main_getCustomerOrdersCount.json", {});



/**
 * 产品定价统计
 */
export const getFreightRateChart = () => axios.get("../../static/data/FreightRateChart.json", {});


/**
 * 获取平台交易额
 * @param num 
 * @param scale 
 */
export const getTransactionSum = () => axios.get("../../static/data/TransactionSum.json", {});


/**
 * 来货拉
 * @param num 
 * @param scale 
 */
export const GetCapacityList = () => axios.get("../../static/data/GetCapacityList.json", {});









/**
 * 将元/吨等数字换成万元，万吨，并保留两位小数
 * @param num 原数字
 * @param scale [10,100,1000,1000] 
 */
export const numConverse = (num, scale) => Number((num / scale).toFixed(2));


/**
 * 获取上个月最后一天
 */
export const getLastDayOfPreMonth1 = () => {
    let nowdays = new Date();
    let year = nowdays.getFullYear();
    let month = nowdays.getMonth();
    let month1 = '';
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month1 = "0" + month;
    }

    let firstDay = year + "-" + month1 + "-" + "01";//上个月的第一天
    let myDate = new Date(year, month, 0);
    let lastDay = year + "-" + month1 + "-" + myDate.getDate();//上个月的最后一天

    return lastDay

}

export const transformDate = (date, type?) => {
    if (date == "" || date == null || date == "0001-01-01") { return null };
    var t = date;
    var tf = function (i) { return (i < 10 ? '0' : '') + i };
    var ty = function (i) {
        var tempStr;
        if (i < 10) { tempStr = '000' + i }
        else if (i < 100) { tempStr = '00' + i; }
        else if (i < 1000) { tempStr = '0' + i }
        else { tempStr = i };
        return tempStr;
    }
    return ty(date.getFullYear()) + '-' + tf(date.getMonth() + 1) + "-" + tf(date.getDate());
}

/**
* 去掉小数后面的0
* @param num 必须是字符串
*/
export const trimZero = (num) => {
    num = num.toString();
    if (num.indexOf('.') === -1) {
        return num;
    }
    num = num.replace(/0{1,4}$/, '');
    if (num.charAt(num.length - 1) === '.') {
        num = num + '0'
    }
    return num;


}

export const getStrWithSimonFromNum = (num) => num.toString().split('').reverse().join('').match(/\d{1,3}/g).join(',').split('').reverse().join('');




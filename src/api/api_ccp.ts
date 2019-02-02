import { GetVehicleCount } from './nuode/api_nuode';
import { Post, Get, Patch, Put, Delete, ax } from '../http/http'
export default {
    ccp: function () {
        return Get("../../static/data/GetCapacityList.json", {})
    },
    GetCarTransactionNumTop5: function(){
        return Get(`../../static/data/CarTransactionNumTop5.json`,{})
    },
    GetCarFeeAmountTop5: function(){
        return Get(`../../static/data/CarFeeAmountTop5.json`,{})
    },
    GetCodeNumTop5: function(){
        return Get(`../../static/data/CodeNumTop5.json`,{})
    },
    GetOneCarTransactionNum: function(){
        return Get(`../../static/data/OneCarTransactionNum.json`,{})
    },
    GetVehicleSum: function(){
        return Get(`../../static/data/GetVehicleSum.json`,{})
    }
}

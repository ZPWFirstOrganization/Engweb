function invokeMethod(url,data,suc,err) {
    var returnValue;
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: url,
        data: data,
        success: function (data) {
            return suc(data);
        },
        error: function (data) {
            return err(data);
        }
    });
    return returnValue;
}
//获取品牌
function RetrieveMultipleBrand(data,suc,err){
    var url = "/BaseData/BaseDataServices.svc/RetrieveMultipleBrand";
    var data = data
    invokeMethod(url, data,suc,err);
}

//获取型号
function RetrieveMultipleModel(data,suc,err){
    var url = "/BaseData/BaseDataServices.svc/RetrieveMultipleModel";
    var data = data
    invokeMethod(url, data,suc,err);
}

//获取品牌型号
function RetrieveMultipleBrandModel(data,suc,err){
    var url = "/BaseData/BaseDataServices.svc/RetrieveMultipleBrandModel";
    var data = data
    invokeMethod(url, data,suc,err);
}

//普通短信
function SendSMS(data,suc,err){
    var url = "/SMS/SMSServices.svc/SendSMS";
    var data = data
    invokeMethod(url, data,suc,err);
}

//用户注册验证码短信
function SendRegisterSMS(data,suc,err){
    var url = "/SMS/SMSServices.svc/SendRegisterSMS";
    var data = data
    invokeMethod(url, data,suc,err);
}

//用户获取密码短信
function SendGetPasswordSMS(data,suc,err){
    var url = "/SMS/SMSServices.svc/SendGetPasswordSMS";
    var data = data
    invokeMethod(url, data,suc,err);
}

//创建联系人
function CreateContact(data,suc,err){
    var url = "/Contact/ContactServices.svc/CreateContact";
    var data = data
    invokeMethod(url, data,suc,err);
}

//查询单条联系人
function RetrieveSingleContact(data,suc,err){
    var url = "/Contact/ContactServices.svc/RetrieveSingleContact";
    var data = data
    invokeMethod(url, data,suc,err);
}

//更新联系人
function UpdateContact(data,suc,err){
    var url = "/Contact/ContactServices.svc/UpdateContact";
    var data = data
    invokeMethod(url, data,suc,err);
}

//查询司机信息
function RetrieveMultipleDrivers(data,suc,err){
    var url = "/Contact/ContactServices.svc/RetrieveMultipleDrivers";
    var data = data
    invokeMethod(url, data,suc,err);
}

//创建设备档案
function CreateEquipment(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/CreateEquipment";
    var data = data
    invokeMethod(url, data,suc,err);
}

//查询单条设备档案
function RetrieveSingleEquipment(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/RetrieveSingleEquipment";
    var data = data
    invokeMethod(url, data,suc,err);
}

//查询多条设备档案
function RetrieveMultipleEquipments(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/RetrieveMultipleEquipments";
    var data = data
    invokeMethod(url, data,suc,err);
}

//更新设备档案
function UpdateEquipment(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/UpdateEquipment";
    var data = data
    invokeMethod(url, data,suc,err);
}

//删除设备
function DisableEquipment(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/DisableEquipment";
    var data = data
    invokeMethod(url, data,suc,err);
}

//创建设备司机
function CreateEquipmentDriver(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/CreateEquipmentDriver";
    var data = data
    invokeMethod(url, data,suc,err);
}

//解绑设备司机
function UnboundEquipmentDriver(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/UnboundEquipmentDriver";
    var data = data
    invokeMethod(url, data,suc,err);
}

//设备司机报工
function CreateEquipmentDriverWork(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/CreateEquipmentDriverWork";
    var data = data
    invokeMethod(url, data,suc,err);
}

//获取用户信息
function GetWeiXinUserInfo(data,suc,err){
    var url = "/WeiXin/WeiXinUserServices.svc/GetWeiXinUserInfo";
    var data = data
    invokeMethod(url, data,suc,err);
}

//查询机主下关联的司机列表信息
function RetrieveMultipleEquipmentDrivers(data,suc,err){
    var url = "/Contact/ContactServices.svc/RetrieveMultipleEquipmentDrivers";
    var data = data
    invokeMethod(url, data,suc,err);
}

//机主查询单条设备司机详细信息
function RetrieveSingleEquipmentDriver(data,suc,err){
    var url = "/Contact/ContactServices.svc/RetrieveSingleEquipmentDriver";
    var data = data
    invokeMethod(url, data,suc,err);
}

//司机查询单条设备司机详细信息
function RetrieveSingleDriver(data,suc,err){
    var url = "/Contact/ContactServices.svc/RetrieveSingleDriver";
    var data = data
    invokeMethod(url, data,suc,err);
}

//每日报工-设备档案查询
function RetrieveMultipleEquipmentStatus(data,suc,err){
    var url = "/Equipment/EquipmentServices.svc/RetrieveMultipleEquipmentStatus";
    var data = data
    invokeMethod(url, data,suc,err);
}

//获取微信JSSDK接口
function GetWeChatConfig(data,suc,err){
    var url = "/WeiXin/WeChatJsSDKServices.svc/GetWeChatConfig";
    invokeMethod(url,data,suc,err);
}
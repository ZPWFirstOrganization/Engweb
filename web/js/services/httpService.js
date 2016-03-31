var baseUrl = "http://120.25.241.161:8081"
function invokeMethod(url, data) {
    var returnValue;
    $.ajax({
        async: false,
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        url: baseUrl+url,
        data: data,
        beforeSend:function(XMLHttpRequest){
            XMLHttpRequest.setRequestHeader("Access-Control-Allow-Origin","*");
            XMLHttpRequest.setRequestHeader("Access-Control-Allow-Origin","http://localhost:8080");
        },
        success: function (data) {
            alert(window.JSON.stringify(data));
        },
        error: function (data) {
            alert("error:" + data.status);
            return;
        }
    });
    return returnValue;
}

function CreateRecord() {
    var url = "/Contact/ContactServices.svc/CreateContact";
    var data = {"Contact":{"Subject":"FindJob Subject","ContactName":"FindJobContact","Phone":"FindJob Phone","BrandId":"","ModelId":"","Description":"FindJob Description"}};
    invokeMethod(url, data);
}
function UpdateRecord() {
    var url = "/Contact/ContactServices.svc/UpdateContact";
    var data = document.getElementById("UpdateRecordJSON").value;
    invokeMethod(url, data);
}
function DeleteRecord() {
    var url = "/Contact/ContactServices.svc/DeleteContact";
    var data = document.getElementById("DeleteRecordJSON").value;
    invokeMethod(url, data);
}
function RetrieveSingleRecord() {
    var url = "/Contact/ContactServices.svc/RetrieveSingleContact";
    var data = {"Contact":{"FindJobId":"755931e6-cb13-e511-9415-e520d767005a","AppUserId":"A2A33A88-7C33-E511-9415-E520D767005A"}}
    invokeMethod(url, data);
}
function RetrieveMultipleRecords() {
    var url = "/Contact/ContactServices.svc/RetrieveMultipleContacts";
    var data = document.getElementById("RetrieveMultipleRecordsJSON").value;
    invokeMethod(url, data);
}

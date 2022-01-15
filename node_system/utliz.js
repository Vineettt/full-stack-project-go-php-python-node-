function logData(message){
    let d = new Date();
    var time = '['+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+']';
    console.log(time+message);
}

module.exports = {logData};
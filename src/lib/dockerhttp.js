var request = require("request");
var url = "http://127.0.0.1:4243";

var DockerApi = {
    get:function(endpoint,callback){
        request({
            url:url + endpoint,
            method:"GET",
        },function(err,response,body){
            if(err)
                return callback(response.statusCode + " " + body);

            return callback(null,body);
        })
    },
    post:function(endpoint,_body,callback){
        request({
            url:url + endpoint,
            method:"POST",
            body:_body,
            json:true
        },function(err,response,body){
            if(err)
                return callback(response.statusCode + " " + body);

            return callback(null,body);
        })
    },
    delete:function(endpoint,_body,callback){
        request({
            url:url + endpoint,
            method:"DELETE",
            body:_body,
            json:true
        },function(err,response,body){
            if(err)
                return callback(response.statusCode + " " + body);

            return callback(null,body);
        })
    }
}


module.exports = DockerApi;

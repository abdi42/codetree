var should = require("should");
var dockerhttp = require("../../src/lib/dockerhttp.js");
var fs = require('fs');

function containerExec(containerId,callback){
    var execOpts = {
      AttachStdout: true,
      AttachStderr: true,
      Tty: false,
      Cmd: ['touch' , 'temp/file.txt']
    }

    dockerhttp.post("/containers/"+containerId+"/exec",execOpts,function(err,body){
        dockerhttp.post("/exec/"+body.Id+"/start",{ Detach: false,Tty: false },function(err){
            if(err) return callback(err)

            return callback(null);
        })
    })
}

describe("DockerHttp",function(){
  var container = {};

  it("should connect to docker daemon and return list of container",function(){
    dockerhttp.get('/containers/json',function(err,body){
      body.should.be.an.Array();
      done()
    })
  })

  it("should create a container",function(){
    var containerOpts = {
        AttachStdout: true,
        AttachStderr: true,
        Image: "node",
        Volumes: {
          "/codetree/temp": {}
        },
        HostConfig:{
          Binds:["/home/abdullahimahamed0987/codetree/test/temp:/codetree/temp:rw"]
        },
        OpenStdin: true,
        NetworkDisabled:true,
        Cmd: ['/bin/bash']
    }

    dockerhttp.post("/containers/create",containerOpts,function(err,body){
      container = body;
      body.Id.should.be.an.String();
      done()
    })
  })

  it("should create a file called test.txt",function(){
    containerExec(container.Id,function(err){
      if(err){
        throw new Error(err)
      }
      else{
        fs.stat("test/temp/test.txt",function(err,stats){
          if(err) throw err;
          if(stats.isFile()){
            done()
          }
        })
      }

    })
  })


})

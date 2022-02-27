var e = require("express");
var p = require("path");
var f = require("express-fileupload");
var m = require("mysql");

var app = e();
app.use(e.static("public"));
app.use(f());
app.use(e.urlencoded({'extended':false})); //for method="post" as data is in binary format

var databaseObject = {
    host : "localhost",
    user : "root",
    password : "",
    database : "project"
}

var dbConnection = m.createConnection(databaseObject);
dbConnection.connect(function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("database connected");
    }
})

app.listen(1003,function(){
    console.log("server started");
});

//-----------------------------HOME PAGE
app.get("/",function(req,resp){
    var indexPath = p.join(__dirname,"public","index.html");
    resp.sendFile(indexPath);
});

//----------------------------ADMIN PAGE
app.get("/admin",function(req,resp){
    var adminPath = p.join(process.cwd(),"public","admin-dash.html");
    resp.sendFile(adminPath);
})

//----------------------------SIGNUP
app.get("/signup",function(req,resp){
    var dataArray = [req.query.email,req.query.password,req.query.mobile,req.query.user];
    dbConnection.query("INSERT INTO users VALUES(?,?,?,?,CURRENT_DATE())",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            if(result.affectedRows != 0){
                var filename = "no_user.png";
                if(req.query.user == "citizen"){
                    var dataArray = [req.query.email,req.query.mobile,filename];
                    dbConnection.query("INSERT INTO profile(email,contact,profilename) VALUES(?,?,?)",dataArray);
                }
                else if(req.query.user == "worker"){
                    var dataArray = [req.query.email,req.query.mobile,filename,filename];
                    dbConnection.query("INSERT INTO profileworker(email,contact,profilepic,proofpic) VALUES(?,?,?,?)",dataArray);
                }
            }
            resp.send(result);
        }
    })
});

//---------------------------LOGIN
app.get("/login",function(req,resp){
    console.log(req.query);
    dbConnection.query("SELECT * FROM users WHERE email=?",req.query.email,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//---------------------------UPDATE PROFILE CITIZEN
app.post("/updateRecord",function(req,resp){
    var filename;
    if(req.files != null){
        filename = req.files.profilePic.name;
        var destination = p.join(process.cwd(),"public","uploads",req.files.profilePic.name);
        req.files.profilePic.mv(destination,function(err){
            if(err){
                console.log(err);
            }
            else{
                console.log("image updated");
            }
        })
    }
    else{
        filename = req.body.hiddenPic;
    }

    var dataArray = [req.body.name,req.body.contact,req.body.address,req.body.city,req.body.state,filename,req.body.email];
    dbConnection.query("UPDATE profile SET name=?,contact=?,address=?,city=?,state=?,profilename=? WHERE email=?",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.sendFile(p.join(process.cwd(),"public","profile-user.html"));
        }
    })
})

//---------------------------UPDATE PROFILE WORKER
app.post("/updateRecordWorker",function(req,resp){
    var filename;
    var filenameProof;
    if(req.files != null){
        if(req.files.profilePic){
            filename = req.files.profilePic.name;
            var destination = p.join(process.cwd(),"public","uploads",req.files.profilePic.name);
            req.files.profilePic.mv(destination,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("image updated");
                }
            })
        }
        else{
            filename = req.body.hiddenPic;
        }

        if(req.files.proofPic){
            filenameProof = req.files.proofPic.name;
            var desti = p.join(process.cwd(),"public","uploads",req.files.proofPic.name);
            req.files.proofPic.mv(desti,function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("image updated");
                }
            })
        }
        else{
            filenameProof = req.body.hiddenProof;
        }
    }
    else{
        filename = req.body.hiddenPic;
        filenameProof = req.body.hiddenProof;
    }

    var dataArray = [req.body.name,req.body.contact,req.body.address,req.body.city,req.body.state,req.body.category,req.body.experience,req.body.workdone,filename,filenameProof,req.body.email];
    dbConnection.query("UPDATE profileworker SET name=?,contact=?,address=?,city=?,state=?,category=?,experience=?,workdone=?,profilepic=?,proofpic=? WHERE email=?",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.sendFile(p.join(process.cwd(),"public","profile-worker.html"));
        }
    })
})

//---------------------------FETCH BUTTON PROFILE CITIZEN
app.get("/fetchRecord",function(req,resp){
    dbConnection.query("SELECT * FROM profile WHERE email=?",req.query.email,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//---------------------------FETCH BUTTON PROFILE WORKER
app.get("/fetchRecordWorker",function(req,resp){
    dbConnection.query("SELECT * FROM profileworker WHERE email=?",req.query.email,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//--------------------------POST REQUIREMENT CITIZEN
app.post("/post",function(req,resp){
    console.log(req.body);
    var dataArray = [0,req.body.email, req.body.contact, req.body.category, req.body.description,req.body.upto,req.body.city];
    dbConnection.query("INSERT INTO requests VALUES(?,?,?,?,?,?,?,current_date())",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.sendFile(p.join(process.cwd(),"public","post-req-result.html"));
            // resp.send(result);
        }
    })
})

//------------------------CHANGE PASSWORD
app.get("/changePassword",function(req,resp){
    console.log(req.query);
    dbConnection.query("SELECT * FROM users WHERE email=?",[req.query.email],function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            if(result[0].password == req.query.password){
                var dataArray = [req.query.newPassword,req.query.email];
                dbConnection.query("UPDATE users SET password=? WHERE email=?",dataArray,function(err,result){
                    if(err){
                        resp.send(err);
                    }
                    else{
                        resp.send(result);
                    }
                })
            }
            else{
                resp.send("Wrong Password");
            }
        }
    })
})

//-----------------------FETCH DISTINCT CITY ADMIN->CITIZEN
app.get("/fetchCity",function(req,resp){
    dbConnection.query("SELECT DISTINCT city FROM profile", function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//----------------------FETCH RECORD PARTICULAR CITY ADMIN->CITIZEN
app.get("/fetchCityRecord",function(req,resp){
    dbConnection.query("SELECT * FROM profile WHERE city=?", [req.query.city], function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//------------------FETCH RECORD PARTICULAR CITY ADMIN->WORKER
app.get("/fetchCityRecordWorker",function(req,resp){
    dbConnection.query("SELECT * FROM profileworker WHERE city=?",[req.query.city],function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//--------------------FETCH DISTINCT CITY OF WORKER
app.get("/fetchCityWorker",function(req,resp){
    dbConnection.query("SELECT DISTINCT city FROM profileworker",function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//----------------------FETCH DISTINCT CATEGORY OF WORKER
app.get("/fetchCategoryWorker",function(req,resp){
    dbConnection.query("SELECT DISTINCT category FROM profileworker",function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//------------------------FETCH RECORD BASED ON CITY AND CATEGORY
app.get("/fetchCityCategoryRecord",function(req,resp){
    var dataArray = [req.query.city,req.query.category];
    dbConnection.query("SELECT * FROM profileworker WHERE city=? AND category=?",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//-----------------------FETCH CITY OF POST REQUIREMENTS
app.get("/fetchCityRequirements",function(req,resp){
    dbConnection.query("SELECT DISTINCT city FROM requests",function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//--------------FETCH CATEGORIES OF POST REQUIREMENTS
app.get("/fetchCategoryRequirements",function(req,resp){
    dbConnection.query("SELECT DISTINCT category FROM requests",function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//-----------------FETCH REQUIREMENTS RECORD BASED ON CITY AND CATEGORY
app.get("/fetchRecordRequests",function(req,resp){
    var dataArray = [req.query.city,req.query.category];
    dbConnection.query("SELECT * FROM requests WHERE city=? AND category=?",dataArray,function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

//------------------FETCH ALL REQUIREMENTS POSTED BY PERSON
app.get("/fetchRequirements",function(req,resp){
    dbConnection.query("SELECT * FROM requests WHERE email=?",[req.query.email],function(err,result){
        if(err){
            resp.send(err);
        }
        else{
            resp.send(result);
        }
    })
})

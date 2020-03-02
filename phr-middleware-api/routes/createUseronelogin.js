const request = require("request");

module.exports = function(app){ 
    app.post("/createUserOneLogin", (req, res) => {
    console.log(req.body);
var form = {
  profile : {
        firstName:req.body.firstName,
        lastName: req.body.lastName,
        login: req.body.login,
        email: req.body.email,
        UserType : req.body.UserType
      },
      credentials : {
        password : {value : ''}
      }
    };
var formData = JSON.stringify(form);
console.log(formData);

  var options = {
  uri:'https://dev-357341.okta.com/api/v1/users',
  headers: 
   { Accept : 'application/json',
     'Content-Type': 'application/json',
     'Access-Control-Allow-Origin' : '*',
     'Custom-Allowed-Origin-Header-1' : 'http://localhost:3000/Register',
     Authorization: 'SSWS 001VxvLE_yLY68atO_Qj6dKFcdvb0QqqPkE4G_WYSC'
    },
  body: formData,
  json: true,
  
  method:'POST'
};
console.log(128736);

request (options, function (error, response, body) {
  if (error) throw new Error(error);
  console.log(body);
  console.log(response);
  res.send(response);
  console.log(128736);
});

});
}

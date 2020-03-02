const reqRoute = require('./requestRoute');
const resRoute = require('./responseRoute');
const revRoute = require('./revokeRoute');
const querAllRoute = require('./queryallRoute');
const queryProReq = require('./queryProReqRoute');
const queryPatReq = require('./queryPatReqRoute');
const queryDB = require('./querydb');
const uploadMedDB = require('./uploadMedDb');
const uploadHistDB = require('./uploadHistDb');
const uploadLifeDB = require('./uploadLifeDb');
const queryPatientDB = require('./queryPatientdb');
const proViewRoute = require('./proViewRoute');
const queryProView = require('./queryProView');
const chaindashboard = require('./chainDashboard');
const register = require('./registerRoute');
const createuserOneLogin = require('./createUseronelogin');
const querryPatHistRoute = require('./queryPatHistRoute')

module.exports = function (app){
    reqRoute(app);
    resRoute(app);
    revRoute(app);
    querAllRoute(app);
    queryProReq(app);
    queryPatReq(app);
    queryDB(app);
    uploadMedDB(app);
    uploadLifeDB(app);
    uploadHistDB(app);
    queryPatientDB(app);
    proViewRoute(app);
    queryProView(app);
    chaindashboard(app);
    register(app);
    createuserOneLogin(app);
    querryPatHistRoute(app);

}
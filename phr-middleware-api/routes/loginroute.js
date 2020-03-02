module.exports = function(app) {
    app.get("/login", (req, res) => {
        passport.use(new GitHubStrategy({
            clientID:d4ccb0c76a912f496bc2,
            clientSecret:'7335a2c9db6dcddb301e75ada73bfe21004d4b5d',
            callbackURL:"http://130.147.175.221:8091/"
        }, 
        function (accessToken, refreshToken, profile, done){
            User.findOrCreate({githubId : profile.id }, function (err, user){
                return done(err. user);
            })
        }))

        app.get('/auth/github/callback', passport.authenticate('github',{failureRedirect: '/login'}),
        function(res,req){
            //Successful authentication redirect home
            res.redirect('/');
        });
    });
};

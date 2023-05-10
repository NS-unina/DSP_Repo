//da  aggiustare, bisogna usare il pattern api ed il modulo config

const config = require("../config/config");
const router = config.express.Router();

router.use(
    config.session({
        secret: config.SECRET,
        resave: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, //One day
        saveUninitialized: true,
    })
);
router.use(config.bodyParser.json());
router.use(config.cookieParser(config.SECRET));
router.use(config.express.urlencoded({ extended: true }));

router.post("/", function (request, response) {
    // Capture the input fields
    const username = request.body.username;
    const password = request.body.password;

    // Ensure the input fields exists and are not empty

    if (username && password) {
        // Execute SQL query that'll select the account from the database based on the specified username and password
        // ON PURPOSE NOT SANIFICATING QUERY
        const dang_query = `SELECT * FROM Employee WHERE Username = "${username}"`;
        config.pool.query(
            { sql: dang_query, rowAsArray: true },
            function (error, results) {
                // If there is an issue with the query, output the error
                if (error) {
                    console.log(error);
                    response.status(500).json("Bad syntax!");
                    return;
                }
                
                // If the account exists
                if (results.length != 0) {
                    if (results[0].Password == password) {
                        // Authenticate the user
                        response
                            .status(200)
                            .json({
                                success: true,
                                response: "Welcome back!",
                                result: results,
                            });
                    } else {
                        response
                            .status(401)
                            .json({
                                success: false,
                                response: "Wrong password",
                                result: results,
                            });
                    }
                } else {
                    response
                        .status(409)
                        .json({
                            success: false,
                            response: "No user found",
                            result: results,
                        });
                }
            }
        );
    } else {
        response.status(400).json("Error value(s) missing");
    }
});

router.get("/", function (request, response) {
    // Render login template
    response.sendFile(config.frontend_path + "/html/login.html");
});

module.exports = router;

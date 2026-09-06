const { frontend_path } = require("../config/config");
const config = require("../config/config");
const login = require("./login");

const app = config.express();

app.use(config.rateLimit(config.apiLimiter));
app.use(config.express.json());

app.use(config.express.static(frontend_path)); //per rilevare i file css

app.use("/", login);

app.listen(config.PORT, () => {
  console.log("[BACKEND] Start listening on port:" + config.PORT);
});

import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as logger from "morgan";

import {index as indexController} from "./controllers/indexController";


export class App {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
        this.routes();
        this.routesErrorHandler();
    }

    public config() {
        this.app.set('views', path.join(__dirname, '../views'));
        this.app.set('view engine', 'ejs');

        // uncomment after placing your favicon in /public
        //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    public routes() {
        this.app.use('/', indexController);
    }

    public routesErrorHandler() {
        //catch 404 and forward to error handler
        this.app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
            let err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handler
        this.app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
}
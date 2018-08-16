// GitHub source: server.js
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import * as express from 'express';
import { join } from 'path';
import { enableProdMode } from '@angular/core';
import { Config } from '@config/config';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { WinLogger } from '@common/logger/winlogger';

const DIST_FOLDER = join(process.cwd(), 'dist/client');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(join(DIST_FOLDER, 'server/main'));
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

export class ClientServer {

  static CLIENT_PORT = Config.get().CLIENT_PORT || 4000;
  static logger = WinLogger.get('main');

  static bootstrap() {
    return new Promise((resolve) => {
      this.initServer(resolve);
    });
  }

  private static initServer(done) {
    // Faster server renders w/ Prod mode (dev mode never needed)
    enableProdMode();
    const app = express();

    // Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    app.engine('html', (_: any, options: any, callback: any) => {
      const engine = ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP),
        { provide: 'request', useFactory: () => options.req, deps: [] }]
      });
      engine(_, options, callback);
    });
    app.set('view engine', 'html');
    app.set('views', join(DIST_FOLDER, 'browser'));

    // Server static files from /browser
    app.use('/views', express.static(join(DIST_FOLDER, 'browser'), {
      maxAge: '1y'
    }));

    app.get('/views/*', this.beforeRender, this.render);

    // error middleware
    app.use(this.manageError);

    app.get('*', (_req: any, res: any) => {
      res.redirect('/views');
    });

    // Start up the Node server
    app.listen(this.CLIENT_PORT, () => {
      done();
    });
  }

  private static beforeRender(req: any, _res: any, next: any) {
    req.asiNgtools = {
      language: req.headers['accept-language']
    };
    next();
  }

  private static render(req: any, res: any) {
    console.log('Start render ' + new Date());
    res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req, res }, (_err: any, html: any) => {
      console.log('End render ' + new Date());
      res.send(html);
    });
  }

  private static manageError(err: any, _req: any, _res: any, _next: any) {
    console.log('Error while rendering ' + err);
  }
}

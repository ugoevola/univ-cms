const NodeCache = require('node-cache');
import { Injectable } from '@angular/core';

@Injectable()
export class UnivCache {

  private cache = new NodeCache();

  get(key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  remove(key): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.del(key, (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      });
    });
  }

  set(key, item): Promise<any> {
    return new Promise((resolve, reject) => {
      this.cache.set(key, item, null, (err, success) => {
        if (err) {
          reject(err);
        } else {
          resolve(success);
        }
      });
    });
  }

}

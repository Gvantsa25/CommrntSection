// import { Comment } from './app.component';
import {default as data} from '../data.json';

export class DataService {
getUsers(): Promise<any>{
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(data);
      }, 2000);
    });
  }
  
}

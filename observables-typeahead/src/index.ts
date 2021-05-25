import {ajax} from 'rxjs/ajax';
import {tap} from 'rxjs/operators';

ajax(`https://jsonplaceholder.typicode.com/users`).pipe(
    tap(userResponse => console.log('users: ', userResponse)),
);


import {ajax} from 'rxjs/ajax';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

const getUsers = () => {
    return ajax(`https://jsonplaceholder.typicode.com/users`)
}

const getContinents = (keys: string) => {

    return [
        'africa',
        'antarctica',
        'asia',
        'australia',
        'europe',
        'north america',
        'south america'
    ].filter(e => e.indexOf(keys.toLowerCase()) > -1);
};

const searchUsers = (users: any, keys: string) => {
    console.log(users);
    return users.filter((e: string | string[]) => e.indexOf(keys.toLowerCase()) > -1);
}

const logUsers = (keys: string) => getUsers()
    .pipe(
        tap((ajaxResponse: any) => {
            return ajaxResponse.response
                .map(({username}: any) => console.log(username));
        })
    );

fromEvent(document.getElementById('type-ahead'), 'keyup')
    .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(logUsers),
        tap(c => {
            console.log(c);
            const usernames = c.response.map(({username}: any) => username);
            return document.getElementById('output').innerText = usernames.join('\n');
        })
    ).subscribe();

import {ajax, AjaxResponse} from 'rxjs/ajax';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

const getUsernamesByKeys = (keys: string) => ajax(`https://jsonplaceholder.typicode.com/users`)
    .pipe(
        map((ajaxResponse: AjaxResponse<any>) => ajaxResponse.response),
        map(users => users.map((user: { username: string }) => user.username)),
        map((usernames: string[]) => filterUsersByKeys(usernames, keys))
    );

const filterUsersByKeys = (usernames: string[], keys: string) => {
    return usernames.filter((username: string) => hasKeys(username, keys));
}

const hasKeys = (username: string, keys: string) => {
    return username.toLowerCase().indexOf(keys.toLowerCase()) > -1;
}

fromEvent(document.getElementById('type-ahead'), 'keyup')
    .pipe(
        debounceTime(200),
        map((e) => (e.target as HTMLInputElement).value),
        distinctUntilChanged(),
        switchMap(getUsernamesByKeys),
    ).subscribe((filteredUsernames) => document.getElementById('output').innerText = filteredUsernames.join('\n'));

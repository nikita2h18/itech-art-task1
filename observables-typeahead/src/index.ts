import {ajax, AjaxResponse} from 'rxjs/ajax';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

const getUsernames = (keys: string) => {
    return ajax(`https://jsonplaceholder.typicode.com/users`).pipe(
        map((ajaxResponse: AjaxResponse<any>) => ajaxResponse.response
            .map((user: { username: string }) => user.username)
            .filter((username: string) => {
                return username.toLowerCase().indexOf(keys.toLowerCase()) > -1;
            })
        )
    )
}

fromEvent(document.getElementById('type-ahead'), 'keyup')
    .pipe(
        debounceTime(200),
        map((e: any) => e.target.value),
        distinctUntilChanged(),
        switchMap(getUsernames),
        tap((c: any) => document.getElementById('output').innerText = c.join('\n'))
    ).subscribe();

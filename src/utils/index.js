import { Observable } from 'rxjs'

export const createHttpObservable = (url) => {
    return Observable.create((observer) => {
        fetch(url)
            .then((res) => res.json())
            .then((body) => {
                observer.next(body)
                observer.complete()
            })
            .catch((err) => observer.error(err))
    })
}

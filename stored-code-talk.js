useEffect(() => {
    if (props.user) {
        getCountries()
    }
    // fetchNotificationsOldSchool()
    // fetchNotificationsRxJs()
}, [props.user])

const fetchNotificationsOldSchool = async () => {
    // try {
    //     await fetch('/api/notifications')
    //         .then((res) => res.json())
    //         .then((data) => setNotifications(data))
    // } catch (e) {
    //     console.err(e)
    // }
}

// const fetchNotificationsRxJs = () => {
//     const http$ = createHttpObservable('/api/notifications')
//     const ex = http$.pipe(retryWhen((errors) => errors.pipe(delayWhen(() => timer(2000)))))

//     ex.subscribe((data) => setNotifications(data))

//     // return http$.subscribe((data) => setNotifications(data))
// }

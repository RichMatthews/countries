import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { CONNECTED_Router } from 'components/router'
import { store } from 'redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CONNECTED_Router />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

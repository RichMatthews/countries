import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { CONNECTED_ROUTER } from 'components/router'
import { store } from 'redux/store'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <CONNECTED_ROUTER />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

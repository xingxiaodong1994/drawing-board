import React, {Component} from 'react'
import Child from './Child'
import {Provider} from 'react-redux'
import store from './data/store'

class App extends Component{
    render(){
        return (
            <Provider store={store}>
                <div>
                    这里是App组件
                    <Child />
                </div>
            </Provider>
        )
    }
}

export default App
import React, {Component} from 'react'
import {connect} from 'react-redux'
import action from './data/action'
import './child.css'

@connect(
    (state)=>{return {status: state.status}},
    (dispatch)=>{return {dispatch: dispatch}}
)
class Child extends Component{
    componentWillMount(){
        this.handelClick = ()=>{
            this.props.dispatch(action())
        }
    }
    render(){
        return (
            <div className="wrapper" onClick={this.handelClick}>
                这里是Child组件
                {this.props.status}
            </div>
        )
    }
}

export default Child
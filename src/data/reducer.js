export default function reducer(initState={status:0}, action){
    switch(action.type){
        case 'CLICK':
            return Object.assign({}, initState, {status: action.payload.status})
        default:
            return initState
    }
}
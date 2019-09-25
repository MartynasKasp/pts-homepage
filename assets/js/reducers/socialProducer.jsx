const initialState = {
    items: [],
    item: {},
};

export default function(state = initialState, action) {
    switch(action.type) {
        case 'FETCH_SOCIALS':
            return {
                ...state,
                items: action.data.data.items
            };
        case 'NEW_SOCIAL':
            console.log(action.data.data.item);
            return {
                ...state,
                item: action.data.data.item
            };
        default:
            return state;
    }
}
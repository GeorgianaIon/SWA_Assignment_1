const imageSrcReducer = (state = "", action: any) => {
    switch(action.type) {
        case "SET_IMAGE_SRC":
            return action.payload;
        default:
            return state;
    }
}
import api from './axiosSetting'

export const getChatRoom = (obj) => {
    return api.get('/chat/room/roomList', {
        params: obj,
      })
}

export const getChatMessageList = (obj) => {
    return api.get('/chat/message/messageList', {
        params: {
         ...obj
        },
      })
}



// export default getChatRoom
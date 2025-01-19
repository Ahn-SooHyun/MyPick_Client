import { createSelector } from "@reduxjs/toolkit";


// 1. 이거 만들기 ( 상수 선언, 액션 타입을 정의 )
// const type_name = "chatRoom/type_name"
const CHANGE_ROOM_IDX = "chatRoom/CHANGE_ROOM_IDX";
const CHANGE_MESSAGE_LIST = "chatRoom/CHANGE_MESSAGE_LIST";

// 2. 메소드 만들기 ( 액션 생성 )
// 인자 이름은 최대한 initialState에 있는 값과 일치시킨다. 안그럼 ㅈㄴ 귀찮아짐
// export const method_name = (인자 있으면 넣고 없으면 뺴고) => ({
//     type: CHANGE_ROOM_IDX,
//     // 인자있음 쓰고 없음 빼
// });

export const changeRoomIdx = (roomIdx) => ({
    type: CHANGE_ROOM_IDX,
    roomIdx
});

export const changeMessageList = (messageList) => ({
    type: CHANGE_MESSAGE_LIST,
    messageList
});

// 무시해
const selectChatRoom = (state) => state.chatRoom;

// 3. GETTER라고 생각하면 됨. initialState 에 값 추가 할때마다 만들면 됨
export const selectMessageList = createSelector(
    [selectChatRoom],
    (chatRoom) => chatRoom.messageList
);

export const selectRoomIdx = createSelector(
    [selectChatRoom],
    (chatRoom) => chatRoom.roomIdx
);

const initialState = {
    roomIdx: null,
    messageList: [],
};
// ↓ 리듀서, 상태를 변경하는 함수
export default function chatRoom(state = initialState, action) {
    switch (action.type) {
        // 4. CASE 만들기
        // 바꿀값은 initialState에 있는 값을 쓴다
        // case type_name:
        //     return {
        //         ...state,
        //         바꿀값: action.바꿀값,
        //     };
        case CHANGE_ROOM_IDX:
            return {
                ...state,
                roomIdx: action.roomIdx,
            };
        case CHANGE_MESSAGE_LIST:
            return {
                ...state,
                messageList: action.messageList,
            };

        default:
            return state;
    }
}


// 데이터 가져오고 메소드 쓰는 법은
// LeftSidebar.js, (메소드 사용)
// const onChangeRoomIdx = (idx) =>  dispatch(changeRoomIdx(idx))
//          onChangeRoomIdx(room.chat_idx)
// 이거랑 ChatBefore.js (getter로 값 가져오기)
//   const messageListT = useSelector(selectMessageList)
//   const RoomIdxT = useSelector(selectRoomIdx)
// 를 참고
import React, { createContext, useReducer } from 'react';
var io = require('socket.io-client');

export const CTX = createContext();

const initState = {
  general: [],
  'Dept. 1': []
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[action.payload.topic],
          {
            from,
            msg
          }
        ]
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit('chat message', value);
}

export default function Store(props) {
  const [allChats, dispatch] = useReducer(reducer, initState);

  if (!socket) {
    socket = io(':3001');
    socket.on('chat message', function(msg) {
      dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
    });
  }

  const user = 'al' + Math.random(100).toFixed(2);

  return (
    <div>
      <CTX.Provider value={{ allChats, sendChatAction, user }}>
        {props.children}
      </CTX.Provider>
    </div>
  );
}

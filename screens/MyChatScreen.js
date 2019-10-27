/** Chat Screen */

import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/75052e4f-78b9-4523-b8a6-e3f164fbe0ad/token';
const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:75052e4f-78b9-4523-b8a6-e3f164fbe0ad';
const CHATKIT_ROOM_ID = '19413395';
const CHATKIT_USER_NAME = 'Shubham';

export default class MyChatScreen extends React.Component {
  state = {
    messages: []
  };

  //   componentDidMount() {
  //     this.setState({
  //       messages: [
  //         {
  //           _id: 1,
  //           text: "I think we passed the first step of the tutorial. We will now need a Pusher account!",
  //           createdAt: new Date(),
  //           user: {
  //             _id: 1,
  //             name: "React Native",
  //             avatar: "https://placeimg.com/140/140/any"
  //           }
  //         }
  //       ]
  //     });
  //   }

  componentDidMount() {
    const tokenProvider = new TokenProvider({
      url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
    });

    const chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      userId: CHATKIT_USER_NAME,
      tokenProvider: tokenProvider,
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: CHATKIT_ROOM_ID,
          hooks: {
            onMessage: this.onReceive,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }


  onReceive = data => {
    const { id, senderId, text, createdAt } = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: senderId,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
      },
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, incomingMessage),
    }));
  };

  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: CHATKIT_ROOM_ID,
        })
        .then(() => { })
        .catch(err => {
          console.log(err);
        });
    });
  };


  render() {
    return <GiftedChat
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      user={{
        _id: CHATKIT_USER_NAME
      }}
    />;
  }
}

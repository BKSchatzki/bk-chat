import React, { useState, useEffect } from 'react';
import client, { databases, DATABASE_ID, COLLECTION_ID_MESSAGES } from '../appwriteConfig';
import { ID, Query } from 'appwrite';
import { Trash2 } from 'react-feather';
import Header from '../components/Header';

const Room = () => {

  // Set states
  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState('');

  // Set effects
  useEffect(() => {
    getMessages()

    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      // Callback will be executed on changes for documents A and all files.
      if(response.events.includes('databases.*.collections.*.documents.*.create')) {
        console.log('A MESSAGE WAS CREATED.');
        setMessages(prevState => [response.payload, ...prevState]);
      }
      if(response.events.includes('databases.*.collections.*.documents.*.delete')) {
        console.log('A MESSAGE WAS DELETED.');
        setMessages(prevState => prevState.filter(message => message.$id !== response.payload.$id));
      }
    });

    return () => {
      unsubscribe();
    }
  }, []);

  // Create
  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body:messageBody
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );

    console.log('Created:', response);

    // setMessages(prevState => [response, ...prevState]);

    setMessageBody('');
  }

  // Read
  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc('$createdAt')
      ]
      );
    console.log('RESPONSE:', response);
    setMessages(response.documents);
  }

  // Delete
  const deleteMessage = async (message_id) => {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    );
    // setMessages(prevState => prevState.filter(message => message.$id !== message_id));
  }

  return (
    <main className='container'>

      <Header />

      <div className="room--container">

        <form
          action=""
          id='message--form'
          onSubmit={handleSubmit}
        >
          <div>
            <textarea
              maxLength='1000'
              onChange={(e) => {setMessageBody(e.target.value)}}
              placeholder='Say something...'
              required
              value={messageBody}
            ></textarea>
          </div>

          <div className='send-btn--wrapper'>
            <input
              className='btn btn-secondary'
              type="submit"
              value='Send'
            />
          </div>
        </form>

        <div>
          {messages.map(message => (
            <div
              className='message--wrapper'
              key={message.$id}
            >
              <div className='message--header'>
                <small className='message-timestamp'>{new Date(message.$createdAt).toLocaleString()}</small>
                <Trash2
                  className='delete--btn'
                  onClick={() => {deleteMessage(message.$id)}}
                />
              </div>
              
              <div className='message--body'>
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default Room;
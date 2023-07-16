import React, { useState, useEffect } from "react";
import client, {
  databases,
  DATABASE_ID,
  COLLECTION_ID_MESSAGES,
} from "../appwriteConfig";
import { ID, Query, Role, Permission } from "appwrite";
import { Trash2 } from "react-feather";
import Header from "../components/Header";
import { useAuth } from "../utils/AuthContext";

const Room = () => {
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          console.log("A MESSAGE WAS CREATED.");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          console.log("A MESSAGE WAS DELETED.");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id)
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      user_id: user.$id,
      username: user.name,
      body: messageBody,
    };

    let permissions = [Permission.write(Role.user(user.$id))];

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload
    );
    // console.log('Created:', response);
    // setMessages(prevState => [response, ...prevState]);

    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt")]
    );
    // console.log('RESPONSE:', response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id
    );
    // setMessages(prevState => prevState.filter(message => message.$id !== message_id));
  };

  return (
    <main className="container max-w-screen-sm mx-auto -mt-4 pb-8">
      <Header />

      <div className="room--container p-8 bg-slate-800 rounded-3xl shadow-slate-600/50 shadow-xl">
        <form
          action=""
          className="flex flex-col"
          id="message--form"
          onSubmit={handleSubmit}
        >
          <textarea
            className="bg-slate-700 mb-4 border-0 border-b-2 border-slate-500 rounded-lg w-full outline-0 p-4 h-32 resize-none shadow-slate-500/50 shadow-md transition ease-in-out duration-300 hover:bg-slate-600 focus:-translate-y-1 focus:bg-slate-600 focus:shadow-lg focus:shadow-slate-400/50 focus:text-white placeholder:text-slate-400"
            maxLength="1000"
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            placeholder={`Say something, ${user.name} ...`}
            required
            value={messageBody}
          ></textarea>
          <div className="send-btn--wrapper">
            <input
              className="btn btn--secondary mb-4 p-4 w-full rounded-lg cursor-pointer bg-gradient-to-b from-green-500 to-emerald-500 shadow-emerald-300/50 shadow-md font-bold uppercase transition ease-in-out duration-300 active:translate-y-1 active:from-green-600 active:to-emerald-600 active:shadow-sm active:shadow-emerald-400/50"
              type="submit"
              value="Send"
            />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div
              className="message--wrapper flex flex-wrap flex-col m-4"
              key={message.$id}
            >
              <div
                className={`message--header mb-1 flex items-center ${
                  message.$permissions.includes(`delete(\"user:${user.$id}\")`)
                    ? "justify-end"
                    : ""
                }`}
              >
                <div
                  className={`flex items-center ${
                    message.$permissions.includes(
                      `delete(\"user:${user.$id}\")`
                    )
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <span>
                    {message.username ? (
                      <span className="mx-2 text-slate-200 text-md">
                        {message.username}
                      </span>
                    ) : (
                      <span>Anonymous</span>
                    )}
                  </span>
                  <small className="message-timestamp mx-2 text-slate-400 text-xs">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </div>
                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`
                ) && (
                  <Trash2
                    className="delete--btn cursor-pointer -mr-6 text-slate-500 hover:text-slate-300 transition duration-150 ease-in-out"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>

              <div
                className={`message--body px-4 py-2 w-fit max-w-[80%] rounded-lg break-normal ${
                  message.$permissions.includes(`delete(\"user:${user.$id}\")`)
                    ? "message--body--owner self-end bg-gradient-to-b from-emerald-500 to-green-500 shadow-green-300/50 shadow-md"
                    : "bg-slate-500 shadow-slate-300/50 shadow-md"
                }`}
              >
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;

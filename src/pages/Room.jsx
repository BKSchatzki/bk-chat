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
            "databases.*.collections.*.documents.*.create",
          )
        ) {
          console.log("A MESSAGE WAS CREATED.");
          setMessages((prevState) => [response.payload, ...prevState]);
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete",
          )
        ) {
          console.log("A MESSAGE WAS DELETED.");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id),
          );
        }
      },
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
      payload,
    );
    // console.log('Created:', response);
    // setMessages(prevState => [response, ...prevState]);

    setMessageBody("");
  };

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [Query.orderDesc("$createdAt")],
    );
    // console.log('RESPONSE:', response);
    setMessages(response.documents);
  };

  const deleteMessage = async (message_id) => {
    const response = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      message_id,
    );
    // setMessages(prevState => prevState.filter(message => message.$id !== message_id));
  };

  return (
    <main className="container mx-auto -mt-4 max-w-screen-sm pb-8">
      <Header />

      <div className="room--container rounded-3xl bg-slate-800 p-8 shadow-xl shadow-slate-600/50">
        <form
          action=""
          className="flex flex-col"
          id="message--form"
          onSubmit={handleSubmit}
        >
          <textarea
            className="mb-4 h-32 w-full resize-none rounded-lg border-0 border-b-2 border-slate-500 bg-slate-700 p-4 shadow-md shadow-slate-500/50 outline-0 transition duration-300 ease-in-out placeholder:text-slate-400 hover:bg-slate-600 focus:-translate-y-1 focus:bg-slate-600 focus:text-white focus:shadow-lg focus:shadow-slate-400/50"
            maxLength="1000"
            onChange={(e) => {
              setMessageBody(e.target.value);
            }}
            placeholder={`Say something, ${user.name} ~`}
            required
            value={messageBody}
          ></textarea>
          <div className="send-btn--wrapper">
            <input
              className="btn btn--secondary mb-4 w-full cursor-pointer rounded-lg bg-emerald-600 p-4 font-bold uppercase shadow-md shadow-emerald-400/50 transition duration-300 ease-in-out hover:bg-emerald-500 hover:shadow-emerald-300/50 active:translate-y-1 active:bg-emerald-600 active:shadow-sm active:shadow-emerald-400/50"
              type="submit"
              value="Send"
            />
          </div>
        </form>

        <div>
          {messages.map((message) => (
            <div
              className="message--wrapper m-4 flex flex-col flex-wrap"
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
                  className={`flex cursor-default items-center ${
                    message.$permissions.includes(
                      `delete(\"user:${user.$id}\")`,
                    )
                      ? "flex-row-reverse"
                      : ""
                  }`}
                >
                  <span>
                    {message.username ? (
                      <span className="text-md mx-2 text-slate-200">
                        {message.username}
                      </span>
                    ) : (
                      <span>Anonymous</span>
                    )}
                  </span>
                  <small className="message-timestamp mx-2 text-xs text-slate-400">
                    {new Date(message.$createdAt).toLocaleString()}
                  </small>
                </div>
                {message.$permissions.includes(
                  `delete(\"user:${user.$id}\")`,
                ) && (
                  <Trash2
                    className="delete--btn -mr-6 cursor-pointer text-slate-500 transition duration-150 ease-in-out hover:text-slate-300"
                    onClick={() => {
                      deleteMessage(message.$id);
                    }}
                  />
                )}
              </div>

              <div
                className={`message--body w-fit max-w-[80%] cursor-default break-words rounded-lg px-4 py-2 ${
                  message.$permissions.includes(`delete(\"user:${user.$id}\")`)
                    ? "message--body--owner self-end bg-emerald-500 shadow-md shadow-emerald-300/50 transition duration-300 ease-in-out hover:bg-emerald-400 hover:shadow-emerald-300/50"
                    : "bg-slate-600 shadow-md shadow-slate-400/50 transition duration-300 ease-in-out hover:bg-slate-500 hover:shadow-slate-300/50"
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

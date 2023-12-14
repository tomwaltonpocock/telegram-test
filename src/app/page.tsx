"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OpenAI from 'openai';

import MessageCard from './stateless/messagecard';
import TimeAndWelcome from './stateless/timeandwelcome';
import Spinner from './widgets/spinner';
import ToDo from './todo';

import todoitems from './todo.json';

export default function Home() {
  const [latestMessages, setLatestMessages] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80');
  const [name, setName] = useState('Tom');
  const [outboundMessage, setOutboundMessage] = useState('');
  const [items, setItems] = useState(todoitems);

  /* send message to Telegram API */

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      await fetch('https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TGM_API_ID}/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '@tompocock',
          text: outboundMessage,
        }),
      });
  
      setOutboundMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  /* fetch messages from Telegram API */

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TGM_API_ID}/getUpdates`);
        const messages = response.data.result;
        // console.log("Messages are", messages);

        if (messages != null && messages.length > 1 ) {
          setLatestMessages(messages.reverse());
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 600000);

    return () => clearInterval(interval);

  }, []);

  /* update background image */
// intention to include random images later via API, now just hardcode

//   useEffect(() => {
//   fetch('https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}')
//     .then(response => response.json())
//     .then(data => {
//       const imageUrl = data.urls.small;
//       setBackgroundImage(`url(${imageUrl})`);
//     })
//     .catch(error => console.error(error));
// }, []);

/* delay update of date and time until component has mounted to avoid error between server rendering time and clienside rendering time */

  return (
    <main style={{ backgroundImage: `linear-gradient(rgba(238, 238, 228, 0.8), rgba(94, 155, 219, 0.8)), url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <div className="h-screen">
        <div className="flex h-full">
          <div className="w-1/4 p-8 relative bg-white bg-opacity-30 min-w-[300px] max-w-[450px]">
            <img src="/hypercompany_logo_textonly_colour.svg" alt="Hypercompany Logo" className="mb-8" />
            <div className="flex">
              <p><img src="/telegram.svg" alt="Telegram Logo" className="mb-8" height="20px" width="20px"/></p>
              <p>Telegram feed</p>
            </div>
            {
              latestMessages != null ?
                latestMessages.map((message, index) => {
                  console.log("Message at index", index, "is", message);
                  return <MessageCard key={index} message={message}/>;
                })
                : <Spinner />
            }
            <div className="send-box absolute bottom-0 left-0 right-0 bg-white p-4">
              <form onSubmit={sendMessage}>
                <input type="text" value={outboundMessage} onChange={(e) => setOutboundMessage(e.target.value)} className="form-control mr-2" aria-label="message…" placeholder="Write message…"/>
                <button type="submit" className="flex items-center justify-center transition duration-200 hover:bg-blue-500">
                  <span className="mr-2"><img src="/telegram-icon.svg" alt="Telegram Logo" height="15px" width="15px" className="min-w-[15px]"/></span>
                  <span>Send</span>
                </button>
              </form>
            </div>
          </div>
          <div className="w-1/2">
            <TimeAndWelcome name={name}/>
          </div>
          <div className="w-1/4 min-w-[400px] ml-auto">
            <ToDo/>
          </div>
        </div>
      </div>
    </main>
  );
}
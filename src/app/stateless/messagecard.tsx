import React from 'react';

export default function MessageCard({ message }) {
    let dateString = "Date not available";
    if (message) {
      const date = new Date(message.message.date *1000);
      dateString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return (
        <div className="border p-1 rounded-md shadow-sm space-y-2 bg-white opacity-5ß0 mb-2 fadeInUp">
            <p className="flex justify-between text-xs px-1 pt-§">{message.message.text}</p>
            <div className="flex justify-between px-1 py-0">
                <p className="text-xs font-semibold">{message.message.from.first_name + ' ' + message.message.from.last_name}</p>
                <p className="text-xs text-gray-500">{dateString}</p>
            </div>
        </div>
      );
    } else {
      return (
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      );
    }
  }
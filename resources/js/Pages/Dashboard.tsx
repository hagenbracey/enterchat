import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import echo from '@/echo';

interface Message {
  user: string;
  text: string;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Listen for messages
    echo.channel('chat')
      .listen('.MessageSent', (e: any) => {
        setMessages((prev) => [...prev, { user: e.user, text: e.message }]);
      });

    return () => echo.disconnect();
  }, []);

  const handleSendMessage = async () => {
    if (input.trim()) {
      try {
        const response = await fetch('/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });
        const data = await response.json();
        setMessages((prev) => [...prev, { user: data.user, text: data.message }]);
        setInput('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm sm:rounded-lg p-6">
            <h3 className="mb-4">Chat Room</h3>
            <div className="h-80 overflow-y-auto border p-4 mb-4">
              {messages.map((msg, index) => (
                <div key={index}>
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

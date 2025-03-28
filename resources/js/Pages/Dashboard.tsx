import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to WebSocket server
const socket = io('http://localhost:3001');

export default function Dashboard({ auth }: { auth: any }) {
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.emit('message', { sender: auth.user.name, text: message });
            setMessage('');
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>

                    {/* Chat Box */}
                    <div className="mt-6 bg-white p-4 shadow-md rounded-lg dark:bg-gray-900">
                        <h3 className="text-lg font-semibold mb-4">Live Chat</h3>
                        <div className="h-64 overflow-y-auto border p-3 rounded bg-gray-100 dark:bg-gray-700">
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-2">
                                    <span className="font-bold text-blue-500">{msg.sender}:</span>
                                    <span className="text-gray-800 dark:text-gray-100"> {msg.text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex">
                            <input
                                type="text"
                                className="flex-1 p-2 border rounded-l dark:bg-gray-800 dark:text-white"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

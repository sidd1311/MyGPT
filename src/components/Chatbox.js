// 'use client';

// import { useState } from 'react';

// const Chatbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (input.trim()) {
//       const newMessage = { user: 'You', text: input };
//       setMessages([...messages, newMessage]);

//       try {
//         const response = await fetch('/api/lemme-build', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ message: input }),
//         });
//         console.log(response)
//         const data = await response.json();


//         console.log('API Response:', data);  // <-- Log the API response

//         setMessages((prev) => [...prev, { user: 'Claude', text: data.reply }]);
//       } catch (error) {
//         console.error('Error fetching API:', error);
//         setMessages((prev) => [...prev, { user: 'Claude', text: 'Error: Failed to get response' }]);
//       }

//       setInput('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       <div className="flex-grow p-6 overflow-y-auto">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`p-4 m-2 rounded-lg ${msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
//               {msg.text}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="p-4 bg-white flex">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="flex-grow p-2 border rounded-lg focus:outline-none"
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chatbox;

'use client';

import { useState, useEffect, useRef } from 'react';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef(null); // Reference for scrolling to the end

  const sendMessage = async () => {
    if (input.trim()) {
      const newMessage = { user: 'You', text: input };
      setMessages((prev) => [...prev, newMessage]);

      try {
        const response = await fetch('/api/lemme-build', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: input }),
        });

        const data = await response.json();
        console.log('API Response:', data);

        setMessages((prev) => [...prev, { user: 'Claude', text: data.reply }]);
      } catch (error) {
        console.error('Error fetching API:', error);
        setMessages((prev) => [...prev, { user: 'Claude', text: 'Error: Failed to get response' }]);
      }

      setInput('');
    }
  };

  // Scroll to the bottom of the chat whenever messages change
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex-grow p-6 ">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.user === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-4 m-2 rounded-lg ${msg.user === 'You' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {/* Invisible div to scroll to */}

      

      <div className="p-4 bg-white flex">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:outline-none shadow-md"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Send
        </button>
      </div>
        </div>
        </div>
  );
};

export default Chatbox;

import Chatbox from '@/components/Chatbox';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-10">
        <h1 className="text-3xl text-center mb-6 font-bold">Sherrrr.AI</h1>
        <Chatbox />
      </main>
    </div>
  );
}

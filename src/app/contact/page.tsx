import Header from '@/components/Header';

export default function Contact() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 mb-8">We'd love to hear from you!</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-6">
              Whether you're interested in contributing to our blog, exploring partnerships, 
              or have any questions, reach out to us at:
            </p>
            <a 
              href="mailto:blog@witehatz.com" 
              className="text-xl font-semibold text-blue-600 hover:text-blue-700"
            >
              blog@witehatz.com
            </a>
          </div>
        </div>
      </main>
    </>
  );
} 
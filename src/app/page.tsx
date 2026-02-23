import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-white bg-opacity-10 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              {/* Note: Font Awesome icons require setup */}
              <span className="text-3xl text-white mr-3">🏫</span>
              <span className="text-white font-bold text-xl">Opel Foundation School</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/login" className="text-white hover:bg-white hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-all">
                Login
              </Link>
              <Link href="/auth/register" className="bg-white text-purple-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition-all">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Welcome to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">
              Opel Foundation School
            </span>
          </h1>
          <p className="text-xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Muhallah Muazim Shah, Chiniot - Providing Quality Education Since 2010
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link href="/auth/register" className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-8 py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-pink-600 transform hover:scale-105 transition-all">
              Enroll Now
            </Link>
            <Link href="/about" className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all">
              Learn More
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <span className="text-4xl text-yellow-400 mb-4 block">💻</span>
            <h3 className="text-xl font-bold mb-2">Smart Learning</h3>
            <p className="text-gray-300">Modern digital classrooms with interactive learning tools</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <span className="text-4xl text-green-400 mb-4 block">🧪</span>
            <h3 className="text-xl font-bold mb-2">Science Labs</h3>
            <p className="text-gray-300">Fully equipped laboratories for practical learning</p>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white">
            <span className="text-4xl text-blue-400 mb-4 block">⚽</span>
            <h3 className="text-xl font-bold mb-2">Sports Complex</h3>
            <p className="text-gray-300">Multiple sports facilities for physical development</p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white bg-opacity-10 backdrop-blur-lg rounded-full px-6 py-3">
            <span className="text-yellow-400 mr-2">📍</span>
            <span className="text-white">Muhallah Muazim Shah, Chiniot - Punjab, Pakistan</span>
          </div>
        </div>
      </main>
    </div>
  )
}
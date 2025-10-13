export default function About() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl bg-white rounded-xl shadow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">work</h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to our website! We’re passionate about crafting clean, modern, and 
          responsive web experiences using <span className="font-semibold">Next.js</span> and 
          <span className="font-semibold"> Tailwind CSS</span>.
        </p>
        <p className="text-gray-600 mt-4">
          This boilerplate is designed to help developers start faster with a solid and 
          stable foundation. Modify it, expand it, and make it your own!
        </p>
      </div>
    </main>
  )
}

function TeacherLayout() {
  return (
    <header className="bg-purple-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <span className="text-2xl font-bold">A+</span>
        <h1 className="ml-2 text-xl">Online Exam</h1>
      </div>
      <div className="flex space-x-4">
        <a href="#" className="hover:underline">LỚP HỌC</a>
        <a href="#" className="hover:underline">MÔN HỌC</a>
        <a href="#" className="hover:underline">KỲ THI</a>
      </div>
      <div className="flex space-x-4">
        <button className="focus:outline-none">
          <span className="text-xl">@</span>
        </button>
        <button className="focus:outline-none">
          <span className="text-xl">🔔</span>
        </button>
      </div>
    </header>
  );

}

export default TeacherLayout
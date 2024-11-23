

const LogInComponent = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
            placeholder="Enter your password"
          />
        </div>
        <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          Sign In
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Forgot your password?{" "}
          <a
            href="/auth/reset-password"
            className="text-purple-600 hover:underline"
          >
            Reset it here
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogInComponent;

'use client';
import { useState, FormEvent } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    await login(employeeId);
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Employee Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="employeeId" className="block text-gray-700 mb-2">
              Employee ID
            </label>
            <input
              type="text"
              id="employeeId"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your employee ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
} 
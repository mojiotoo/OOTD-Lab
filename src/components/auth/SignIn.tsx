import React, { useState } from 'react';
import { loginUser } from '../../utils/storage';

interface SignInProps {
  onBack: () => void;
  onSwitchToSignUp: () => void;
  onLoginSuccess: (user: { id: string; name: string; email: string; password: string; createdAt: string }) => void;
}

export default function SignIn({ onBack, onSwitchToSignUp, onLoginSuccess }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const user = loginUser(trimmedEmail, password);

    if (!user) {
      alert('Email atau kata sandi salah. Silakan cek akun yang sudah terdaftar.');
      return;
    }

    alert(`Login berhasil! Selamat datang, ${user.name}.`);
    onLoginSuccess(user);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-between font-sans text-neutral-800">
      {/* Header Sederhana */}
      <header className="p-6 md:px-12 flex justify-between items-center">
        <h1 className="text-2xl font-serif tracking-wide italic font-bold">OOTD Lab.</h1>
        <button type="button" onClick={onBack} className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
          Kembali ke Beranda
        </button>
      </header>

      {/* Konten Utama Form Login */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#EBE7DF]">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-medium tracking-tight text-neutral-900">Selamat Datang Kembali</h2>
            <p className="text-sm text-neutral-500 mt-2">Masuk untuk mengelola koleksi lemari dan AI try-on Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  Kata Sandi
                </label>
                <a href="#forgot" className="text-xs text-[#1B4D3E] hover:underline">
                  Lupa sandi?
                </a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#FDFBF7] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4D3E] focus:border-transparent transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#1B4D3E] text-white rounded-xl font-medium text-sm hover:bg-[#143A2E] shadow-sm transition-all"
            >
              Masuk
            </button>
          </form>

          {/* Garis Pembatas */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-neutral-400 font-medium">Atau lanjutkan dengan</span>
            </div>
          </div>

          {/* Tombol OAuth Google (Opsional) */}
          <button
            type="button"
            className="w-full py-3 px-4 border border-neutral-200 rounded-xl text-sm font-medium text-neutral-700 bg-white hover:bg-neutral-50 flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </button>

          <p className="text-center text-sm text-neutral-500 mt-6">
            Belum punya akun?{' '}
            <button type="button" onClick={onSwitchToSignUp} className="text-[#1B4D3E] font-semibold hover:underline">
              Daftar sekarang
            </button>
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-neutral-400">
        &copy; 2026 OOTD Lab. All rights reserved.
      </footer>
    </div>
  );
}
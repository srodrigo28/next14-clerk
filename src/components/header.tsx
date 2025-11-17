"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Header() {
  const { user, isLoaded } = useUser();

  // Enquanto o Clerk carrega o usuário
  if (!isLoaded) {
    return (
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex justify-end items-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-slate-950 shadow-md backdrop-blur-xl border-b border-white/10">
      <div className="px-3 mx-auto py-10 flex justify-end items-center gap-6">

        {/* =============== USUÁRIO NÃO LOGADO =============== */}
        <SignedOut>
          <div className="flex gap-3">
            <SignInButton mode="modal">
              <button className="px-5 py-1.5  hover:bg-indigo-700 border-b-2 border-indigo-400 text-white rounded-xl font-medium transition">
                Entrar
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-5 py-1.5  hover:bg-indigo-700 border-b-2 border-indigo-400 text-white rounded-xl font-medium transition">
                Cadastrar
              </button>
            </SignUpButton>
          </div>
        </SignedOut>

        {/* =============== USUÁRIO LOGADO =============== */}
        <SignedIn>
          <div className="flex items-center gap-4">

            {/* =============== AVATAR COM FALLBACK INTELIGENTE =============== */}
            <div className="flex items-center gap-4">
              {user?.imageUrl ? (
                // Se tiver foto → mostra a imagem real
                <img
                  src={user.imageUrl}
                  alt={user.fullName || "Usuário"}
                  className="w-12 hidden h-12 rounded-full object-cover ring-2 ring-indigo-500/50 shadow-lg"
                />
              ) : (
                // Se NÃO tiver foto → avatar com iniciais (ex: João Silva → JS)
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-indigo-500/50">
                    {user?.firstName?.[0] || "U"}
                    {user?.lastName?.[0] || ""}
                  </div>
                </div>
              )}

              {/* =============== NOME + EMAIL (esconde em telas pequenas) =============== */}
              <div className="text-left hidden md:block">
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white font-semibold text-lg leading-tight"
                >
                  {user?.fullName || "Usuário"}
                </motion.p>
                <p className="text-gray-400 text-sm">
                  {user?.primaryEmailAddress?.emailAddress || "email@exemplo.com"}
                </p>
              </div>
            </div>

            {/* =============== BOTÃO DE LOGOUT DO CLERK =============== */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-11 h-11 ring-2 ring-purple-500/50 hover:ring-purple-400 transition-all",
                },
              }}
            />
          </div>
        </SignedIn>
      </div>
    </header>
  );
}
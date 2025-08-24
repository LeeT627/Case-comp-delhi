import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/shared/Logo'
import Link from 'next/link'
import { FileUp, Home, LogOut, User, Trophy, Settings } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <Logo className="text-white" showText={false} />
          <h2 className="mt-2 text-lg font-semibold">GPAI Competition</h2>
          <p className="text-sm text-gray-400 mt-1">Delhi 2024</p>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors">
                <FileUp className="h-5 w-5" />
                <span>Submit Files</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard#submissions" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Trophy className="h-5 w-5" />
                <span>My Submissions</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard#profile" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <User className="h-5 w-5" />
                <span>Team Profile</span>
              </Link>
            </li>
            <li>
              <Link href="/dashboard#settings" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <div className="px-4 py-2 mb-3">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="text-sm font-medium truncate">{user.email}</p>
          </div>
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
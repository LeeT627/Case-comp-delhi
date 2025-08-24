'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage('Check your email for a password reset link')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-light text-gray-900 mb-8">GPAI Case Competition</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-medium text-gray-900 mb-2">Reset your password</h2>
          <p className="text-gray-600 text-sm mb-6">
            Enter your email address and we&apos;ll send you a link to reset your password
          </p>
          
          <form onSubmit={handleResetPassword} className="space-y-5">
            {message && (
              <div className="rounded-lg p-3 text-sm text-green-700 bg-green-50 border border-green-200">
                {message}
              </div>
            )}
            {error && (
              <div className="rounded-lg p-3 text-sm text-red-700 bg-red-50 border border-red-200">
                {error}
              </div>
            )}
            
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading || !!message}
                className="w-full h-12 px-4 text-base border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors" 
              disabled={loading || !!message}
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>
            
            <div className="text-center pt-4 text-sm">
              <span className="text-gray-600">Remember your password? </span>
              <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 transition-colors">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
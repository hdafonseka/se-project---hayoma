"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { toast } from "sonner"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      toast.error("Please enter both username and password")
      return
    }

    setIsLoading(true)

    try {
      const success = await login(username, password)

      if (!success) {
        toast.error("Invalid username or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during login")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50/30 dark:bg-gray-900/20 p-4">
      <Card className="w-full max-w-md border-blue-100 dark:border-gray-700">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Login to Hayoma Dairy</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">Demo Accounts:</p>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-left p-2 bg-blue-50 dark:bg-gray-800 rounded">
                <p>
                  <strong>Admin:</strong> admin
                </p>
                <p>
                  <strong>Password:</strong> password
                </p>
              </div>
              <div className="text-left p-2 bg-blue-50 dark:bg-gray-800 rounded">
                <p>
                  <strong>Shop:</strong> shop
                </p>
                <p>
                  <strong>Password:</strong> password
                </p>
              </div>
              <div className="text-left p-2 bg-blue-50 dark:bg-gray-800 rounded">
                <p>
                  <strong>Supplier:</strong> supplier
                </p>
                <p>
                  <strong>Password:</strong> password
                </p>
              </div>
              <div className="text-left p-2 bg-blue-50 dark:bg-gray-800 rounded">
                <p>
                  <strong>Driver:</strong> driver
                </p>
                <p>
                  <strong>Password:</strong> password
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

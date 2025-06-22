import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, BookOpen, CreditCard } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Computer Engineering Department</h1>
          <p className="text-xl text-gray-600 mb-8">Management System</p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Register
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Student Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage student personal information, enrollment, and academic records</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CreditCard className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <CardTitle>Fee Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Track student fee payments and outstanding balances</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>Course Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Manage course enrollment and lecturer assignments</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <GraduationCap className="h-12 w-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>Academic Records</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>View comprehensive academic and financial reports</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>About the System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This comprehensive management system handles student information, fee payments, course enrollment, and
                lecturer assignments for the Computer Engineering Department. Built with Next.js 14 and PostgreSQL for
                reliable and efficient data management.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, BookOpen, LogOut, DollarSign, Users, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Student {
  student_id: number
  student_number: string
  full_name: string
  email: string
  phone: string
  year_level: number
  date_of_birth: string
  address: string
}

interface OutstandingFee {
  student_id: number
  student_number: string
  full_name: string
  email: string
  year_level: number
  required_fee: number
  total_paid: number
  outstanding_amount: number
  payment_status: string
}

interface Course {
  course_id: number
  course_code: string
  course_name: string
  credits: number
  semester: string
  year_level: number
}

interface Payment {
  payment_id: number
  amount: number
  payment_date: string
  payment_method: string
  reference_number: string
  description: string
  status: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<Student | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [outstandingFees, setOutstandingFees] = useState<OutstandingFee[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      fetchDashboardData()
    } catch (error) {
      router.push("/login")
    }
  }, [router])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)

      // Fetch all dashboard data
      const [studentsRes, feesRes, coursesRes, paymentsRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/outstanding-fees"),
        fetch("/api/courses"),
        fetch("/api/payments"),
      ])

      if (studentsRes.ok) {
        const studentsData = await studentsRes.json()
        setStudents(studentsData)
      }

      if (feesRes.ok) {
        const feesData = await feesRes.json()
        setOutstandingFees(feesData)
      }

      if (coursesRes.ok) {
        const coursesData = await coursesRes.json()
        setCourses(coursesData)
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json()
        setPayments(paymentsData)
      }
    } catch (error) {
      setError("Failed to fetch dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "FULLY_PAID":
        return (
          <Badge variant="default" className="bg-green-500">
            Fully Paid
          </Badge>
        )
      case "PARTIALLY_PAID":
        return <Badge variant="secondary">Partially Paid</Badge>
      case "NOT_PAID":
        return <Badge variant="destructive">Not Paid</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">CE Department Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.full_name || "Student"}</p>
            </div>
            <div className="flex gap-2">
              <Link href="/dashboard/enrollments">
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Enrollments
                </Button>
              </Link>
              <Link href="/dashboard/assignments">
                <Button variant="outline">
                  <Users className="h-4 w-4 mr-2" />
                  Assignments
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students.length}</div>
              <p className="text-xs text-muted-foreground">Registered students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Active courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Outstanding Fees</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{outstandingFees.filter((f) => f.outstanding_amount > 0).length}</div>
              <p className="text-xs text-muted-foreground">Students with outstanding fees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{payments.length}</div>
              <p className="text-xs text-muted-foreground">Payment transactions</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="fees">Outstanding Fees</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>
                  Complete list of registered students in the Computer Engineering Department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Number</TableHead>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Year Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.student_id}>
                        <TableCell className="font-medium">{student.student_number}</TableCell>
                        <TableCell>{student.full_name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Year {student.year_level}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fees">
            <Card>
              <CardHeader>
                <CardTitle>Outstanding Fees Report</CardTitle>
                <CardDescription>Student fee payment status and outstanding amounts</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Year Level</TableHead>
                      <TableHead>Required Fee</TableHead>
                      <TableHead>Paid Amount</TableHead>
                      <TableHead>Outstanding</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outstandingFees.map((fee) => (
                      <TableRow key={fee.student_id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{fee.full_name}</div>
                            <div className="text-sm text-gray-500">{fee.student_number}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">Year {fee.year_level}</Badge>
                        </TableCell>
                        <TableCell>GH₵ {fee.required_fee.toFixed(2)}</TableCell>
                        <TableCell>GH₵ {fee.total_paid.toFixed(2)}</TableCell>
                        <TableCell>
                          <span className={fee.outstanding_amount > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                            GH₵ {fee.outstanding_amount.toFixed(2)}
                          </span>
                        </TableCell>
                        <TableCell>{getPaymentStatusBadge(fee.payment_status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>Available Courses</CardTitle>
                <CardDescription>Computer Engineering Department course catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course Code</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Year Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.course_id}>
                        <TableCell className="font-medium">{course.course_code}</TableCell>
                        <TableCell>{course.course_name}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>{course.semester}</TableCell>
                        <TableCell>
                          <Badge variant="outline">Year {course.year_level}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Payment transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.payment_id}>
                        <TableCell className="font-medium">{payment.reference_number}</TableCell>
                        <TableCell>GH₵ {payment.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{payment.payment_method.replace("_", " ")}</Badge>
                        </TableCell>
                        <TableCell>{new Date(payment.payment_date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={payment.status === "COMPLETED" ? "default" : "secondary"}
                            className={payment.status === "COMPLETED" ? "bg-green-500" : ""}
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

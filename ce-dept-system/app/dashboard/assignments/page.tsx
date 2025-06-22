"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Users, GraduationCap, UserCheck } from "lucide-react"

interface Lecturer {
  lecturer_id: number
  full_name: string
  email: string
  position: string
}

interface Course {
  course_id: number
  course_code: string
  course_name: string
  credits: number
  year_level: number
}

interface TA {
  ta_id: number
  ta_name: string
  ta_email: string
  student_id: number
}

interface LecturerAssignment {
  assignment_id: number
  lecturer_id: number
  lecturer_name: string
  lecturer_email: string
  course_id: number
  course_code: string
  course_name: string
  academic_year: string
  semester: string
  role: string
}

interface TAAssignment {
  assignment_id: number
  ta_id: number
  ta_name: string
  ta_email: string
  course_id: number
  course_code: string
  course_name: string
  lecturer_name: string
  academic_year: string
  semester: string
  hours_per_week: number
}

export default function AssignmentsPage() {
  const [lecturerAssignments, setLecturerAssignments] = useState<LecturerAssignment[]>([])
  const [taAssignments, setTAAssignments] = useState<TAAssignment[]>([])
  const [lecturers, setLecturers] = useState<Lecturer[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [tas, setTAs] = useState<TA[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Form states for lecturer assignment
  const [selectedLecturer, setSelectedLecturer] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedRole, setSelectedRole] = useState("PRIMARY")
  const [selectedSemester, setSelectedSemester] = useState("First")
  const [isAssigningLecturer, setIsAssigningLecturer] = useState(false)
  const [lecturerDialogOpen, setLecturerDialogOpen] = useState(false)

  // Form states for TA assignment
  const [selectedTA, setSelectedTA] = useState("")
  const [selectedTACourse, setSelectedTACourse] = useState("")
  const [selectedTALecturer, setSelectedTALecturer] = useState("")
  const [selectedTASemester, setSelectedTASemester] = useState("First")
  const [hoursPerWeek, setHoursPerWeek] = useState("10")
  const [isAssigningTA, setIsAssigningTA] = useState(false)
  const [taDialogOpen, setTADialogOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [lecturerAssignmentsRes, taAssignmentsRes, lecturersRes, coursesRes, tasRes] = await Promise.all([
        fetch("/api/lecturer-assignments"),
        fetch("/api/ta-assignments"),
        fetch("/api/lecturers"),
        fetch("/api/courses"),
        fetch("/api/tas"),
      ])

      if (lecturerAssignmentsRes.ok) {
        const data = await lecturerAssignmentsRes.json()
        setLecturerAssignments(data)
      }

      if (taAssignmentsRes.ok) {
        const data = await taAssignmentsRes.json()
        setTAAssignments(data)
      }

      if (lecturersRes.ok) {
        const data = await lecturersRes.json()
        setLecturers(data)
      }

      if (coursesRes.ok) {
        const data = await coursesRes.json()
        setCourses(data)
      }

      if (tasRes.ok) {
        const data = await tasRes.json()
        setTAs(data)
      }
    } catch (error) {
      setError("Failed to fetch data")
    } finally {
      setLoading(false)
    }
  }

  const handleAssignLecturer = async () => {
    if (!selectedLecturer || !selectedCourse) {
      setError("Please select both lecturer and course")
      return
    }

    setIsAssigningLecturer(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/lecturer-assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lecturerId: Number.parseInt(selectedLecturer),
          courseId: Number.parseInt(selectedCourse),
          semester: selectedSemester,
          role: selectedRole,
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess("Lecturer assigned successfully!")
        setSelectedLecturer("")
        setSelectedCourse("")
        setLecturerDialogOpen(false)
        fetchData()
      } else {
        setError(data.message || "Failed to assign lecturer")
      }
    } catch (error) {
      setError("An error occurred while assigning lecturer")
    } finally {
      setIsAssigningLecturer(false)
    }
  }

  const handleAssignTA = async () => {
    if (!selectedTA || !selectedTACourse || !selectedTALecturer) {
      setError("Please select TA, course, and supervising lecturer")
      return
    }

    setIsAssigningTA(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/ta-assignments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taId: Number.parseInt(selectedTA),
          courseId: Number.parseInt(selectedTACourse),
          lecturerId: Number.parseInt(selectedTALecturer),
          semester: selectedTASemester,
          hoursPerWeek: Number.parseInt(hoursPerWeek),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSuccess("TA assigned successfully!")
        setSelectedTA("")
        setSelectedTACourse("")
        setSelectedTALecturer("")
        setTADialogOpen(false)
        fetchData()
      } else {
        setError(data.message || "Failed to assign TA")
      }
    } catch (error) {
      setError("An error occurred while assigning TA")
    } finally {
      setIsAssigningTA(false)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "PRIMARY":
        return <Badge variant="default">Primary</Badge>
      case "SECONDARY":
        return <Badge variant="secondary">Secondary</Badge>
      case "GUEST":
        return <Badge variant="outline">Guest</Badge>
      default:
        return <Badge variant="outline">{role}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assignments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Assignments</h1>
            <p className="text-gray-600">Manage lecturer and TA assignments to courses</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lecturer Assignments</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lecturerAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Active assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">TA Assignments</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{taAssignments.length}</div>
              <p className="text-xs text-muted-foreground">Active TA assignments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lecturers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lecturers.length}</div>
              <p className="text-xs text-muted-foreground">Available lecturers</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="lecturers" className="space-y-4">
          <TabsList>
            <TabsTrigger value="lecturers">Lecturer Assignments</TabsTrigger>
            <TabsTrigger value="tas">TA Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="lecturers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Lecturer Course Assignments</CardTitle>
                    <CardDescription>Manage lecturer assignments to courses</CardDescription>
                  </div>

                  <Dialog open={lecturerDialogOpen} onOpenChange={setLecturerDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Assign Lecturer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Lecturer to Course</DialogTitle>
                        <DialogDescription>Select a lecturer and course to create a new assignment.</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {error && (
                          <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert>
                            <AlertDescription>{success}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label>Lecturer</Label>
                          <Select value={selectedLecturer} onValueChange={setSelectedLecturer}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a lecturer" />
                            </SelectTrigger>
                            <SelectContent>
                              {lecturers.map((lecturer) => (
                                <SelectItem key={lecturer.lecturer_id} value={lecturer.lecturer_id.toString()}>
                                  {lecturer.full_name} - {lecturer.position}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Course</Label>
                          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.course_id} value={course.course_id.toString()}>
                                  {course.course_code} - {course.course_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Role</Label>
                          <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PRIMARY">Primary Lecturer</SelectItem>
                              <SelectItem value="SECONDARY">Secondary Lecturer</SelectItem>
                              <SelectItem value="GUEST">Guest Lecturer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Semester</Label>
                          <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="First">First Semester</SelectItem>
                              <SelectItem value="Second">Second Semester</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setLecturerDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAssignLecturer} disabled={isAssigningLecturer}>
                            {isAssigningLecturer ? "Assigning..." : "Assign Lecturer"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lecturer</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Academic Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lecturerAssignments.map((assignment) => (
                      <TableRow key={assignment.assignment_id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.lecturer_name}</div>
                            <div className="text-sm text-gray-500">{assignment.lecturer_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.course_code}</div>
                            <div className="text-sm text-gray-500">{assignment.course_name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(assignment.role)}</TableCell>
                        <TableCell>{assignment.semester}</TableCell>
                        <TableCell>{assignment.academic_year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tas">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Teaching Assistant Assignments</CardTitle>
                    <CardDescription>Manage TA assignments to courses</CardDescription>
                  </div>

                  <Dialog open={taDialogOpen} onOpenChange={setTADialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Assign TA
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign TA to Course</DialogTitle>
                        <DialogDescription>Select a TA, course, and supervising lecturer.</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-4">
                        {error && (
                          <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert>
                            <AlertDescription>{success}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label>Teaching Assistant</Label>
                          <Select value={selectedTA} onValueChange={setSelectedTA}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a TA" />
                            </SelectTrigger>
                            <SelectContent>
                              {tas.map((ta) => (
                                <SelectItem key={ta.ta_id} value={ta.ta_id.toString()}>
                                  {ta.ta_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Course</Label>
                          <Select value={selectedTACourse} onValueChange={setSelectedTACourse}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.course_id} value={course.course_id.toString()}>
                                  {course.course_code} - {course.course_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Supervising Lecturer</Label>
                          <Select value={selectedTALecturer} onValueChange={setSelectedTALecturer}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supervising lecturer" />
                            </SelectTrigger>
                            <SelectContent>
                              {lecturers.map((lecturer) => (
                                <SelectItem key={lecturer.lecturer_id} value={lecturer.lecturer_id.toString()}>
                                  {lecturer.full_name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Hours per Week</Label>
                          <Input
                            type="number"
                            value={hoursPerWeek}
                            onChange={(e) => setHoursPerWeek(e.target.value)}
                            min="1"
                            max="20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Semester</Label>
                          <Select value={selectedTASemester} onValueChange={setSelectedTASemester}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="First">First Semester</SelectItem>
                              <SelectItem value="Second">Second Semester</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setTADialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAssignTA} disabled={isAssigningTA}>
                            {isAssigningTA ? "Assigning..." : "Assign TA"}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Teaching Assistant</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Supervising Lecturer</TableHead>
                      <TableHead>Hours/Week</TableHead>
                      <TableHead>Semester</TableHead>
                      <TableHead>Academic Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taAssignments.map((assignment) => (
                      <TableRow key={assignment.assignment_id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.ta_name}</div>
                            <div className="text-sm text-gray-500">{assignment.ta_email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{assignment.course_code}</div>
                            <div className="text-sm text-gray-500">{assignment.course_name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{assignment.lecturer_name}</TableCell>
                        <TableCell>{assignment.hours_per_week}</TableCell>
                        <TableCell>{assignment.semester}</TableCell>
                        <TableCell>{assignment.academic_year}</TableCell>
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

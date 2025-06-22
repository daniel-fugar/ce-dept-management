import { type NextRequest, NextResponse } from "next/server"

// Mock enrollment data - in production, this would come from PostgreSQL
const mockEnrollments = [
  {
    enrollment_id: 1,
    student_id: 1,
    student_name: "Abdallah Abdul-Haleem",
    student_number: "CE2021001",
    year_level: 3,
    course_id: 5,
    course_code: "CE301",
    course_name: "Database Systems",
    credits: 3,
    academic_year: "2023-2024",
    semester: "First",
    status: "ACTIVE",
    enrollment_date: "2023-09-01T00:00:00Z",
  },
  {
    enrollment_id: 2,
    student_id: 1,
    student_name: "Abdallah Abdul-Haleem",
    student_number: "CE2021001",
    year_level: 3,
    course_id: 6,
    course_code: "CE302",
    course_name: "Software Engineering",
    credits: 3,
    academic_year: "2023-2024",
    semester: "Second",
    status: "ACTIVE",
    enrollment_date: "2023-09-01T00:00:00Z",
  },
  {
    enrollment_id: 3,
    student_id: 2,
    student_name: "Adda Jefferson",
    student_number: "CE2022001",
    year_level: 2,
    course_id: 3,
    course_code: "CE201",
    course_name: "Data Structures and Algorithms",
    credits: 3,
    academic_year: "2023-2024",
    semester: "First",
    status: "ACTIVE",
    enrollment_date: "2023-09-01T00:00:00Z",
  },
  {
    enrollment_id: 4,
    student_id: 3,
    student_name: "Adu Damoah Herbert",
    student_number: "CE2023001",
    year_level: 1,
    course_id: 1,
    course_code: "CE101",
    course_name: "Introduction to Programming",
    credits: 3,
    academic_year: "2023-2024",
    semester: "First",
    status: "ACTIVE",
    enrollment_date: "2023-09-01T00:00:00Z",
  },
]

export async function GET() {
  try {
    // In production: SELECT * FROM academic.enrollment_summary ORDER BY student_number, course_code;
    return NextResponse.json(mockEnrollments)
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { studentId, courseId, semester } = await request.json()

    // In production: SELECT enroll_student_in_course($1, $2, '2023-2024', $3);
    // For demo, we'll simulate the enrollment
    const newEnrollment = {
      enrollment_id: mockEnrollments.length + 1,
      student_id: studentId,
      course_id: courseId,
      academic_year: "2023-2024",
      semester: semester,
      status: "ACTIVE",
      enrollment_date: new Date().toISOString(),
    }

    mockEnrollments.push(newEnrollment as any)

    return NextResponse.json({
      success: true,
      message: "Student enrolled successfully",
      enrollment: newEnrollment,
    })
  } catch (error) {
    console.error("Error enrolling student:", error)
    return NextResponse.json({ error: "Failed to enroll student" }, { status: 500 })
  }
}

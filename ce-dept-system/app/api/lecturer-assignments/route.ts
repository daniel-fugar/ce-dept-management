import { type NextRequest, NextResponse } from "next/server"

// Mock lecturer assignments data
const mockLecturerAssignments = [
  {
    assignment_id: 1,
    lecturer_id: 5,
    lecturer_name: "Mr. Yaw Oppong",
    lecturer_email: "y.oppong@university.edu.gh",
    course_id: 1,
    course_code: "CE101",
    course_name: "Introduction to Programming",
    academic_year: "2023-2024",
    semester: "First",
    role: "PRIMARY",
  },
  {
    assignment_id: 2,
    lecturer_id: 3,
    lecturer_name: "Dr. Kofi Boateng",
    lecturer_email: "k.boateng@university.edu.gh",
    course_id: 2,
    course_code: "CE102",
    course_name: "Digital Logic Design",
    academic_year: "2023-2024",
    semester: "First",
    role: "PRIMARY",
  },
  {
    assignment_id: 3,
    lecturer_id: 1,
    lecturer_name: "Dr. Kwame Asante",
    lecturer_email: "k.asante@university.edu.gh",
    course_id: 3,
    course_code: "CE201",
    course_name: "Data Structures and Algorithms",
    academic_year: "2023-2024",
    semester: "First",
    role: "PRIMARY",
  },
  {
    assignment_id: 4,
    lecturer_id: 2,
    lecturer_name: "Prof. Akosua Mensah",
    lecturer_email: "a.mensah@university.edu.gh",
    course_id: 4,
    course_code: "CE202",
    course_name: "Computer Architecture",
    academic_year: "2023-2024",
    semester: "Second",
    role: "PRIMARY",
  },
]

export async function GET() {
  try {
    // In production: SELECT * FROM academic.lecturer_assignment_summary ORDER BY course_code, lecturer_name;
    return NextResponse.json(mockLecturerAssignments)
  } catch (error) {
    console.error("Error fetching lecturer assignments:", error)
    return NextResponse.json({ error: "Failed to fetch lecturer assignments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { lecturerId, courseId, semester, role } = await request.json()

    // In production: SELECT assign_lecturer_to_course($1, $2, '2023-2024', $3, $4);
    const newAssignment = {
      assignment_id: mockLecturerAssignments.length + 1,
      lecturer_id: lecturerId,
      course_id: courseId,
      academic_year: "2023-2024",
      semester: semester,
      role: role,
      created_at: new Date().toISOString(),
    }

    mockLecturerAssignments.push(newAssignment as any)

    return NextResponse.json({
      success: true,
      message: "Lecturer assigned successfully",
      assignment: newAssignment,
    })
  } catch (error) {
    console.error("Error assigning lecturer:", error)
    return NextResponse.json({ error: "Failed to assign lecturer" }, { status: 500 })
  }
}

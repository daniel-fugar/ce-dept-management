import { type NextRequest, NextResponse } from "next/server"

// Mock TA assignments data
const mockTAAssignments = [
  {
    assignment_id: 1,
    ta_id: 3,
    ta_name: "Abdallah Abdul-Haleem",
    ta_email: "abdallah.haleem@example.com",
    course_id: 1,
    course_code: "CE101",
    course_name: "Introduction to Programming",
    lecturer_name: "Mr. Yaw Oppong",
    academic_year: "2023-2024",
    semester: "First",
    hours_per_week: 10,
  },
  {
    assignment_id: 2,
    ta_id: 4,
    ta_name: "Agnes Katherine Aboagye",
    ta_email: "agnes.aboagye@example.com",
    course_id: 2,
    course_code: "CE102",
    course_name: "Digital Logic Design",
    lecturer_name: "Dr. Kofi Boateng",
    academic_year: "2023-2024",
    semester: "First",
    hours_per_week: 10,
  },
  {
    assignment_id: 3,
    ta_id: 1,
    ta_name: "Aganyi Magdalene Sedudzi",
    ta_email: "aganyi.sedudzi@example.com",
    course_id: 3,
    course_code: "CE201",
    course_name: "Data Structures and Algorithms",
    lecturer_name: "Dr. Kwame Asante",
    academic_year: "2023-2024",
    semester: "First",
    hours_per_week: 12,
  },
]

export async function GET() {
  try {
    // In production: SELECT * FROM academic.ta_assignment_summary ORDER BY course_code, ta_name;
    return NextResponse.json(mockTAAssignments)
  } catch (error) {
    console.error("Error fetching TA assignments:", error)
    return NextResponse.json({ error: "Failed to fetch TA assignments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { taId, courseId, lecturerId, semester, hoursPerWeek } = await request.json()

    // In production: SELECT assign_ta_to_course($1, $2, $3, '2023-2024', $4, $5);
    const newAssignment = {
      assignment_id: mockTAAssignments.length + 1,
      ta_id: taId,
      course_id: courseId,
      lecturer_id: lecturerId,
      academic_year: "2023-2024",
      semester: semester,
      hours_per_week: hoursPerWeek,
      created_at: new Date().toISOString(),
    }

    mockTAAssignments.push(newAssignment as any)

    return NextResponse.json({
      success: true,
      message: "TA assigned successfully",
      assignment: newAssignment,
    })
  } catch (error) {
    console.error("Error assigning TA:", error)
    return NextResponse.json({ error: "Failed to assign TA" }, { status: 500 })
  }
}

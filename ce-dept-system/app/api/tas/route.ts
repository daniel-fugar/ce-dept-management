import { NextResponse } from "next/server"

// Mock TAs data
const mockTAs = [
  {
    ta_id: 1,
    ta_name: "Aganyi Magdalene Sedudzi",
    ta_email: "aganyi.sedudzi@example.com",
    student_id: 4,
    staff_number: "TA001",
    hourly_rate: 20.0,
  },
  {
    ta_id: 2,
    ta_name: "Emmanuel Mozu-Simpson",
    ta_email: "emmanuel.simpson@example.com",
    student_id: 9,
    staff_number: "TA002",
    hourly_rate: 20.0,
  },
  {
    ta_id: 3,
    ta_name: "Abdallah Abdul-Haleem",
    ta_email: "abdallah.haleem@example.com",
    student_id: 1,
    staff_number: "TA003",
    hourly_rate: 18.0,
  },
  {
    ta_id: 4,
    ta_name: "Agnes Katherine Aboagye",
    ta_email: "agnes.aboagye@example.com",
    student_id: 5,
    staff_number: "TA004",
    hourly_rate: 18.0,
  },
]

export async function GET() {
  try {
    // In production: SELECT ta.*, s.full_name as ta_name, s.email as ta_email FROM users.teaching_assistants ta JOIN users.students s ON ta.student_id = s.student_id;
    return NextResponse.json(mockTAs)
  } catch (error) {
    console.error("Error fetching TAs:", error)
    return NextResponse.json({ error: "Failed to fetch TAs" }, { status: 500 })
  }
}

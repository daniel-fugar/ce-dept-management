import { NextResponse } from "next/server"

// Mock courses data
const mockCourses = [
  {
    course_id: 1,
    course_code: "CE101",
    course_name: "Introduction to Programming",
    credits: 3,
    semester: "First",
    year_level: 1,
  },
  {
    course_id: 2,
    course_code: "CE102",
    course_name: "Digital Logic Design",
    credits: 3,
    semester: "First",
    year_level: 1,
  },
  {
    course_id: 3,
    course_code: "CE201",
    course_name: "Data Structures and Algorithms",
    credits: 3,
    semester: "First",
    year_level: 2,
  },
  {
    course_id: 4,
    course_code: "CE202",
    course_name: "Computer Architecture",
    credits: 3,
    semester: "Second",
    year_level: 2,
  },
  {
    course_id: 5,
    course_code: "CE301",
    course_name: "Database Systems",
    credits: 3,
    semester: "First",
    year_level: 3,
  },
  {
    course_id: 6,
    course_code: "CE302",
    course_name: "Software Engineering",
    credits: 3,
    semester: "Second",
    year_level: 3,
  },
  {
    course_id: 7,
    course_code: "CE401",
    course_name: "Artificial Intelligence",
    credits: 3,
    semester: "First",
    year_level: 4,
  },
  {
    course_id: 8,
    course_code: "CE402",
    course_name: "Computer Networks",
    credits: 3,
    semester: "Second",
    year_level: 4,
  },
]

export async function GET() {
  try {
    // In production, you would query your PostgreSQL database here
    // Example: SELECT * FROM academic.courses ORDER BY course_code;

    return NextResponse.json(mockCourses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

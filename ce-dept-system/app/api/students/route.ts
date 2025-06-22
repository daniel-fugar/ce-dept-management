import { NextResponse } from "next/server"

// Mock data - in production, this would come from your PostgreSQL database
const mockStudents = [
  {
    student_id: 1,
    student_number: "CE2021001",
    full_name: "Abdallah Abdul-Haleem",
    email: "abdallah.haleem@example.com",
    phone: "0551234567",
    year_level: 3,
    date_of_birth: "2002-03-15",
    address: "Accra, Ghana",
  },
  {
    student_id: 2,
    student_number: "CE2022001",
    full_name: "Adda Jefferson",
    email: "adda.jefferson@example.com",
    phone: "0502345678",
    year_level: 2,
    date_of_birth: "2003-07-22",
    address: "Kumasi, Ghana",
  },
  {
    student_id: 3,
    student_number: "CE2023001",
    full_name: "Adu Damoah Herbert",
    email: "adu.herbert@example.com",
    phone: "0243456789",
    year_level: 1,
    date_of_birth: "2004-11-08",
    address: "Takoradi, Ghana",
  },
  {
    student_id: 4,
    student_number: "CE2020001",
    full_name: "Aganyi Magdalene Sedudzi",
    email: "aganyi.sedudzi@example.com",
    phone: "0544567890",
    year_level: 4,
    date_of_birth: "2001-05-12",
    address: "Ho, Ghana",
  },
  {
    student_id: 5,
    student_number: "CE2021002",
    full_name: "Agnes Katherine Aboagye",
    email: "agnes.aboagye@example.com",
    phone: "0205678901",
    year_level: 3,
    date_of_birth: "2002-09-30",
    address: "Cape Coast, Ghana",
  },
]

export async function GET() {
  try {
    // In production, you would query your PostgreSQL database here
    // Example query: SELECT * FROM users.students ORDER BY student_number;

    return NextResponse.json(mockStudents)
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

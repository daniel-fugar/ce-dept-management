import { NextResponse } from "next/server"

// Mock lecturers data
const mockLecturers = [
  {
    lecturer_id: 1,
    staff_number: "LEC001",
    full_name: "Dr. Kwame Asante",
    email: "k.asante@university.edu.gh",
    phone: "0244123456",
    position: "Senior Lecturer",
    specialization: "Software Engineering",
  },
  {
    lecturer_id: 2,
    staff_number: "LEC002",
    full_name: "Prof. Akosua Mensah",
    email: "a.mensah@university.edu.gh",
    phone: "0244234567",
    position: "Professor",
    specialization: "Computer Networks",
  },
  {
    lecturer_id: 3,
    staff_number: "LEC003",
    full_name: "Dr. Kofi Boateng",
    email: "k.boateng@university.edu.gh",
    phone: "0244345678",
    position: "Lecturer",
    specialization: "Database Systems",
  },
  {
    lecturer_id: 4,
    staff_number: "LEC004",
    full_name: "Dr. Ama Osei",
    email: "a.osei@university.edu.gh",
    phone: "0244456789",
    position: "Senior Lecturer",
    specialization: "Artificial Intelligence",
  },
  {
    lecturer_id: 5,
    staff_number: "LEC005",
    full_name: "Mr. Yaw Oppong",
    email: "y.oppong@university.edu.gh",
    phone: "0244567890",
    position: "Assistant Lecturer",
    specialization: "Web Development",
  },
]

export async function GET() {
  try {
    // In production: SELECT * FROM users.lecturers ORDER BY full_name;
    return NextResponse.json(mockLecturers)
  } catch (error) {
    console.error("Error fetching lecturers:", error)
    return NextResponse.json({ error: "Failed to fetch lecturers" }, { status: 500 })
  }
}

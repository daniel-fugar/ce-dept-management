import { type NextRequest, NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Admin authentication
    if (email === "admin@ce.edu.gh" && password === "admin123") {
      const user = {
        id: 1,
        email: "admin@ce.edu.gh",
        full_name: "System Administrator",
        role: "admin",
      }

      return NextResponse.json({
        success: true,
        user,
        message: "Login successful",
      })
    }

    // Check newly registered users
    const registeredUser = authStore.findByEmail(email)
    if (registeredUser && registeredUser.password === password) {
      const user = {
        id: registeredUser.id,
        email: registeredUser.email,
        full_name: registeredUser.fullName,
        phone: registeredUser.phone,
        year_level: registeredUser.yearLevel,
        role: "student",
      }

      return NextResponse.json({
        success: true,
        user,
        message: "Login successful",
      })
    }

    // Sample database students (for demo purposes)
    const sampleStudents = [
      { email: "abdallah.haleem@example.com", name: "Abdallah Abdul-Haleem", year: 3 },
      { email: "adda.jefferson@example.com", name: "Adda Jefferson", year: 2 },
      { email: "adu.herbert@example.com", name: "Adu Damoah Herbert", year: 1 },
      { email: "aganyi.sedudzi@example.com", name: "Aganyi Magdalene Sedudzi", year: 4 },
      { email: "agnes.aboagye@example.com", name: "Agnes Katherine Aboagye", year: 3 },
      { email: "ahiafrogah.john@example.com", name: "Ahiafrogah John Godson", year: 2 },
      { email: "aidoo.kwamena@example.com", name: "Aidoo-Taylor Kwamena", year: 1 },
      { email: "akowuah.baffour@example.com", name: "Akowuah Addo Baffour", year: 2 },
      { email: "akuffo.thelma@example.com", name: "Akuffo Addo Thelma", year: 4 },
      { email: "alfred.darkwa@example.com", name: "Alfred Darkwa", year: 1 },
    ]

    const sampleStudent = sampleStudents.find((s) => s.email === email)
    if (sampleStudent && password === "student123") {
      const user = {
        id: 2,
        email: email,
        full_name: sampleStudent.name,
        year_level: sampleStudent.year,
        role: "student",
      }

      return NextResponse.json({
        success: true,
        user,
        message: "Login successful",
      })
    }

    return NextResponse.json(
      {
        error: "Invalid email or password. For sample accounts, use password 'student123'",
      },
      { status: 401 },
    )
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

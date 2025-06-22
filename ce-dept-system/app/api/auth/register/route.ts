import { type NextRequest, NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, phone, yearLevel, password } = await request.json()

    // Validate required fields
    if (!fullName || !email || !phone || !yearLevel || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 })
    }

    // Check if email already exists in our store
    if (authStore.emailExists(email)) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 })
    }

    // Check against sample database emails
    const existingEmails = [
      "admin@ce.edu.gh",
      "abdallah.haleem@example.com",
      "adda.jefferson@example.com",
      "adu.herbert@example.com",
      "aganyi.sedudzi@example.com",
      "agnes.aboagye@example.com",
    ]

    if (existingEmails.includes(email)) {
      return NextResponse.json({ error: "Email already exists in the system" }, { status: 409 })
    }

    // Register the new user
    const newUser = authStore.register({
      fullName,
      email,
      phone,
      yearLevel: Number.parseInt(yearLevel),
      password, // In production, hash this password
    })

    return NextResponse.json({
      success: true,
      message: "Registration successful! You can now login with your credentials.",
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        yearLevel: newUser.yearLevel,
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

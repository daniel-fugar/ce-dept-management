import { NextResponse } from "next/server"

// Mock data representing the output of the calculate_outstanding_fees function
const mockOutstandingFees = [
  {
    student_id: 1,
    student_number: "CE2021001",
    full_name: "Abdallah Abdul-Haleem",
    email: "abdallah.haleem@example.com",
    year_level: 3,
    required_fee: 4600.0,
    total_paid: 2000.0,
    outstanding_amount: 2600.0,
    payment_status: "PARTIALLY_PAID",
  },
  {
    student_id: 2,
    student_number: "CE2022001",
    full_name: "Adda Jefferson",
    email: "adda.jefferson@example.com",
    year_level: 2,
    required_fee: 4350.0,
    total_paid: 4350.0,
    outstanding_amount: 0.0,
    payment_status: "FULLY_PAID",
  },
  {
    student_id: 3,
    student_number: "CE2023001",
    full_name: "Adu Damoah Herbert",
    email: "adu.herbert@example.com",
    year_level: 1,
    required_fee: 4000.0,
    total_paid: 1500.0,
    outstanding_amount: 2500.0,
    payment_status: "PARTIALLY_PAID",
  },
  {
    student_id: 4,
    student_number: "CE2020001",
    full_name: "Aganyi Magdalene Sedudzi",
    email: "aganyi.sedudzi@example.com",
    year_level: 4,
    required_fee: 4850.0,
    total_paid: 4850.0,
    outstanding_amount: 0.0,
    payment_status: "FULLY_PAID",
  },
  {
    student_id: 5,
    student_number: "CE2021002",
    full_name: "Agnes Katherine Aboagye",
    email: "agnes.aboagye@example.com",
    year_level: 3,
    required_fee: 4600.0,
    total_paid: 3000.0,
    outstanding_amount: 1600.0,
    payment_status: "PARTIALLY_PAID",
  },
]

export async function GET() {
  try {
    // In production, you would call the PostgreSQL function here
    // Example: SELECT calculate_outstanding_fees('2023-2024');

    return NextResponse.json(mockOutstandingFees)
  } catch (error) {
    console.error("Error fetching outstanding fees:", error)
    return NextResponse.json({ error: "Failed to fetch outstanding fees" }, { status: 500 })
  }
}

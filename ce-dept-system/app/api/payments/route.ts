import { NextResponse } from "next/server"

// Mock payments data
const mockPayments = [
  {
    payment_id: 1,
    amount: 2000.0,
    payment_date: "2023-09-15T10:30:00Z",
    payment_method: "BANK_TRANSFER",
    reference_number: "TXN001234",
    description: "Partial tuition payment",
    status: "COMPLETED",
  },
  {
    payment_id: 2,
    amount: 4350.0,
    payment_date: "2023-09-16T14:20:00Z",
    payment_method: "MOBILE_MONEY",
    reference_number: "MM001235",
    description: "Full semester payment",
    status: "COMPLETED",
  },
  {
    payment_id: 3,
    amount: 1500.0,
    payment_date: "2023-09-17T09:15:00Z",
    payment_method: "CASH",
    reference_number: "CASH001",
    description: "Partial payment",
    status: "COMPLETED",
  },
  {
    payment_id: 4,
    amount: 4850.0,
    payment_date: "2023-09-18T11:45:00Z",
    payment_method: "BANK_TRANSFER",
    reference_number: "TXN001236",
    description: "Full semester payment",
    status: "COMPLETED",
  },
  {
    payment_id: 5,
    amount: 3000.0,
    payment_date: "2023-09-19T16:30:00Z",
    payment_method: "MOBILE_MONEY",
    reference_number: "MM001237",
    description: "Partial payment",
    status: "COMPLETED",
  },
]

export async function GET() {
  try {
    // In production, you would query your PostgreSQL database here
    // Example: SELECT * FROM finance.payments ORDER BY payment_date DESC;

    return NextResponse.json(mockPayments)
  } catch (error) {
    console.error("Error fetching payments:", error)
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

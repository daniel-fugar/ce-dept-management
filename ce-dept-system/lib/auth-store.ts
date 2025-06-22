// Simple in-memory authentication store for demo purposes
// In production, this would be replaced with a proper database

interface RegisteredUser {
  id: number
  fullName: string
  email: string
  phone: string
  yearLevel: number
  password: string
  createdAt: Date
}

class AuthStore {
  private users = new Map<string, RegisteredUser>()
  private nextId = 1000

  register(userData: Omit<RegisteredUser, "id" | "createdAt">): RegisteredUser {
    const user: RegisteredUser = {
      ...userData,
      id: this.nextId++,
      createdAt: new Date(),
    }

    this.users.set(userData.email, user)
    return user
  }

  findByEmail(email: string): RegisteredUser | undefined {
    return this.users.get(email)
  }

  emailExists(email: string): boolean {
    return this.users.has(email)
  }

  getAllUsers(): RegisteredUser[] {
    return Array.from(this.users.values())
  }
}

// Create a singleton instance
export const authStore = new AuthStore()

# Computer Engineering Department Management System

A comprehensive management system for the Computer Engineering Department built with Next.js 14 and PostgreSQL.

## Features

- **Student Management**: Complete student information system with personal details and academic records
- **Fee Management**: Track student fee payments and calculate outstanding balances
- **Course Management**: Manage course catalog and student enrollments
- **Lecturer Assignment**: Assign lecturers and teaching assistants to courses
- **Dashboard**: Comprehensive dashboard with statistics and reports
- **Authentication**: Secure login and registration system

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Database Schema

The system uses a well-structured PostgreSQL database with the following schemas:

### Schemas
- `users`: Student, lecturer, and teaching assistant information
- `academic`: Courses, enrollments, and assignments
- `finance`: Fee structure and payment tracking

### Key Tables
- `users.students`: Student personal information
- `users.lecturers`: Lecturer information
- `users.teaching_assistants`: TA information
- `academic.courses`: Course catalog
- `academic.enrollments`: Student course enrollments
- `academic.course_lecturers`: Lecturer-course assignments
- `academic.course_tas`: TA-course assignments
- `finance.fee_structure`: Fee structure by year level
- `finance.payments`: Payment transactions

## Installation and Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Database Setup

1. Install PostgreSQL and create a database:
\`\`\`sql
CREATE DATABASE ce_department_system;
\`\`\`

2. Run the SQL scripts in order:
\`\`\`bash
psql -d ce_department_system -f scripts/01-create-database.sql
psql -d ce_department_system -f scripts/02-create-tables.sql
psql -d ce_department_system -f scripts/03-insert-sample-data.sql
psql -d ce_department_system -f scripts/04-outstanding-fees-function.sql
\`\`\`

### Application Setup

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd ce-department-system
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update `.env.local` with your database credentials:
\`\`\`
DATABASE_URL="postgresql://username:password@localhost:5432/ce_department_system"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Default Login Credentials

**Administrator:**
- Email: admin@ce.edu.gh
- Password: admin123

**Student (Demo):**
- Email: Any email from the student list
- Password: student123

### Key Features

1. **Dashboard**: View comprehensive statistics and reports
2. **Student Management**: Browse all registered students
3. **Fee Tracking**: Monitor outstanding fees and payment status
4. **Course Catalog**: View available courses by year level
5. **Payment History**: Track all payment transactions

## Database Functions

### Outstanding Fees Calculation

The system includes a PostgreSQL function to calculate outstanding fees:

\`\`\`sql
SELECT calculate_outstanding_fees('2023-2024');
\`\`\`

This function returns a JSON array with:
- Student information
- Required fees by year level
- Total payments made
- Outstanding amounts
- Payment status

## API Endpoints

- `GET /api/students` - Fetch all students
- `GET /api/courses` - Fetch all courses
- `GET /api/payments` - Fetch payment history
- `GET /api/outstanding-fees` - Fetch outstanding fees report
- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration

## Project Structure

\`\`\`
├── app/
│   ├── api/                 # API routes
│   ├── dashboard/           # Dashboard page
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   └── globals.css         # Global styles
├── components/
│   └── ui/                 # shadcn/ui components
├── scripts/                # Database scripts
│   ├── 01-create-database.sql
│   ├── 02-create-tables.sql
│   ├── 03-insert-sample-data.sql
│   ├── 04-outstanding-fees-function.sql
│   └── 05-database-backup.sql
└── README.md
\`\`\`

## Sample Data

The system includes sample data for 55+ students from the Computer Engineering class, including:
- Complete student information
- Course enrollments
- Fee payments
- Lecturer assignments
- Teaching assistant assignments

## Backup and Restore

### Create Backup
\`\`\`bash
pg_dump -h localhost -U postgres -d ce_department_system > backup.sql
\`\`\`

### Restore Backup
\`\`\`bash
psql -h localhost -U postgres -d ce_department_system < backup.sql
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

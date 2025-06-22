-- Set search path to include our schemas
SET search_path TO academic, finance, users, public;

-- Users schema tables
CREATE TABLE users.students (
    student_id SERIAL PRIMARY KEY,
    student_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    year_level INTEGER CHECK (year_level BETWEEN 1 AND 4),
    date_of_birth DATE,
    address TEXT,
    emergency_contact VARCHAR(100),
    emergency_phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    staff_number VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    department VARCHAR(50) DEFAULT 'Computer Engineering',
    position VARCHAR(50),
    specialization TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users.teaching_assistants (
    ta_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    staff_number VARCHAR(20) UNIQUE NOT NULL,
    hourly_rate DECIMAL(10,2) DEFAULT 15.00,
    max_hours_per_week INTEGER DEFAULT 20,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Academic schema tables
CREATE TABLE academic.courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(10) UNIQUE NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    credits INTEGER NOT NULL,
    semester VARCHAR(20) NOT NULL,
    year_level INTEGER CHECK (year_level BETWEEN 1 AND 4),
    description TEXT,
    prerequisites TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academic.enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    course_id INTEGER REFERENCES academic.courses(course_id),
    academic_year VARCHAR(9) NOT NULL, -- e.g., '2023-2024'
    semester VARCHAR(20) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DROPPED', 'COMPLETED')),
    grade VARCHAR(5),
    UNIQUE(student_id, course_id, academic_year, semester)
);

CREATE TABLE academic.course_lecturers (
    assignment_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES academic.courses(course_id),
    lecturer_id INTEGER REFERENCES users.lecturers(lecturer_id),
    academic_year VARCHAR(9) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    role VARCHAR(30) DEFAULT 'PRIMARY' CHECK (role IN ('PRIMARY', 'SECONDARY', 'GUEST')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, lecturer_id, academic_year, semester)
);

CREATE TABLE academic.course_tas (
    assignment_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES academic.courses(course_id),
    ta_id INTEGER REFERENCES users.teaching_assistants(ta_id),
    lecturer_id INTEGER REFERENCES users.lecturers(lecturer_id),
    academic_year VARCHAR(9) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    hours_per_week INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(course_id, ta_id, academic_year, semester)
);

-- Finance schema tables
CREATE TABLE finance.fee_structure (
    fee_id SERIAL PRIMARY KEY,
    academic_year VARCHAR(9) NOT NULL,
    year_level INTEGER CHECK (year_level BETWEEN 1 AND 4),
    tuition_fee DECIMAL(10,2) NOT NULL,
    lab_fee DECIMAL(10,2) DEFAULT 0,
    library_fee DECIMAL(10,2) DEFAULT 0,
    sports_fee DECIMAL(10,2) DEFAULT 0,
    other_fees DECIMAL(10,2) DEFAULT 0,
    total_fee DECIMAL(10,2) GENERATED ALWAYS AS (tuition_fee + lab_fee + library_fee + sports_fee + other_fees) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(academic_year, year_level)
);

CREATE TABLE finance.payments (
    payment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users.students(student_id),
    academic_year VARCHAR(9) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method VARCHAR(20) DEFAULT 'CASH' CHECK (payment_method IN ('CASH', 'BANK_TRANSFER', 'MOBILE_MONEY', 'CHEQUE')),
    reference_number VARCHAR(50),
    description TEXT,
    status VARCHAR(20) DEFAULT 'COMPLETED' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED'))
);

-- Create indexes for better performance
CREATE INDEX idx_students_email ON users.students(email);
CREATE INDEX idx_students_year_level ON users.students(year_level);
CREATE INDEX idx_enrollments_student_id ON academic.enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON academic.enrollments(course_id);
CREATE INDEX idx_payments_student_id ON finance.payments(student_id);
CREATE INDEX idx_payments_academic_year ON finance.payments(academic_year);

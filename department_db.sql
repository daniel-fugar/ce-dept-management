-- Create Database
CREATE DATABASE student_management;

-- Switch to database
\c student_management;

-- Create students table
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    year_of_study INT
);

-- Create fee_structure table
CREATE TABLE fee_structure (
    year_of_study INT PRIMARY KEY,
    amount_due NUMERIC(10, 2)
);

-- Create fees table
CREATE TABLE fees (
    payment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    amount_paid NUMERIC(10, 2),
    payment_date DATE DEFAULT CURRENT_DATE
);

-- Create courses table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_code VARCHAR(20) UNIQUE,
    course_name VARCHAR(100),
    credit_hours INT
);

-- Create course_enrollment table
CREATE TABLE course_enrollment (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id)
);

-- Create lecturers table
CREATE TABLE lecturers (
    lecturer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- Create tas table
CREATE TABLE tas (
    ta_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

-- Create lecturer_course table
CREATE TABLE lecturer_course (
    lecturer_id INT REFERENCES lecturers(lecturer_id),
    course_id INT REFERENCES courses(course_id),
    PRIMARY KEY (lecturer_id, course_id)
);

-- Create lecturer_ta table
CREATE TABLE lecturer_ta (
    lecturer_id INT REFERENCES lecturers(lecturer_id),
    ta_id INT REFERENCES tas(ta_id),
    PRIMARY KEY (lecturer_id, ta_id)
);

-- Insert Students
INSERT INTO students (first_name, last_name, email, year_of_study) VALUES
('Daniel Delawoe', 'Fugar', 'dfugar@ug.edu.gh', 2),
('Jessica Yorm', 'Amemor', 'jamemor@ug.edu.gh', 2),
('Agnes-Katherine', 'Aboagye', 'aaboagye@ug.edu.gh', 2),
('Jeffrey Somuah', 'Sarpong', 'jsarpong@ug.edu.gh', 2),
('Elvis Kwason', 'Tiburu', 'etiburu@ug.edu.gh', 2);

-- Fee structure for level 200 students
INSERT INTO fee_structure (year_of_study, amount_due) VALUES
(2, 1500.00);

-- Fee Payments (some full, some partial)
INSERT INTO fees (student_id, amount_paid) VALUES
(1, 1500.00),  -- Daniel paid full
(2, 1000.00),  -- Jessica paid partial
(3, 1500.00),  -- Agnes paid full
(4, 500.00),   -- Jeffrey paid partial
(5, 0.00);     -- Elvis hasn't paid yet

-- Add Courses
INSERT INTO courses (course_code, course_name, credit_hours) VALUES
('CPEN208', 'Intro to Software Engineering', 3),
('CPEN210', 'Computer Architecture', 3),
('CPEN212', 'Data Structures', 3);

-- Course Enrollments
INSERT INTO course_enrollment (student_id, course_id) VALUES
(1, 1), (1, 2), (1, 3),
(2, 1), (2, 2), (2, 3),
(3, 1), (3, 3),
(4, 1), (4, 2),
(5, 2), (5, 3);

-- Lecturers
INSERT INTO lecturers (name, email) VALUES
('Dr. Kwame Mensah', 'kmensah@ug.edu.gh'),
('Dr. Akua Owusu', 'aowusu@ug.edu.gh');

-- TAs
INSERT INTO tas (name, email) VALUES
('Linda Ofori', 'lofori@ug.edu.gh'),
('Samuel Boateng', 'sboateng@ug.edu.gh');

-- Lecturer-Course Assignments
INSERT INTO lecturer_course (lecturer_id, course_id) VALUES
(1, 1),  -- Dr. Mensah teaches CPEN208
(2, 2),  -- Dr. Owusu teaches CPEN210
(2, 3);  -- Dr. Owusu also teaches CPEN212

-- Lecturer-TA Assignments
INSERT INTO lecturer_ta (lecturer_id, ta_id) VALUES
(1, 1),
(2, 2);

-- Function to get outstanding fees per student
CREATE OR REPLACE FUNCTION get_outstanding_fees()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_agg(t)
    INTO result
    FROM (
        SELECT 
            s.student_id,
            CONCAT(s.first_name, ' ', s.last_name) AS student_name,
            f.amount_due,
            COALESCE(SUM(p.amount_paid), 0) AS total_paid,
            f.amount_due - COALESCE(SUM(p.amount_paid), 0) AS balance
        FROM students s
        JOIN fee_structure f ON s.year_of_study = f.year_of_study
        LEFT JOIN fees p ON s.student_id = p.student_id
        GROUP BY s.student_id, student_name, f.amount_due
    ) t;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

SELECT get_outstanding_fees();

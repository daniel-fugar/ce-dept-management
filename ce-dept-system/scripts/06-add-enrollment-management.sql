-- Add additional tables and functions for enrollment management

-- Create enrollment management view
CREATE OR REPLACE VIEW academic.enrollment_summary AS
SELECT 
    e.enrollment_id,
    s.student_id,
    s.student_number,
    s.full_name as student_name,
    s.year_level,
    c.course_id,
    c.course_code,
    c.course_name,
    c.credits,
    e.academic_year,
    e.semester,
    e.status,
    e.grade,
    e.enrollment_date
FROM academic.enrollments e
JOIN users.students s ON e.student_id = s.student_id
JOIN academic.courses c ON e.course_id = c.course_id
ORDER BY s.student_number, c.course_code;

-- Create lecturer assignment view
CREATE OR REPLACE VIEW academic.lecturer_assignment_summary AS
SELECT 
    cl.assignment_id,
    l.lecturer_id,
    l.full_name as lecturer_name,
    l.email as lecturer_email,
    c.course_id,
    c.course_code,
    c.course_name,
    cl.academic_year,
    cl.semester,
    cl.role,
    cl.created_at
FROM academic.course_lecturers cl
JOIN users.lecturers l ON cl.lecturer_id = l.lecturer_id
JOIN academic.courses c ON cl.course_id = c.course_id
ORDER BY c.course_code, l.full_name;

-- Create TA assignment view
CREATE OR REPLACE VIEW academic.ta_assignment_summary AS
SELECT 
    ct.assignment_id,
    ta.ta_id,
    s.full_name as ta_name,
    s.email as ta_email,
    c.course_id,
    c.course_code,
    c.course_name,
    l.full_name as lecturer_name,
    ct.academic_year,
    ct.semester,
    ct.hours_per_week,
    ct.created_at
FROM academic.course_tas ct
JOIN users.teaching_assistants ta ON ct.ta_id = ta.ta_id
JOIN users.students s ON ta.student_id = s.student_id
JOIN academic.courses c ON ct.course_id = c.course_id
JOIN users.lecturers l ON ct.lecturer_id = l.lecturer_id
ORDER BY c.course_code, s.full_name;

-- Function to enroll student in course
CREATE OR REPLACE FUNCTION enroll_student_in_course(
    p_student_id INTEGER,
    p_course_id INTEGER,
    p_academic_year VARCHAR(9) DEFAULT '2023-2024',
    p_semester VARCHAR(20) DEFAULT 'First'
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    enrollment_exists BOOLEAN;
BEGIN
    -- Check if enrollment already exists
    SELECT EXISTS(
        SELECT 1 FROM academic.enrollments 
        WHERE student_id = p_student_id 
        AND course_id = p_course_id 
        AND academic_year = p_academic_year 
        AND semester = p_semester
    ) INTO enrollment_exists;
    
    IF enrollment_exists THEN
        SELECT json_build_object(
            'success', false,
            'message', 'Student is already enrolled in this course for the specified semester'
        ) INTO result;
    ELSE
        INSERT INTO academic.enrollments (student_id, course_id, academic_year, semester)
        VALUES (p_student_id, p_course_id, p_academic_year, p_semester);
        
        SELECT json_build_object(
            'success', true,
            'message', 'Student successfully enrolled in course'
        ) INTO result;
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to assign lecturer to course
CREATE OR REPLACE FUNCTION assign_lecturer_to_course(
    p_lecturer_id INTEGER,
    p_course_id INTEGER,
    p_academic_year VARCHAR(9) DEFAULT '2023-2024',
    p_semester VARCHAR(20) DEFAULT 'First',
    p_role VARCHAR(30) DEFAULT 'PRIMARY'
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    assignment_exists BOOLEAN;
BEGIN
    -- Check if assignment already exists
    SELECT EXISTS(
        SELECT 1 FROM academic.course_lecturers 
        WHERE lecturer_id = p_lecturer_id 
        AND course_id = p_course_id 
        AND academic_year = p_academic_year 
        AND semester = p_semester
    ) INTO assignment_exists;
    
    IF assignment_exists THEN
        SELECT json_build_object(
            'success', false,
            'message', 'Lecturer is already assigned to this course for the specified semester'
        ) INTO result;
    ELSE
        INSERT INTO academic.course_lecturers (lecturer_id, course_id, academic_year, semester, role)
        VALUES (p_lecturer_id, p_course_id, p_academic_year, p_semester, p_role);
        
        SELECT json_build_object(
            'success', true,
            'message', 'Lecturer successfully assigned to course'
        ) INTO result;
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to assign TA to course
CREATE OR REPLACE FUNCTION assign_ta_to_course(
    p_ta_id INTEGER,
    p_course_id INTEGER,
    p_lecturer_id INTEGER,
    p_academic_year VARCHAR(9) DEFAULT '2023-2024',
    p_semester VARCHAR(20) DEFAULT 'First',
    p_hours_per_week INTEGER DEFAULT 10
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    assignment_exists BOOLEAN;
BEGIN
    -- Check if assignment already exists
    SELECT EXISTS(
        SELECT 1 FROM academic.course_tas 
        WHERE ta_id = p_ta_id 
        AND course_id = p_course_id 
        AND academic_year = p_academic_year 
        AND semester = p_semester
    ) INTO assignment_exists;
    
    IF assignment_exists THEN
        SELECT json_build_object(
            'success', false,
            'message', 'TA is already assigned to this course for the specified semester'
        ) INTO result;
    ELSE
        INSERT INTO academic.course_tas (ta_id, course_id, lecturer_id, academic_year, semester, hours_per_week)
        VALUES (p_ta_id, p_course_id, p_lecturer_id, p_academic_year, p_semester, p_hours_per_week);
        
        SELECT json_build_object(
            'success', true,
            'message', 'TA successfully assigned to course'
        ) INTO result;
    END IF;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

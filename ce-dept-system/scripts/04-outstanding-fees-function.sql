-- Function to calculate outstanding fees for each student
CREATE OR REPLACE FUNCTION calculate_outstanding_fees(academic_year_param VARCHAR(9) DEFAULT '2023-2024')
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    WITH student_fees AS (
        SELECT 
            s.student_id,
            s.student_number,
            s.full_name,
            s.email,
            s.year_level,
            fs.total_fee as required_fee,
            COALESCE(SUM(p.amount), 0) as total_paid,
            (fs.total_fee - COALESCE(SUM(p.amount), 0)) as outstanding_amount
        FROM users.students s
        JOIN finance.fee_structure fs ON s.year_level = fs.year_level 
            AND fs.academic_year = academic_year_param
        LEFT JOIN finance.payments p ON s.student_id = p.student_id 
            AND p.academic_year = academic_year_param
            AND p.status = 'COMPLETED'
        GROUP BY s.student_id, s.student_number, s.full_name, s.email, s.year_level, fs.total_fee
        ORDER BY s.student_number
    )
    SELECT json_agg(
        json_build_object(
            'student_id', student_id,
            'student_number', student_number,
            'full_name', full_name,
            'email', email,
            'year_level', year_level,
            'required_fee', required_fee,
            'total_paid', total_paid,
            'outstanding_amount', outstanding_amount,
            'payment_status', CASE 
                WHEN outstanding_amount <= 0 THEN 'FULLY_PAID'
                WHEN total_paid = 0 THEN 'NOT_PAID'
                ELSE 'PARTIALLY_PAID'
            END
        )
    ) INTO result
    FROM student_fees;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Test the function
SELECT calculate_outstanding_fees('2023-2024');

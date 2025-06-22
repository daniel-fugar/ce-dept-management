-- Insert sample lecturers
INSERT INTO users.lecturers (staff_number, full_name, email, phone, position, specialization) VALUES
('LEC001', 'Dr. Kwame Asante', 'k.asante@university.edu.gh', '0244123456', 'Senior Lecturer', 'Software Engineering'),
('LEC002', 'Prof. Akosua Mensah', 'a.mensah@university.edu.gh', '0244234567', 'Professor', 'Computer Networks'),
('LEC003', 'Dr. Kofi Boateng', 'k.boateng@university.edu.gh', '0244345678', 'Lecturer', 'Database Systems'),
('LEC004', 'Dr. Ama Osei', 'a.osei@university.edu.gh', '0244456789', 'Senior Lecturer', 'Artificial Intelligence'),
('LEC005', 'Mr. Yaw Oppong', 'y.oppong@university.edu.gh', '0244567890', 'Assistant Lecturer', 'Web Development');

-- Insert sample courses
INSERT INTO academic.courses (course_code, course_name, credits, semester, year_level, description) VALUES
('CE101', 'Introduction to Programming', 3, 'First', 1, 'Basic programming concepts using Python'),
('CE102', 'Digital Logic Design', 3, 'First', 1, 'Fundamentals of digital systems'),
('CE201', 'Data Structures and Algorithms', 3, 'First', 2, 'Advanced programming and algorithm design'),
('CE202', 'Computer Architecture', 3, 'Second', 2, 'Computer organization and architecture'),
('CE301', 'Database Systems', 3, 'First', 3, 'Database design and management'),
('CE302', 'Software Engineering', 3, 'Second', 3, 'Software development methodologies'),
('CE401', 'Artificial Intelligence', 3, 'First', 4, 'AI concepts and applications'),
('CE402', 'Computer Networks', 3, 'Second', 4, 'Network protocols and security');

-- Insert students with generated student numbers
INSERT INTO users.students (student_number, full_name, email, phone, year_level, date_of_birth, address) VALUES
('CE2021001', 'Abdallah Abdul-Haleem', 'abdallah.haleem@example.com', '0551234567', 3, '2002-03-15', 'Accra, Ghana'),
('CE2022001', 'Adda Jefferson', 'adda.jefferson@example.com', '0502345678', 2, '2003-07-22', 'Kumasi, Ghana'),
('CE2023001', 'Adu Damoah Herbert', 'adu.herbert@example.com', '0243456789', 1, '2004-11-08', 'Takoradi, Ghana'),
('CE2020001', 'Aganyi Magdalene Sedudzi', 'aganyi.sedudzi@example.com', '0544567890', 4, '2001-05-12', 'Ho, Ghana'),
('CE2021002', 'Agnes Katherine Aboagye', 'agnes.aboagye@example.com', '0205678901', 3, '2002-09-30', 'Cape Coast, Ghana'),
('CE2022002', 'Ahiafrogah John Godson', 'ahiafrogah.john@example.com', '0266789012', 2, '2003-01-18', 'Tema, Ghana'),
('CE2023002', 'Aidoo-Taylor Kwamena', 'aidoo.kwamena@example.com', '0277890123', 1, '2004-06-25', 'Accra, Ghana'),
('CE2022003', 'Akowuah Addo Baffour', 'akowuah.baffour@example.com', '0208901234', 2, '2003-04-14', 'Kumasi, Ghana'),
('CE2020002', 'Akuffo Addo Thelma', 'akuffo.thelma@example.com', '0509012345', 4, '2001-12-03', 'Sunyani, Ghana'),
('CE2023003', 'Alfred Darkwa', 'alfred.darkwa@example.com', '0240123456', 1, '2004-08-17', 'Tamale, Ghana'),
('CE2021003', 'Amilkar Hayonmie', 'amilkar.hayonmie@example.com', '0551234501', 3, '2002-02-28', 'Bolgatanga, Ghana'),
('CE2022004', 'Amo Joshua', 'amo.joshua@example.com', '0542345612', 2, '2003-10-11', 'Wa, Ghana'),
('CE2023004', 'Amoah Pearl Owusua', 'amoah.pearl@example.com', '0263456723', 1, '2004-07-06', 'Koforidua, Ghana'),
('CE2022005', 'Andoh Osgood Junior', 'andoh.osgood@example.com', '0274567834', 2, '2003-03-21', 'Tarkwa, Ghana'),
('CE2020003', 'Aopare Benedict', 'aopare.benedict@example.com', '0205678945', 4, '2001-11-16', 'Techiman, Ghana'),
('CE2021004', 'Asare Andrews Larbi', 'asare.andrews@example.com', '0506789056', 3, '2002-06-09', 'Obuasi, Ghana'),
('CE2022006', 'Ashitey Glenn Nii Ashiteyfio', 'ashitey.glenn@example.com', '0247890167', 2, '2003-08-24', 'Accra, Ghana'),
('CE2023005', 'Asiedu Nana Yaw', 'asiedu.nana@example.com', '0558901278', 1, '2004-04-13', 'Kumasi, Ghana'),
('CE2022007', 'Baah Christopher', 'baah.christopher@example.com', '0549012389', 2, '2003-12-07', 'Cape Coast, Ghana'),
('CE2021005', 'Baidu Sarah', 'baidu.sarah@example.com', '0260123490', 3, '2002-01-19', 'Tamale, Ghana'),
('CE2023006', 'Boateng Kissi Benjamin', 'boateng.benjamin@example.com', '0271234501', 1, '2004-09-02', 'Takoradi, Ghana'),
('CE2020004', 'Captain Godsgift', 'captain.godsgift@example.com', '0202345612', 4, '2001-05-27', 'Ho, Ghana'),
('CE2022008', 'Chinbuah Ankrah Ryangel Nii Amponsah', 'chinbuah.ankrah@example.com', '0503456723', 2, '2003-02-14', 'Tema, Ghana'),
('CE2021006', 'Daniel Delawoe Fugar', 'daniel.fugar@example.com', '0244567834', 3, '2002-10-08', 'Sunyani, Ghana'),
('CE2023007', 'Dunyo Derrick', 'dunyo.derrick@example.com', '0555678945', 1, '2004-06-21', 'Bolgatanga, Ghana'),
('CE2022009', 'Edmond Asoe', 'edmond.asoe@example.com', '0546789056', 2, '2003-03-16', 'Wa, Ghana'),
('CE2021007', 'Effah-Asare Kofi', 'effah.kofi@example.com', '0267890167', 3, '2002-11-29', 'Koforidua, Ghana'),
('CE2023008', 'Eklo Christopher Yao', 'eklo.yao@example.com', '0278901278', 1, '2004-07-12', 'Tarkwa, Ghana'),
('CE2022010', 'Ekumah Mark Kwamena', 'ekumah.mark@example.com', '0209012389', 2, '2003-04-05', 'Techiman, Ghana'),
('CE2020005', 'Emmanuel Mozu-Simpson', 'emmanuel.simpson@example.com', '0500123490', 4, '2001-12-18', 'Obuasi, Ghana'),
('CE2021008', 'Erica Yaa Kwakye', 'erica.kwakye@example.com', '0241234501', 3, '2002-08-31', 'Accra, Ghana'),
('CE2023009', 'Essilfie Nana Yaw Amoako', 'essilfie.amoako@example.com', '0552345612', 1, '2004-05-14', 'Kumasi, Ghana'),
('CE2022011', 'Gyamfi George Kwabena Kuffour', 'gyamfi.kuffour@example.com', '0543456723', 2, '2003-01-27', 'Cape Coast, Ghana'),
('CE2020006', 'Henry Otwey Baidoo', 'henry.baidoo@example.com', '0264567834', 4, '2001-09-10', 'Tamale, Ghana'),
('CE2023010', 'Issaka Abdul-Hakeem Timbilla', 'issaka.timbilla@example.com', '0275678945', 1, '2004-03-23', 'Takoradi, Ghana'),
('CE2022012', 'Ivan Nii Lartey Boye', 'ivan.boye@example.com', '0206789056', 2, '2003-11-06', 'Ho, Ghana'),
('CE2021009', 'Jessica Amemor Yorm', 'jessica.yorm@example.com', '0507890167', 3, '2002-07-19', 'Tema, Ghana'),
('CE2023011', 'Julius Babanawo', 'julius.babanawo@example.com', '0248901278', 1, '2004-04-02', 'Sunyani, Ghana'),
('CE2020007', 'Krampah Jonathan', 'krampah.jonathan@example.com', '0559012389', 4, '2001-10-15', 'Bolgatanga, Ghana'),
('CE2022013', 'Kwofie Seth Pius', 'kwofie.pius@example.com', '0540123490', 2, '2003-06-28', 'Wa, Ghana'),
('CE2023012', 'Manal Abdul-Kadi Mohammed', 'manal.mohammed@example.com', '0261234501', 1, '2004-02-11', 'Koforidua, Ghana'),
('CE2021010', 'Mensah Philemon', 'mensah.philemon@example.com', '0272345612', 3, '2002-08-24', 'Tarkwa, Ghana'),
('CE2022014', 'Misorya Mosore', 'misorya.mosore@example.com', '0203456723', 2, '2003-05-07', 'Techiman, Ghana'),
('CE2023013', 'Ofori Godfred Safo', 'ofori.safo@example.com', '0504567834', 1, '2004-01-20', 'Obuasi, Ghana'),
('CE2020008', 'Ohnyu Lee', 'ohnyu.lee@example.com', '0245678945', 4, '2001-07-03', 'Accra, Ghana'),
('CE2021011', 'Oppong Joseph Yaw', 'oppong.joseph@example.com', '0556789056', 3, '2002-03-16', 'Kumasi, Ghana'),
('CE2022015', 'Paa Kodwo Mensa Odom', 'paa.odom@example.com', '0547890167', 2, '2003-09-29', 'Cape Coast, Ghana'),
('CE2023014', 'Prince Henry Afedi Dadebo', 'prince.henry@example.com', '0268901278', 1, '2004-06-12', 'Tamale, Ghana'),
('CE2022016', 'Prince Yeboah', 'prince.yeboah@example.com', '0279012389', 2, '2003-02-25', 'Takoradi, Ghana'),
('CE2020009', 'Princess Azumah Agana', 'princess.agana@example.com', '0200123490', 4, '2001-10-08', 'Ho, Ghana'),
('CE2021012', 'Quao Jonathan', 'quao.jonathan@example.com', '0501234501', 3, '2002-04-21', 'Tema, Ghana'),
('CE2022017', 'Sarpong Jeffrey Somuah', 'sarpong.somuah@example.com', '0242345612', 2, '2003-12-04', 'Sunyani, Ghana'),
('CE2023015', 'Sasu Thomas Ansong', 'sasu.ansong@example.com', '0553456723', 1, '2004-08-17', 'Bolgatanga, Ghana'),
('CE2022018', 'Sherrif Issaka Akparibo', 'sherrif.akparibo@example.com', '0544567834', 2, '2003-05-30', 'Wa, Ghana'),
('CE2021013', 'Tetteh Emmanuel Etornam', 'tetteh.etornam@example.com', '0265678945', 3, '2002-01-13', 'Koforidua, Ghana'),
('CE2020010', 'Tiburu Elvis Kwason', 'tiburu.kwason@example.com', '0276789056', 4, '2001-09-26', 'Tarkwa, Ghana'),
('CE2023016', 'Ukachukwu Jubilee', 'ukachukwu.jubilee@example.com', '0207890167', 1, '2004-05-09', 'Techiman, Ghana'),
('CE2022019', 'Waniyaki A Hamdallah', 'waniyaki.hamdallah@example.com', '0508901278', 2, '2003-03-22', 'Obuasi, Ghana'),
('CE2021014', 'Zeh Etornam Edmund', 'zeh.edmund@example.com', '0249012389', 3, '2002-11-05', 'Accra, Ghana');

-- Insert fee structure
INSERT INTO finance.fee_structure (academic_year, year_level, tuition_fee, lab_fee, library_fee, sports_fee, other_fees) VALUES
('2023-2024', 1, 3500.00, 200.00, 100.00, 50.00, 150.00),
('2023-2024', 2, 3800.00, 250.00, 100.00, 50.00, 150.00),
('2023-2024', 3, 4000.00, 300.00, 100.00, 50.00, 150.00),
('2023-2024', 4, 4200.00, 350.00, 100.00, 50.00, 150.00),
('2024-2025', 1, 3700.00, 220.00, 120.00, 60.00, 170.00),
('2024-2025', 2, 4000.00, 270.00, 120.00, 60.00, 170.00),
('2024-2025', 3, 4200.00, 320.00, 120.00, 60.00, 170.00),
('2024-2025', 4, 4400.00, 370.00, 120.00, 60.00, 170.00);

-- Insert some sample payments (not all students have paid full fees)
INSERT INTO finance.payments (student_id, academic_year, semester, amount, payment_method, reference_number, description) VALUES
(1, '2023-2024', 'First', 2000.00, 'BANK_TRANSFER', 'TXN001234', 'Partial tuition payment'),
(2, '2023-2024', 'First', 4350.00, 'MOBILE_MONEY', 'MM001235', 'Full semester payment'),
(3, '2023-2024', 'First', 1500.00, 'CASH', 'CASH001', 'Partial payment'),
(4, '2023-2024', 'First', 4850.00, 'BANK_TRANSFER', 'TXN001236', 'Full semester payment'),
(5, '2023-2024', 'First', 3000.00, 'MOBILE_MONEY', 'MM001237', 'Partial payment'),
(6, '2023-2024', 'First', 4350.00, 'BANK_TRANSFER', 'TXN001238', 'Full semester payment'),
(7, '2023-2024', 'First', 1000.00, 'CASH', 'CASH002', 'Initial payment'),
(8, '2023-2024', 'First', 2175.00, 'MOBILE_MONEY', 'MM001239', 'Half payment'),
(9, '2023-2024', 'First', 4850.00, 'BANK_TRANSFER', 'TXN001240', 'Full semester payment'),
(10, '2023-2024', 'First', 2000.00, 'CASH', 'CASH003', 'Partial payment');

-- Insert course enrollments
INSERT INTO academic.enrollments (student_id, course_id, academic_year, semester, status) VALUES
-- Year 1 students enrolled in Year 1 courses
(3, 1, '2023-2024', 'First', 'ACTIVE'), -- CE101
(3, 2, '2023-2024', 'First', 'ACTIVE'), -- CE102
(7, 1, '2023-2024', 'First', 'ACTIVE'),
(7, 2, '2023-2024', 'First', 'ACTIVE'),
(10, 1, '2023-2024', 'First', 'ACTIVE'),
(10, 2, '2023-2024', 'First', 'ACTIVE'),
-- Year 2 students enrolled in Year 2 courses
(2, 3, '2023-2024', 'First', 'ACTIVE'), -- CE201
(2, 4, '2023-2024', 'Second', 'ACTIVE'), -- CE202
(6, 3, '2023-2024', 'First', 'ACTIVE'),
(6, 4, '2023-2024', 'Second', 'ACTIVE'),
-- Year 3 students enrolled in Year 3 courses
(1, 5, '2023-2024', 'First', 'ACTIVE'), -- CE301
(1, 6, '2023-2024', 'Second', 'ACTIVE'), -- CE302
(5, 5, '2023-2024', 'First', 'ACTIVE'),
(5, 6, '2023-2024', 'Second', 'ACTIVE'),
-- Year 4 students enrolled in Year 4 courses
(4, 7, '2023-2024', 'First', 'ACTIVE'), -- CE401
(4, 8, '2023-2024', 'Second', 'ACTIVE'), -- CE402
(9, 7, '2023-2024', 'First', 'ACTIVE'),
(9, 8, '2023-2024', 'Second', 'ACTIVE');

-- Insert course lecturer assignments
INSERT INTO academic.course_lecturers (course_id, lecturer_id, academic_year, semester, role) VALUES
(1, 5, '2023-2024', 'First', 'PRIMARY'), -- CE101 - Mr. Yaw Oppong
(2, 3, '2023-2024', 'First', 'PRIMARY'), -- CE102 - Dr. Kofi Boateng
(3, 1, '2023-2024', 'First', 'PRIMARY'), -- CE201 - Dr. Kwame Asante
(4, 2, '2023-2024', 'Second', 'PRIMARY'), -- CE202 - Prof. Akosua Mensah
(5, 3, '2023-2024', 'First', 'PRIMARY'), -- CE301 - Dr. Kofi Boateng
(6, 1, '2023-2024', 'Second', 'PRIMARY'), -- CE302 - Dr. Kwame Asante
(7, 4, '2023-2024', 'First', 'PRIMARY'), -- CE401 - Dr. Ama Osei
(8, 2, '2023-2024', 'Second', 'PRIMARY'); -- CE402 - Prof. Akosua Mensah

-- Insert some teaching assistants (senior students)
INSERT INTO users.teaching_assistants (student_id, staff_number, hourly_rate, max_hours_per_week) VALUES
(4, 'TA001', 20.00, 15), -- Year 4 student as TA
(9, 'TA002', 20.00, 15), -- Year 4 student as TA
(1, 'TA003', 18.00, 12), -- Year 3 student as TA
(5, 'TA004', 18.00, 12); -- Year 3 student as TA

-- Insert TA assignments
INSERT INTO academic.course_tas (course_id, ta_id, lecturer_id, academic_year, semester, hours_per_week) VALUES
(1, 3, 5, '2023-2024', 'First', 10), -- CE101 TA
(2, 4, 3, '2023-2024', 'First', 10), -- CE102 TA
(3, 1, 1, '2023-2024', 'First', 12), -- CE201 TA
(4, 2, 2, '2023-2024', 'Second', 12); -- CE202 TA

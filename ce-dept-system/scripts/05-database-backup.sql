-- Database backup script
-- Run this to create a backup of your database

-- Create backup directory (run this in your terminal)
-- mkdir -p backups

-- Create full database backup
-- pg_dump -h localhost -U postgres -d ce_department_system > backups/ce_department_backup_$(date +%Y%m%d_%H%M%S).sql

-- Alternative: Create compressed backup
-- pg_dump -h localhost -U postgres -d ce_department_system | gzip > backups/ce_department_backup_$(date +%Y%m%d_%H%M%S).sql.gz

-- To restore from backup:
-- psql -h localhost -U postgres -d ce_department_system < backups/ce_department_backup_YYYYMMDD_HHMMSS.sql

-- Create a simple backup of data only (for testing)
COPY users.students TO '/tmp/students_backup.csv' DELIMITER ',' CSV HEADER;
COPY academic.courses TO '/tmp/courses_backup.csv' DELIMITER ',' CSV HEADER;
COPY finance.payments TO '/tmp/payments_backup.csv' DELIMITER ',' CSV HEADER;
COPY finance.fee_structure TO '/tmp/fee_structure_backup.csv' DELIMITER ',' CSV HEADER;

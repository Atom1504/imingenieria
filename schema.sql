CREATE DATABASE IF NOT EXISTS imingenieria;
USE imingenieria;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    cat VARCHAR(100) NOT NULL,
    place VARCHAR(255) NOT NULL,
    client VARCHAR(255) NOT NULL,
    img VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar el usuario administrador (contraseña: admin123, hasheada con bcrypt para PHP)
INSERT INTO users (email, password_hash, role) 
SELECT * FROM (SELECT 'admin@imingenieria.com', '$2y$10$fNf8.D/z1s2k0Gg6s0W8GedK0c.g3Q1h.y6y/Pz2X6s/6d0.X6o0W', 'admin') AS tmp
WHERE NOT EXISTS (
    SELECT email FROM users WHERE email = 'admin@imingenieria.com'
) LIMIT 1;

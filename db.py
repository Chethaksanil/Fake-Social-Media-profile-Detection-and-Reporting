import sqlite3

# Connect to SQLite database (creates a file-based database)
conn = sqlite3.connect("fake_account.db")
cursor = conn.cursor()

# Create Users Table
cursor.execute('''
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)
''')
conn.commit()

# Insert admin user if not exists
cursor.execute("SELECT COUNT(*) FROM users WHERE role = 'admin'")
if cursor.fetchone()[0] == 0:
    cursor.execute("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                   ('admin', 'admin123', 'admin'))
    conn.commit()

conn.close()
print("SQLite Database Setup Done! ✅")

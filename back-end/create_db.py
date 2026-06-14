import pymysql
from config import Config

def create_db():
    try:
        c = pymysql.connect(
            host=Config.DB_HOST, 
            user=Config.DB_USER, 
            password=Config.DB_PASSWORD, 
            port=Config.DB_PORT
        )
        cursor = c.cursor()
        cursor.execute('CREATE DATABASE IF NOT EXISTS bidmatch DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci')
        c.commit()
        c.close()
        print("Database bidmatch created successfully.")
    except Exception as e:
        print("Error creating DB:", e)

if __name__ == "__main__":
    create_db()

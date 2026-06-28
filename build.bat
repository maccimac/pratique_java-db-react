@echo off
echo Building React frontend...
cd frontend
call npm run build
cd ..

echo Building Spring Boot JAR...
cd backend
call mvnw.cmd package -DskipTests
cd ..

echo Done! Run with:
echo java -jar backend\target\backend-0.0.1-SNAPSHOT.jar

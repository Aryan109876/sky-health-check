# Sky Health Check Application
A collaborative web application designed to manage and visualize software development team health checks using the Spotify Health Check model. This application helps teams track their wellbeing and performance, focusing on continuous improvement by collecting and visualizing feedback at regular intervals.

 # Team Members
Aryan Rahman – Project Manager, Frontend Developer, Database Administrator, Backend Developer

Muhammed Mujib – Backend Developer, Frontend Developer

Waleed Imran – Frontend Developer, Database Administrator, Backend Developer

Duane Abbia-Kwakye – Backend Developer, Frontend Developer

Gaganpreet Saini – Backend Developer, Frontend Developer

# Project Overview & Goals
The Sky Health Check Application enables software development teams to regularly assess their team health using the Spotify Health Check model. Teams submit votes on various health cards that reflect the current state of their team (Red, Amber, Green). This feedback is aggregated and displayed in an analytics dashboard for team leaders to monitor team morale and identify areas for improvement.

# Key Features:
Role-Based Authentication: A secure, role-based authentication system where team members, team leaders, and senior managers can interact with the application based on their assigned roles.

Health Check Voting System: Allows team members to vote on health cards, indicating the current state of the team’s health.

Analytics Dashboard: Displays aggregated data of health check results, with historical trend analysis at various levels (team, department, organization).

Security: Application includes robust security measures such as input validation, session management, and data protection.

# Team Contributions
Each team member contributed to the project in various capacities, from backend and frontend development to database administration. Below are the specific roles and contributions for each member:

# Aryan Rahman – Project Manager, Frontend Developer, Database Administrator, Backend Developer
Role as Project Manager: Led the project by coordinating between all team members, managing timelines, and ensuring the successful delivery of the project. Managed the overall flow of the project, delegating tasks, and tracking progress.

Frontend Contributions: Developed the user interface, including team health cards and the analytics dashboard.

Database Administration: Assisted in creating and managing database schema and optimized queries for performance.

Backend Contributions: Worked on backend logic for health check voting and session management.

# Key Contributions:
Project Management: Oversaw the progress of the project, coordinated the team’s efforts, and ensured timely delivery.

UI Design: Developed responsive UI components, such as health cards and team summaries.

Database Optimization: Worked on optimizing database queries for scalability and performance.

Backend Development: Contributed to the logic for health check sessions and user authentication.

# Muhammed Mujib – Backend Developer, Frontend Developer
Backend Development: Designed and developed the core backend logic, including health check voting functionality and session management.

Frontend Development: Worked on integrating the frontend interface with the backend API, ensuring smooth data flow between the two.

# Key Contributions:
Backend Logic: Implemented API endpoints for submitting votes, managing health check sessions, and handling user data.

Frontend Integration: Worked on integrating backend API with frontend components.

Security: Contributed to implementing role-based access control and ensuring secure data handling.

# Waleed Imran – Frontend Developer, Database Administrator, Backend Developer
Frontend Development: Developed components for displaying team health status and visualizations.

Database Administration: Assisted in setting up and optimizing the database for efficient data retrieval.

Backend Development: Contributed to the API logic for health check voting and session management.

# Key Contributions:
UI Development: Created the health card interface and the analytics dashboard.

Database Management: Optimized queries to improve the speed of data retrieval.

API Development: Worked on backend APIs for submitting votes and storing team health data.

# Duane Abbia-Kwakte – Backend Developer, Frontend Developer
Backend Development: Developed and maintained API endpoints to handle the core health check functionality.

Frontend Development: Worked with the team to create dynamic and responsive UI components for displaying team health data.

# Key Contributions:
API Endpoints: Developed API endpoints to handle health check data and interactions.

Frontend Implementation: Collaborated on implementing the UI for submitting health check votes and viewing team summaries.

Gaganpreet – Backend Developer, Frontend Developer
Backend Development: Worked on backend logic and implemented various API endpoints for handling health checks and team data.

Frontend Development: Assisted in developing the frontend components and ensuring smooth interaction with the backend.

Key Contributions:
API Logic: Helped with the implementation of API endpoints for health check data submission.

Frontend Integration: Contributed to the development of interactive UI components and ensured smooth integration with the backend.

 Testing Documentation
Testing played a crucial role in ensuring the stability and reliability of the application. The team performed extensive backend and frontend testing, covering all critical features.

Backend Testing
The backend tests focus on validating API responses, role-based access control, and the voting functionality.

Example API Endpoint Test
python
Copy
Edit
# Example Test: POST /api/votes/
POST /api/votes/
Request:
{
    "session": 1,
    "card": 1,
    "status": "green",
    "trend": "up"
}
Response (200 OK):
{
    "id": 1,
    "user": {
        "id": 1,
        "username": "john.doe",
        "email": "john@example.com"
    },
    "status": "green",
    "trend": "up",
    "created_at": "2024-02-20T10:30:00Z"
}
# Manual Testing Scenarios
User Authentication: Ensured that only authorized users could access specific data, with proper role-based redirects.

Health Check Voting: Tested the voting system, including preventing duplicate votes and ensuring proper vote recording.

Data Access Control: Verified that team leaders, department leaders, and senior managers could access data according to their role permissions.

# Future Improvements
As the application evolves, the following features and improvements are planned:

Real-Time Updates: Integrate WebSockets for real-time updates to the health check voting system.

Advanced Analytics: Implement machine learning to provide insights and predict team health trends.

Export Functionality: Enable users to export health check reports in PDF or CSV formats.

CI/CD Integration: Set up continuous integration and deployment pipelines for automated testing and deployment.

Performance Monitoring: Integrate tools like New Relic or Datadog to monitor application performance.

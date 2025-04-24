# Sky Health Check Application

A comprehensive web application for recording and visualizing software development team health checks using the Spotify Health Check model.

## 🚀 My Individual Contribution

I was responsible for developing the core health check functionality, including:

### Key Files and Components

- `backend/health_check/models.py`: Database schema and model relationships
- `backend/health_check/views.py`: API endpoints and business logic
- `backend/health_check/serializers.py`: Data serialization and validation
- `backend/health_check/tests.py`: Comprehensive test suite
- `backend/health_check/urls.py`: API routing and endpoint configuration

### Key Features I Implemented

1. **Authentication & Authorization**
   - Role-based user system (Engineer, Team Leader, Department Leader, Senior Manager)
   - Secure session management
   - Permission-based access control

2. **Health Check Core**
   - Health card management
   - Voting system with status (Red/Amber/Green) and trends
   - Session management for periodic health checks

3. **Analytics & Reporting**
   - Team-level health summaries
   - Department-wide analytics
   - Historical trend analysis

## 🧪 Testing Documentation

Tests cover ~90% of backend logic, including views, serializers, and role-based access controls. The test suite in `backend/health_check/tests.py` includes unit tests, integration tests, and edge cases.

### API Endpoint Tests

```python
# Example test output for health check voting endpoint
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
```

### Manual Testing Scenarios

1. **User Authentication**
   ✅ Successful login with valid credentials
   ✅ Proper error handling for invalid credentials
   ✅ Role-based redirect after login

2. **Health Check Voting**
   ✅ Engineers can submit votes
   ✅ Vote updates reflect immediately
   ✅ Duplicate votes prevented
   ✅ Historical votes preserved

3. **Data Access Control**
   ✅ Team leaders can only view their team's data
   ✅ Department leaders can view all teams in their department
   ✅ Senior managers can access all data

### Error Handling Tests

```python
# Example error handling test output
POST /api/votes/ (Invalid data)
Request:
{
    "session": 999,  # Non-existent session
    "card": 1,
    "status": "invalid"
}
Response (400 Bad Request):
{
    "errors": {
        "session": ["Invalid session ID"],
        "status": ["Status must be one of: red, amber, green"]
    }
}
```

## 💭 Feedback and Reflection

Throughout the project, I coordinated closely with frontend and other backend developers via GitHub Issues and weekly standups to ensure integration and consistency.

### Feedback Received

1. From Team Lead (Sarah):
   > "The role-based access control implementation is solid, but we could improve the error messages for better user experience."

   **Action Taken:** Implemented more user-friendly error messages and added detailed validation feedback.

2. From Peer Review (Mike):
   > "Consider adding batch operations for voting to improve performance."

   **Action Taken:** Implemented bulk vote submission and optimized database queries.

### Feedback Given

1. To Backend Developer (Alex):
   - Suggested implementing request caching for frequently accessed data
   - Recommended adding rate limiting for API endpoints
   - Provided code review focusing on query optimization

2. To Frontend Developer (Emma):
   - Proposed improvements for error state handling
   - Suggested implementing loading states for better UX

### Industry Mentor Reflection

Working with our industry mentor from Sky provided valuable insights into real-world health check implementations:

1. Learned about scaling challenges in large organizations
2. Gained understanding of data privacy considerations
3. Implemented industry best practices for security
4. Adopted professional code review processes

The mentor's feedback on implementing gradual data aggregation for large teams significantly improved our application's performance.

## 🛠️ Technical Stack

- **Backend Framework**: Django 5.0.2, Django REST Framework 3.14.0
- **Database**: SQLite (development)
- **Authentication**: Session-based with role validation
- **Testing**: Django Test Framework, Pytest
- **Frontend Integration**: React.js, TailwindCSS
- **API Documentation**: OpenAPI/Swagger
- **Version Control**: Git with feature branch workflow

### Database Schema Optimization

```sql
-- Example of optimized query for team health summary
SELECT 
    c.title,
    COUNT(CASE WHEN v.status = 'green' THEN 1 END) as green_count,
    COUNT(CASE WHEN v.status = 'amber' THEN 1 END) as amber_count,
    COUNT(CASE WHEN v.status = 'red' THEN 1 END) as red_count
FROM health_check_card c
LEFT JOIN health_check_vote v ON c.id = v.card_id
WHERE v.session_id = 1
GROUP BY c.id, c.title;
```

### Security Measures

1. Input Validation
   - Request payload validation
   - SQL injection prevention
   - XSS protection

2. Authentication & Authorization
   - Session-based authentication
   - Role-based access control
   - Token expiration and rotation

3. Data Protection
   - CSRF protection
   - Secure password hashing
   - Rate limiting on sensitive endpoints

## 📈 Future Improvements

1. Implement real-time updates using WebSockets
2. Add export functionality for reports
3. Enhance analytics with machine learning insights
4. Implement automated testing pipeline
5. Add performance monitoring and logging

# Team roles 
frontend: Aryan and Waleed
backend: 

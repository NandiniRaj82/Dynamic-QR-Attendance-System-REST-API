const STUDENT_DATA_API = "/api/v1/professors/getAllStudentsWithCourse?courseId=2";

async function fetchAndDisplayStudentData() {
    try {
        // Fetch stuff from the API
        const response = await fetch(STUDENT_DATA_API);
        
        // Error handling for invalid status codes
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const apiData = await response.json();

        //  students array 
        const students = apiData.students;

        //  table body 
        const tableBody = document.getElementById('attendance-data');

        // Clear any existing data in the table
        tableBody.innerHTML = '';

        
        students.forEach((studentObj, index) => {
            const student = studentObj.studentData;  

           
            const row = document.createElement('tr');

            
            const nameCell = document.createElement('td');
            nameCell.textContent = student.fullName;

           
            const idCell = document.createElement('td');
            idCell.textContent = student.studentId;

            
            const emailCell = document.createElement('td');
            emailCell.textContent = student.email;

            
            const mobileCell = document.createElement('td');
            mobileCell.textContent = student.mobileNo;

            
            const actionCell = document.createElement('td');
            const button = document.createElement('button');
            button.textContent = "Click for Attendance Details";
            button.setAttribute('data-index', index);  

            
            const attendanceDetails = document.createElement('div');
            attendanceDetails.className = 'attendance-details';
            attendanceDetails.setAttribute('id', `attendance-${index}`); 

            
            button.addEventListener('click', function () {
                const studentIndex = this.getAttribute('data-index');
                const attendanceDiv = document.getElementById(`attendance-${studentIndex}`);
                if (attendanceDiv.style.display === 'none' || attendanceDiv.style.display === '') {
                    
                    attendanceDiv.style.display = 'block';
                    const attendanceInfo = studentObj.attendance.map((att, index) => `
                        <h4>Subject: ${att.classSchedule.classTopic}</h4>
                        <p>Date: ${new Date(att.classSchedule.scheduledDate).toLocaleDateString()}</p>
                        <p>Status: ${att.status}</p>
                        <p>Duration: ${att.classSchedule.duration} minutes</p>
                        <hr>
                    `).join('');
                    attendanceDiv.innerHTML = attendanceInfo;
                } else {
                    
                    attendanceDiv.style.display = 'none';
                }
            });

           
            actionCell.appendChild(button);

            
            row.appendChild(nameCell);
            row.appendChild(idCell);
            row.appendChild(emailCell);
            row.appendChild(mobileCell);
            row.appendChild(actionCell);

           
            tableBody.appendChild(row);

            
            tableBody.appendChild(attendanceDetails);
        });

    } catch (error) {
        console.error("Error fetching or displaying the data: ", error);
    }
}

fetchAndDisplayStudentData();
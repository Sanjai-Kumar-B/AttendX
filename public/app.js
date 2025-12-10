// Global variables
let eeeStaffData = [];
let currentPeriod = 1;
let staffScheduleData = {};
let currentDay = '';

// Department timetable data - EEE Department
const eeeTimetable = {
  "II-A": [
    { staff: "Mrs.C.Rajeswari", designation: "APEEE", subjects: ["Electromagnetic field theory", "Knowledge Demonstration - I"] },
    { staff: "Mr.K.Vinoth Bresnav", designation: "APEEE", subjects: ["DC Machines & Transformers", "DC Machines & Transformers Laboratory"] },
    { staff: "Mrs.C.Vaishnavi", designation: "APEEE", subjects: ["Electronic Devices and Circuits"] },
    { staff: "Mr.R.Gunasekaran", designation: "APEEE", subjects: ["Electronic Devices and Circuits"] },
    { staff: "Mr.P.Basker", designation: "APMATHS", subjects: ["Transforms and Boundary Value Problems"] },
    { staff: "Byte XL Faculty- 6", designation: "External", subjects: ["Programming in C and C++", "Programming in C and C++ Laboratory"] },
    { staff: "Mrs.K.Malathi", designation: "APEnglish", subjects: ["Universal Human Values"] },
    { staff: "Mrs.V.Banureka", designation: "APEEE", subjects: ["DC Machines & Transformers Laboratory"] },
    { staff: "Ms.Sriharini", designation: "APEnglish", subjects: ["Interpersonal Skills"] },
    { staff: "Placement Trainer -B", designation: "External", subjects: ["Placement Training"] }
  ],
  "II-B": [
    { staff: "Mrs.C.Rajeswari", designation: "APEEE", subjects: ["Electromagnetic field theory"] },
    { staff: "Mr.K.Vinoth Bresnav", designation: "APEEE", subjects: ["DC Machines & Transformers"] },
    { staff: "Mrs.C.Vaishnavi", designation: "APEEE", subjects: ["Electronic Devices and Circuits"] },
    { staff: "Mrs.T.Nandhini Priya", designation: "APEEE", subjects: ["Electronic Devices and Circuits"] },
    { staff: "Mr.P.Basker", designation: "APMATHS", subjects: ["Transforms and Boundary Value Problems"] },
    { staff: "Mrs.A.G.Devipriya", designation: "APEEE", subjects: ["Programming in C and C++"] },
    { staff: "Dr.A.Jeevanandham", designation: "DEANSECE", subjects: ["Universal Human Values"] },
    { staff: "Mr.M.K.Anandkumar", designation: "APEEE", subjects: ["DC Machines & Transformers Laboratory", "Programming in C and C++ Laboratory"] },
    { staff: "Dr.K.Muthuvel", designation: "APEEE", subjects: ["DC Machines & Transformers Laboratory", "Programming in C and C++ Laboratory"] },
    { staff: "Mrs.K.Malathi", designation: "APEnglish", subjects: ["Interpersonal Skills"] },
    { staff: "Mrs.V.Banureka", designation: "APEEE", subjects: ["Knowledge Demonstration - I"] },
    { staff: "Placement Trainer –B", designation: "External", subjects: ["Placement Training"] },
    { staff: "Placement Trainer –E", designation: "External", subjects: ["Placement Training"] }
  ],
  "III": [
    { staff: "Dr.G.Srinivasan", designation: "HoDEEE", subjects: ["Transmission and Distribution", "Power System Operation and Control"] },
    { staff: "Mrs.T.Nandhinipriya", designation: "APEEE", subjects: ["Power Electronics", "Power Electronics Laboratory", "Protection and Switch Gear", "Library"] },
    { staff: "Dr.K.Muthuvel", designation: "APEEE", subjects: ["Electric Machine Design", "Special Electrical Machines"] },
    { staff: "Mrs.M.K.Anandkumar", designation: "APEEE", subjects: ["Control System", "Power Electronics for Renewable Energy Systems"] },
    { staff: "Ms.K.S.Nanthini", designation: "APEEE", subjects: ["Embedded Systems and IoT", "Power Quality"] },
    { staff: "Dr.C.Augustine Crispin", designation: "APCivil", subjects: ["Solid Waste Management"] },
    { staff: "Mrs.C.Rajeswari", designation: "APEEE", subjects: ["Power Electronics Laboratory"] },
    { staff: "Mr.K.Vinoth Bresnav", designation: "APEEE", subjects: ["Indian Constitution"] },
    { staff: "Mrs.A.G.Devipriya", designation: "APEEE", subjects: ["Knowledge Demonstration - III", "Social Media"] },
    { staff: "Mrs.V.Banureka", designation: "APEEE", subjects: ["Power System Operation and Control"] },
    { staff: "Mrs.K.Poornima", designation: "APCIVIL", subjects: ["Environmental Impact Assessment and Clean Technology"] },
    { staff: "Dr.R.Gunasekaran", designation: "APEEE", subjects: ["Design Project"] },
    { staff: "Mrs.R.Asha", designation: "APEEE", subjects: ["Seminar"] }
  ],
  "IV": [
    { staff: "Mrs.T.Nandhinipriya", designation: "APEEE", subjects: ["Protection and Switch Gear", "Library"] },
    { staff: "Dr.K.Muthuvel", designation: "APEEE", subjects: ["Special Electrical Machines"] },
    { staff: "Mrs.V.Banureka", designation: "APEEE", subjects: ["Power System Operation and Control"] },
    { staff: "Dr.G.Srinivasan", designation: "HoDEEE", subjects: ["Power System Operation and Control"] },
    { staff: "Ms.K.S.Nanthini", designation: "APEEE", subjects: ["Power Quality"] },
    { staff: "Mr.M.K.Anandkumar", designation: "APEEE", subjects: ["Power Electronics for Renewable Energy Systems"] },
    { staff: "Mrs.K.Poornima", designation: "APCIVIL", subjects: ["Environmental Impact Assessment and Clean Technology"] },
    { staff: "Dr.R.Gunasekaran", designation: "APEEE", subjects: ["Design Project"] },
    { staff: "Mrs.R.Asha", designation: "APEEE", subjects: ["Seminar"] }
  ]
};

// Period timings for different year groups
const periodTimingsYear2 = {
  1: "9:25 AM - 10:15 AM",
  2: "10:15 AM - 11:00 AM", 
  3: "11:25 AM - 12:10 PM",
  4: "12:10 PM - 1:00 PM",
  5: "1:50 PM - 2:40 PM",
  6: "2:40 PM - 3:30 PM",
  7: "3:40 PM - 4:30 PM"
};

const periodTimingsYear3 = {
  1: "9:25 AM - 10:15 AM",
  2: "10:15 AM - 11:00 AM", 
  3: "11:25 AM - 12:10 PM",
  4: "12:10 PM - 1:00 PM",
  5: "1:50 PM - 2:40 PM",
  6: "2:40 PM - 2:50 PM",
  7: "3:40 PM - 4:30 PM"
};

const periodTimingsYear4 = {
  1: "9:25 AM - 10:15 AM",
  2: "10:15 AM - 11:00 AM", 
  3: "11:25 AM - 12:10 PM",
  4: "12:10 PM - 1:00 PM",
  5: "1:50 PM - 2:40 PM",
  6: "2:40 PM - 3:30 PM",
  7: "3:40 PM - 4:30 PM"
};

// Map staff to their year groups based on timetable
const staffYearMapping = {
  // Year II staff (teaching Year II only or Year II + others)
  "Mrs.C.Rajeswari": [2, 3, 4],
  "Mr.K.Vinoth Bresnav": [2, 3, 4],
  "Mrs.C.Vaishnavi": [2],
  "Mr.R.Gunasekaran": [2, 3, 4],
  "Mrs.T.Nandhini Priya": [2, 3, 4],
  "Mr.P.Basker": [2],
  "Byte XL Faculty- 6": [2],
  "Mrs.K.Malathi": [2],
  "Mrs.V.Banureka": [2, 3, 4],
  "Ms.Sriharini": [2],
  "Mrs.A.G.Devipriya": [2, 3],
  "Dr.A.Jeevanandham": [2],
  "Mr.M.K.Anandkumar": [2, 3, 4],
  "Dr.K.Muthuvel": [2, 3, 4],
  // Year III & IV staff
  "Dr.G.Srinivasan": [3, 4],
  "Ms.K.S.Nanthini": [3, 4],
  "Dr.C.Augustine Crispin": [3],
  "Mrs.K.Poornima": [3, 4],
  "Mrs.R.Asha": [3, 4]
};

// Detailed staff schedule data from CSV
const staffPeriodSchedule = {
  "Mrs.C.Rajeswari": {
    "MON": [2, 4], "TUE": [], "WED": [4, 7], "THU": [4], "FRI": [1, 6, 7], "SAT": [1, 2]
  },
  "Mr.K.Vinoth Bresnav": {
    "MON": [1, 6], "TUE": [1, 5, 7], "WED": [4, 5, 6], "THU": [1, 3, 4, 6], "FRI": [5, 7], "SAT": []
  },
  "Mrs.C.Vaishnavi": {
    "MON": [1], "TUE": [1, 7], "WED": [3], "THU": [], "FRI": [2, 7], "SAT": []
  },
  "Mr.R.Gunasekaran": {
    "MON": [1, 5, 6], "TUE": [7], "WED": [], "THU": [], "FRI": [2], "SAT": []
  },
  "Mrs.T.Nandhini Priya": {
    "MON": [1, 4], "TUE": [1, 3, 7], "WED": [1, 3, 7], "THU": [4, 7], "FRI": [2, 6, 7], "SAT": []
  },
  "Mr.P.Basker": {
    "MON": [3, 4, 5], "TUE": [4], "WED": [1], "THU": [1, 2, 3, 7], "FRI": [1], "SAT": []
  },
  "Byte XL Faculty- 6": {
    "MON": [], "TUE": [], "WED": [], "THU": [2], "FRI": [3, 4, 5, 6], "SAT": []
  },
  "Mrs.K.Malathi": {
    "MON": [], "TUE": [2, 5, 6], "WED": [2, 7], "THU": [], "FRI": [], "SAT": [1, 2]
  },
  "Mrs.V.Banureka": {
    "MON": [5, 6, 7], "TUE": [1, 2, 6], "WED": [1, 5, 6], "THU": [3, 4, 6], "FRI": [2], "SAT": []
  },
  "Ms.Sriharini": {
    "MON": [], "TUE": [5, 6], "WED": [], "THU": [], "FRI": [], "SAT": []
  },
  "Mrs.A.G.Devipriya": {
    "MON": [7], "TUE": [3], "WED": [1, 2], "THU": [4, 5], "FRI": [1, 6], "SAT": []
  },
  "Dr.A.Jeevanandham": {
    "MON": [2], "TUE": [2], "WED": [], "THU": [], "FRI": [2], "SAT": []
  },
  "Mr.M.K.Anandkumar": {
    "MON": [2, 5], "TUE": [1, 3, 5, 6], "WED": [1, 2, 4, 5, 6, 7], "THU": [1, 5, 6, 7], "FRI": [3, 6], "SAT": []
  },
  "Dr.K.Muthuvel": {
    "MON": [1, 3, 6], "TUE": [2, 4, 5, 6], "WED": [1, 2, 3, 5], "THU": [3, 5, 6], "FRI": [4, 7], "SAT": []
  },
  "Dr.G.Srinivasan": {
    "MON": [2, 7], "TUE": [1, 2, 6, 7], "WED": [1, 2], "THU": [2, 6], "FRI": [2], "SAT": []
  },
  "Ms.K.S.Nanthini": {
    "MON": [4, 7], "TUE": [4, 5], "WED": [6], "THU": [1, 3, 5], "FRI": [1], "SAT": []
  },
  "Dr.C.Augustine Crispin": {
    "MON": [3], "TUE": [], "WED": [2, 4], "THU": [2], "FRI": [3, 5], "SAT": []
  },
  "Mrs.K.Poornima": {
    "MON": [], "TUE": [7], "WED": [2], "THU": [2], "FRI": [5], "SAT": []
  },
  "Mrs.R.Asha": {
    "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [4], "SAT": []
  },
  "Placement Trainer -B": {
    "MON": [3, 7], "TUE": [3, 4], "WED": [3, 5, 6], "THU": [5, 6, 7], "FRI": [3, 4], "SAT": []
  },
  "Placement Trainer –B": {
    "MON": [], "TUE": [], "WED": [5, 6], "THU": [7], "FRI": [3, 4], "SAT": []
  },
  "Placement Trainer –E": {
    "MON": [3], "TUE": [], "WED": [], "THU": [], "FRI": [], "SAT": []
  }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateCurrentPeriod();
    setInterval(updateCurrentPeriod, 60000); // Update every minute
    
    // Set current day
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    currentDay = days[new Date().getDay()];
});

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    document.getElementById('currentDateTime').textContent = now.toLocaleDateString('en-US', options);
    
    // Update current time in period info
    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    const currentTimeElement = document.getElementById('currentTime');
    if (currentTimeElement) {
        currentTimeElement.textContent = now.toLocaleTimeString('en-US', timeOptions);
    }
}

function updateCurrentPeriod() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes; // Convert to minutes since midnight
    
    // Define period times in minutes since midnight
    // Years II & IV Schedule
    const periodsYears2And4 = {
        1: { start: 9 * 60 + 25, end: 10 * 60 + 15 },      // 9:25 AM - 10:15 AM
        2: { start: 10 * 60 + 15, end: 11 * 60 },          // 10:15 AM - 11:00 AM
        3: { start: 11 * 60 + 25, end: 12 * 60 + 10 },     // 11:25 AM - 12:10 PM
        4: { start: 12 * 60 + 10, end: 13 * 60 },          // 12:10 PM - 1:00 PM
        5: { start: 13 * 60 + 50, end: 14 * 60 + 40 },     // 1:50 PM - 2:40 PM
        6: { start: 14 * 60 + 40, end: 15 * 60 + 30 },     // 2:40 PM - 3:30 PM
        7: { start: 15 * 60 + 40, end: 16 * 60 + 30 }      // 3:40 PM - 4:30 PM
    };
    
    // Year III Schedule
    const periodsYear3 = {
        1: { start: 9 * 60 + 25, end: 10 * 60 + 15 },      // 9:25 AM - 10:15 AM
        2: { start: 10 * 60 + 15, end: 11 * 60 },          // 10:15 AM - 11:00 AM
        3: { start: 11 * 60 + 25, end: 12 * 60 + 10 },     // 11:25 AM - 12:10 PM
        4: { start: 12 * 60 + 10, end: 13 * 60 },          // 12:10 PM - 1:00 PM
        5: { start: 13 * 60 + 50, end: 14 * 60 + 40 },     // 1:50 PM - 2:40 PM
        6: { start: 14 * 60 + 40, end: 14 * 60 + 50 },     // 2:40 PM - 2:50 PM
        7: { start: 15 * 60 + 40, end: 16 * 60 + 30 }      // 3:40 PM - 4:30 PM
    };
    
    // Use Years II & IV schedule as default (most common)
    const periods = periodsYears2And4;
    
    for (let period in periods) {
        if (currentTime >= periods[period].start && currentTime < periods[period].end) {
            currentPeriod = parseInt(period);
            const currentPeriodElement = document.getElementById('currentPeriod');
            if (currentPeriodElement) {
                // Show timings for all three years
                const timing2 = periodTimingsYear2[period];
                const timing3 = periodTimingsYear3[period];
                const timing4 = periodTimingsYear4[period];
                
                if (timing2 === timing3 && timing3 === timing4) {
                    // All same timing
                    currentPeriodElement.textContent = `${period} (${timing2})`;
                } else if (timing2 === timing4) {
                    // Year 2 and 4 same, Year 3 different
                    currentPeriodElement.textContent = `${period} (Yr II/IV: ${timing2} | Yr III: ${timing3})`;
                } else {
                    // All different (show all three)
                    currentPeriodElement.textContent = `${period} (Yr II: ${timing2} | Yr III: ${timing3} | Yr IV: ${timing4})`;
                }
            }
            // Update staff availability when period changes
            if (document.getElementById('departmentSelect').value === 'EEE') {
                displayStaffStatus();
            }
            return;
        }
    }
    
    // If not in any period, show as break time
    currentPeriod = 0;
    const currentPeriodElement = document.getElementById('currentPeriod');
    if (currentPeriodElement) {
        currentPeriodElement.textContent = "Break Time";
    }
    // Update staff availability during break time
    if (document.getElementById('departmentSelect').value === 'EEE') {
        displayStaffStatus();
    }
}

function loadDepartmentData() {
    const department = document.getElementById('departmentSelect').value;
    
    if (!department) {
        document.getElementById('staffStatusContainer').style.display = 'none';
        document.getElementById('welcomeMessage').style.display = 'block';
        return;
    }
    
    document.getElementById('welcomeMessage').style.display = 'none';
    document.getElementById('staffStatusContainer').style.display = 'block';
    
    if (department === 'EEE') {
        processEEEData();
    } else {
        // For ECE and BME - show coming soon
        document.getElementById('availableStaff').innerHTML = 
            '<div class="alert alert-info"><i class="fas fa-clock me-2"></i>Timetable data will be integrated soon.</div>';
        document.getElementById('busyStaff').innerHTML = 
            '<div class="alert alert-info"><i class="fas fa-clock me-2"></i>Timetable data will be integrated soon.</div>';
        document.getElementById('todaySchedule').innerHTML = 
            '<div class="alert alert-info"><i class="fas fa-clock me-2"></i>Schedule will be available once timetable is integrated.</div>';
        
        // Reset counters
        document.getElementById('availableCount').textContent = '0';
        document.getElementById('busyCount').textContent = '0';
    }
}

function processEEEData() {
    // Extract all unique staff from EEE timetable
    const allStaff = new Set();
    const staffSubjects = {};
    
    Object.keys(eeeTimetable).forEach(year => {
        eeeTimetable[year].forEach(entry => {
            allStaff.add(entry.staff);
            if (!staffSubjects[entry.staff]) {
                staffSubjects[entry.staff] = {
                    designation: entry.designation,
                    subjects: new Set()
                };
            }
            entry.subjects.forEach(subject => {
                staffSubjects[entry.staff].subjects.add(subject);
            });
        });
    });
    
    // Convert to array and add subject count
    eeeStaffData = Array.from(allStaff).map(staffName => ({
        name: staffName,
        designation: staffSubjects[staffName].designation,
        subjects: Array.from(staffSubjects[staffName].subjects),
        subjectCount: staffSubjects[staffName].subjects.size
    }));
    
    displayStaffStatus();
    displayTodaySchedule();
}

function displayStaffStatus() {
    // Get current day and period
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    
    const availableStaff = [];
    const busyStaff = [];
    
    eeeStaffData.forEach(staff => {
        const staffSchedule = staffPeriodSchedule[staff.name];
        if (!staffSchedule) {
            // If no schedule data, assume available
            availableStaff.push(staff);
            return;
        }
        
        const todaySchedule = staffSchedule[today] || [];
        
        if (currentPeriod === 0 || !todaySchedule.includes(currentPeriod)) {
            // Staff is free during break time or not scheduled for current period
            availableStaff.push(staff);
        } else {
            // Staff is busy in current period
            busyStaff.push(staff);
        }
    });
    
    // Update counters
    document.getElementById('availableCount').textContent = availableStaff.length;
    document.getElementById('busyCount').textContent = busyStaff.length;
    
    // Display available staff
    let availableHTML = '';
    if (availableStaff.length === 0) {
        availableHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>No staff available at the moment.</div>';
    } else {
        availableStaff.forEach(staff => {
            const nextClass = getNextClass(staff.name, today);
            availableHTML += `
                <div class="staff-card mb-2 p-3 bg-light rounded border-start border-success border-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1 text-success"><i class="fas fa-check-circle me-1"></i>${staff.name}</h6>
                            <small class="text-muted">${staff.designation}</small>
                            ${nextClass ? `<br><small class="text-warning"><i class="fas fa-clock me-1"></i>Next: ${nextClass}</small>` : ''}
                        </div>
                        <div class="text-end">
                            <span class="badge bg-success">Available</span>
                            <small class="d-block text-muted">${staff.subjectCount} subjects</small>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    // Display busy staff
    let busyHTML = '';
    if (busyStaff.length === 0) {
        if (currentPeriod === 0) {
            busyHTML = '<div class="alert alert-success"><i class="fas fa-coffee me-2"></i>All staff are free during break time.</div>';
        } else {
            busyHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>No staff are currently in classes.</div>';
        }
    } else {
        busyStaff.forEach(staff => {
            const currentSubject = getCurrentSubject(staff.name, today, currentPeriod);
            busyHTML += `
                <div class="staff-card mb-2 p-3 bg-light rounded border-start border-danger border-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-1 text-danger"><i class="fas fa-chalkboard-teacher me-1"></i>${staff.name}</h6>
                            <small class="text-muted">${staff.designation}</small>
                            ${currentSubject ? `<br><small class="text-primary"><i class="fas fa-book me-1"></i>Teaching: ${currentSubject}</small>` : ''}
                        </div>
                        <div class="text-end">
                            <span class="badge bg-danger">In Class</span>
                            <small class="d-block text-muted">Period ${currentPeriod}</small>
                        </div>
                    </div>
                </div>
            `;
        });
    }
    
    document.getElementById('availableStaff').innerHTML = availableHTML;
    document.getElementById('busyStaff').innerHTML = busyHTML;
}

function getNextClass(staffName, today) {
    const staffSchedule = staffPeriodSchedule[staffName];
    if (!staffSchedule || !staffSchedule[today]) return null;
    
    const todaySchedule = staffSchedule[today];
    const nextPeriod = todaySchedule.find(period => period > currentPeriod);
    
    if (nextPeriod) {
        const timing = getPeriodTiming(staffName, nextPeriod);
        return `Period ${nextPeriod} (${timing})`;
    }
    return null;
}

// Helper function to get period timing based on staff's year group
function getPeriodTiming(staffName, period) {
    const yearGroups = staffYearMapping[staffName] || [2, 4];
    
    // Determine which timing to show based on primary year group
    if (yearGroups.includes(3) && yearGroups.length === 1) {
        // Teaching only Year 3
        return periodTimingsYear3[period];
    } else if (yearGroups.includes(4) && !yearGroups.includes(2) && !yearGroups.includes(3)) {
        // Teaching only Year 4
        return periodTimingsYear4[period];
    } else if (yearGroups.includes(2) || (yearGroups.includes(2) && yearGroups.includes(4))) {
        // Teaching Year 2 or both Year 2 & 4
        return periodTimingsYear2[period];
    } else {
        // Default to Year 2 timing
        return periodTimingsYear2[period];
    }
}

function getCurrentSubject(staffName, today, period) {
    // This would typically come from a subject mapping
    // For now, return a generic subject from the staff's subject list
    const staff = eeeStaffData.find(s => s.name === staffName);
    if (staff && staff.subjects && staff.subjects.length > 0) {
        return staff.subjects[0]; // Return first subject as example
    }
    return 'Class';
}

function displayTodaySchedule() {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    const todayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()];
    
    let scheduleHTML = `
        <div class="alert alert-primary">
            <h5 class="mb-2"><i class="fas fa-calendar-day me-2"></i>Today's Schedule - ${todayName}</h5>
            <small>Current Period: ${currentPeriod === 0 ? 'Break Time' : `Period ${currentPeriod} (${periodTimingsYear2[currentPeriod]})`}</small>
        </div>
        
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Staff Name</th>
                        <th>Designation</th>
                        <th>Today's Periods</th>
                        <th>Current Status</th>
                        <th>Total Subjects</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    eeeStaffData
        .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
        .forEach(staff => {
            const staffSchedule = staffPeriodSchedule[staff.name];
            const todayPeriods = staffSchedule && staffSchedule[today] ? staffSchedule[today] : [];
            
            let statusBadge = '';
            let statusClass = '';
            
            if (currentPeriod === 0) {
                statusBadge = '<span class="badge bg-success">Free (Break Time)</span>';
                statusClass = 'table-success';
            } else if (todayPeriods.includes(currentPeriod)) {
                statusBadge = '<span class="badge bg-danger">Teaching</span>';
                statusClass = 'table-danger';
            } else {
                statusBadge = '<span class="badge bg-warning text-dark">Available</span>';
                statusClass = 'table-warning';
            }
            
            const periodsDisplay = todayPeriods.length > 0 
                ? todayPeriods.map(p => {
                    const isCurrentPeriod = p === currentPeriod;
                    const badgeClass = isCurrentPeriod ? 'bg-primary' : 'bg-secondary';
                    return `<span class="badge ${badgeClass} me-1">${p}</span>`;
                  }).join('')
                : '<span class="text-muted">No classes today</span>';
            
            scheduleHTML += `
                <tr class="${statusClass}">
                    <td><strong>${staff.name}</strong></td>
                    <td><span class="badge bg-primary">${staff.designation}</span></td>
                    <td>${periodsDisplay}</td>
                    <td>${statusBadge}</td>
                    <td><span class="badge bg-info">${staff.subjectCount}</span></td>
                </tr>
            `;
        });
    
    scheduleHTML += `
                </tbody>
            </table>
        </div>
        
        <div class="row mt-3">
            <div class="col-md-6">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                        <h6 class="mb-0"><i class="fas fa-clock me-2"></i>Period Schedule</h6>
                    </div>
                    <div class="card-body">
                        <small>
    `;
    
    for (let period = 1; period <= 7; period++) {
        const isCurrentPeriod = period === currentPeriod;
        const badgeClass = isCurrentPeriod ? 'bg-primary' : 'bg-secondary';
        const timing2 = periodTimingsYear2[period];
        const timing3 = periodTimingsYear3[period];
        const timing4 = periodTimingsYear4[period];
        
        if (timing2 === timing3 && timing3 === timing4) {
            // All years have same timing
            scheduleHTML += `<span class="badge ${badgeClass} me-1 mb-1">Period ${period}: ${timing2}</span><br>`;
        } else if (timing2 === timing4) {
            // Year 2 and 4 same, Year 3 different
            scheduleHTML += `<span class="badge ${badgeClass} me-1 mb-1">Period ${period}: Yr II/IV: ${timing2} | Yr III: ${timing3}</span><br>`;
        } else {
            // All different
            scheduleHTML += `<span class="badge ${badgeClass} me-1 mb-1">Period ${period}: Yr II: ${timing2} | Yr III: ${timing3} | Yr IV: ${timing4}</span><br>`;
        }
    }
    
    scheduleHTML += `
                        </small>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card border-info">
                    <div class="card-header bg-info text-white">
                        <h6 class="mb-0"><i class="fas fa-chart-pie me-2"></i>Today's Statistics</h6>
                    </div>
                    <div class="card-body">
                        <div class="row text-center">
                            <div class="col-4">
                                <div class="border-end">
                                    <h4 class="text-success" id="availableToday">${document.getElementById('availableCount').textContent}</h4>
                                    <small class="text-muted">Available</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="border-end">
                                    <h4 class="text-danger" id="busyToday">${document.getElementById('busyCount').textContent}</h4>
                                    <small class="text-muted">In Class</small>
                                </div>
                            </div>
                            <div class="col-4">
                                <h4 class="text-primary">${eeeStaffData.length}</h4>
                                <small class="text-muted">Total Staff</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('todaySchedule').innerHTML = scheduleHTML;
}

function renderStaffList() {
    const container = document.getElementById('staffList');
    if (staffData.length === 0) {
        container.innerHTML = '<div class=\"alert alert-info text-center\"><i class=\"fas fa-info-circle me-2\"></i>No staff members added yet. Add your first staff member above.</div>';
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th><i class="fas fa-id-card me-1"></i>Staff ID</th>
                        <th><i class="fas fa-user me-1"></i>Name</th>
                        <th><i class="fas fa-building me-1"></i>Department</th>
                        <th><i class="fas fa-cogs me-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    staffData.forEach(staff => {
        html += `<tr>
            <td><span class="badge bg-primary">${staff.id}</span></td>
            <td><strong>${staff.name}</strong></td>
            <td>${staff.designation || staff.department}</td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteStaff('${staff.id}')" title="Delete">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </td>
        </tr>`;
    });
    html += '</tbody></table></div>';
    
    container.innerHTML = html;
}

function filterStaff() {
    renderStaffList();
}

function updateStaffSelects() {
    const selects = ['staffSelect', 'reportStaff', 'timetableFilterStaff'];
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const currentValue = select.value;
        select.innerHTML = selectId === 'reportStaff' ? '<option value="">All Staff</option>' : '<option value="">Select Staff</option>';
        
        staffData.forEach(staff => {
            select.innerHTML += `<option value="${staff.id}">${staff.name} (${staff.id})</option>`;
        });
        
        if (currentValue) select.value = currentValue;
    });
}

function updateDepartmentFilters() {
    const departments = [...new Set(staffData.map(s => s.department))];
    const selects = ['departmentFilter', 'attendanceDepartment', 'reportDepartment'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const currentValue = select.value;
        select.innerHTML = '<option value="">All Departments</option>';
        
        departments.forEach(dept => {
            select.innerHTML += `<option value="${dept}">${dept}</option>`;
        });
        
        if (currentValue) select.value = currentValue;
    });
}

function editStaff(staffId) {
    const staff = staffData.find(s => s.id === staffId);
    if (!staff) return;
    
    document.getElementById('staffId').value = staff.id;
    document.getElementById('staffName').value = staff.name;
    document.getElementById('staffDepartment').value = staff.department;
    document.getElementById('staffEmail').value = staff.email || '';
    document.getElementById('staffDesignation').value = staff.designation || '';
    document.getElementById('staffPhone').value = staff.phone || '';
    
    // Change button text temporarily
    const submitBtn = document.querySelector('#staffForm button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-save me-1"></i>Update Staff';
    
    // Scroll to form
    document.getElementById('staffForm').scrollIntoView({ behavior: 'smooth' });
}

async function deleteStaff(staffId) {
    const staff = staffData.find(s => s.id === staffId);
    if (!staff) return;
    
    if (confirm(`Are you sure you want to delete ${staff.name}? This will also remove all their timetable entries.`)) {
        // Remove from staff data
        staffData = staffData.filter(s => s.id !== staffId);
        
        // Remove from timetable data
        timetableData = timetableData.filter(t => t.staffId !== staffId);
        
        // Save both
        await Promise.all([
            apiPost('/api/staff', staffData),
            apiPost('/api/timetable', timetableData)
        ]);
        
        await loadStaff();
        await loadTimetable();
        showAlert(`Staff member ${staff.name} deleted successfully.`, 'success');
    }
}

// Timetable Management
async function loadTimetable() {
    timetableData = await apiGet('/api/timetable');
    filteredTimetableData = [...timetableData];
    renderTimetableList();
}

async function addTimetableEntry() {
    const period = document.getElementById('period').value;
    const className = document.getElementById('className').value.trim();
    const staffId = document.getElementById('staffSelect').value;
    const dayOfWeek = document.getElementById('dayOfWeek').value;
    const subject = document.getElementById('subject').value.trim();
    const venue = document.getElementById('venue').value.trim();
    
    const staff = staffData.find(s => s.id === staffId);
    const entry = {
        id: Date.now().toString(),
        period: parseInt(period),
        className,
        staffId,
        staffName: staff.name,
        dayOfWeek,
        subject: subject || 'General',
        venue: venue || `Room ${Math.floor(Math.random() * 20) + 201}`,
        timeSlot: getTimeSlot(parseInt(period)),
        isLab: subject.toLowerCase().includes('lab')
    };
    
    timetableData.push(entry);
    const result = await apiPost('/api/timetable', timetableData);
    
    if (result.success) {
        // Clear form
        document.getElementById('timetableForm').reset();
        document.getElementById('timetableForm').classList.remove('was-validated');
        
        // Reload timetable
        await loadTimetable();
        showAlert(`Timetable entry added successfully for ${staff.name}!`, 'success');
    }
}

function getTimeSlot(period) {
    const timeSlots = {
        1: '9:00-9:50 AM',
        2: '9:50-10:40 AM', 
        3: '11:00-11:50 AM',
        4: '11:50-12:40 PM',
        5: '1:30-2:20 PM',
        6: '2:20-3:10 PM',
        7: '3:10-4:00 PM',
        8: '4:00-4:50 PM'
    };
    return timeSlots[period] || '';
}

function renderTimetableList() {
    const container = document.getElementById('timetableList');
    if (filteredTimetableData.length === 0) {
        container.innerHTML = '<div class=\"alert alert-info\"><i class=\"fas fa-info-circle me-2\"></i>No timetable entries found.</div>';
        return;
    }
    
    let html = `
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th><i class="fas fa-calendar me-1"></i>Day</th>
                        <th><i class="fas fa-clock me-1"></i>Period</th>
                        <th><i class="fas fa-users me-1"></i>Class</th>
                        <th><i class="fas fa-user me-1"></i>Staff</th>
                        <th><i class="fas fa-book me-1"></i>Subject</th>
                        <th><i class="fas fa-map-marker-alt me-1"></i>Venue</th>
                        <th><i class="fas fa-cogs me-1"></i>Actions</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    filteredTimetableData
        .sort((a, b) => {
            const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            if (a.dayOfWeek !== b.dayOfWeek) {
                return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
            }
            return a.period - b.period;
        })
        .forEach(entry => {
            const dayBadgeClass = getDayBadgeClass(entry.dayOfWeek);
            const timeSlot = getTimeSlot(entry.period);
            const isLab = entry.subject && entry.subject.toLowerCase().includes('lab');
            
            html += `<tr ${isLab ? 'class="table-warning"' : ''}>
                <td><span class="badge ${dayBadgeClass}">${entry.dayOfWeek}</span></td>
                <td>
                    <span class="badge bg-secondary">Period ${entry.period}</span><br>
                    <small class="text-muted">${timeSlot}</small>
                </td>
                <td><strong>${entry.className}</strong></td>
                <td>
                    ${entry.staffName}<br>
                    <small class="text-muted">${entry.designation || 'Faculty'}</small>
                </td>
                <td>
                    ${entry.subject || 'General'}
                    ${isLab ? '<br><small class="badge bg-info">Laboratory</small>' : ''}
                </td>
                <td><small>${entry.venue || 'TBA'}</small></td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteTimetableEntry('${entry.id}')" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        });
    html += '</tbody></table></div>';
    container.innerHTML = html;
}

function getDayBadgeClass(day) {
    const classes = {
        'Monday': 'bg-primary',
        'Tuesday': 'bg-success', 
        'Wednesday': 'bg-warning',
        'Thursday': 'bg-info',
        'Friday': 'bg-danger',
        'Saturday': 'bg-secondary'
    };
    return classes[day] || 'bg-dark';
}

function filterTimetable() {
    const dayFilter = document.getElementById('timetableFilterDay').value;
    const staffFilter = document.getElementById('timetableFilterStaff').value;
    
    filteredTimetableData = timetableData.filter(entry => {
        const dayMatch = !dayFilter || entry.dayOfWeek === dayFilter;
        const staffMatch = !staffFilter || entry.staffId === staffFilter;
        return dayMatch && staffMatch;
    });
    
    renderTimetableList();
}

async function deleteTimetableEntry(entryId) {
    const entry = timetableData.find(t => t.id === entryId);
    if (!entry) return;
    
    if (confirm(`Remove ${entry.staffName} from ${entry.className} (Period ${entry.period}, ${entry.dayOfWeek})?`)) {
        timetableData = timetableData.filter(t => t.id !== entryId);
        const result = await apiPost('/api/timetable', timetableData);
        
        if (result.success) {
            await loadTimetable();
            showAlert('Timetable entry removed successfully.', 'success');
        }
    }
}

async function clearTimetable() {
    if (confirm('Are you sure you want to clear all timetable entries? This action cannot be undone.')) {
        timetableData = [];
        const result = await apiPost('/api/timetable', timetableData);
        
        if (result.success) {
            await loadTimetable();
            showAlert('All timetable entries cleared.', 'warning');
        }
    }
}

function generateWeeklyTimetable() {
    showAlert('Auto-generate feature will be implemented based on your specific requirements.', 'info');
}

// Dashboard
function loadTodayDashboard() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dashboardDate').value = today;
    loadDashboard();
}

async function loadDashboard() {
    const selectedDate = document.getElementById('dashboardDate').value;
    if (!selectedDate) {
        showAlert('Please select a date', 'warning');
        return;
    }
    
    showLoading();
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    let dayTimetable = timetableData.filter(t => t.dayOfWeek === dayOfWeek);
    
    if (dayTimetable.length === 0) {
        document.getElementById('dashboardContent').innerHTML = 
            '<div class="alert alert-warning text-center"><i class="fas fa-exclamation-triangle me-2"></i>No classes scheduled for this day.</div>';
        showLoading(false);
        updateStatsCards([], []);
        return;
    }
    
    const dayAttendance = attendanceData.filter(a => a.date === selectedDate);
    
    let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th><i class="fas fa-clock me-1"></i>Period</th>
                        <th><i class="fas fa-users me-1"></i>Class</th>
                        <th><i class="fas fa-user me-1"></i>Staff Name</th>
                        <th><i class="fas fa-building me-1"></i>Department</th>
                        <th><i class="fas fa-chart-line me-1"></i>Status</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    dayTimetable
        .sort((a, b) => a.period - b.period)
        .forEach(entry => {
            const attendance = dayAttendance.find(a => a.staffId === entry.staffId && a.period === entry.period);
            const status = attendance ? attendance.status : 'Not Marked';
            const staff = staffData.find(s => s.id === entry.staffId);
            let statusClass = '';
            let statusBadge = '';
            
            switch(status) {
                case 'Present':
                    statusClass = 'table-status-present';
                    statusBadge = 'status-present';
                    break;
                case 'Absent':
                    statusClass = 'table-status-absent';
                    statusBadge = 'status-absent';
                    break;
                case 'Free':
                    statusClass = 'table-status-free';
                    statusBadge = 'status-free';
                    break;
                default:
                    statusBadge = 'bg-secondary';
            }
            
            html += `<tr class="${statusClass}">
                <td><span class="badge bg-primary">Period ${entry.period}</span></td>
                <td><strong>${entry.className}</strong></td>
                <td>${entry.staffName}</td>
                <td>${staff ? staff.designation : 'Unknown'}</td>
                <td><span class="status-badge ${statusBadge}">${status}</span></td>
            </tr>`;
        });
    
    html += '</tbody></table></div>';
    
    document.getElementById('dashboardContent').innerHTML = html;
    updateStatsCards(dayTimetable, dayAttendance);
    showLoading(false);
}

function updateStatsCards(dayTimetable, dayAttendance) {
    const present = dayAttendance.filter(a => a.status === 'Present').length;
    const absent = dayAttendance.filter(a => a.status === 'Absent').length;
    const free = dayAttendance.filter(a => a.status === 'Free').length;
    const total = dayTimetable.length;
    const rate = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
    
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('freeCount').textContent = free;
    document.getElementById('attendanceRate').textContent = rate + '%';
}

// Attendance Management
async function loadAttendanceData() {
    attendanceData = await apiGet('/api/attendance');
}

function loadTodayAttendance() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('attendanceDate').value = today;
    loadAttendanceForm();
}

async function loadAttendanceForm() {
    const selectedDate = document.getElementById('attendanceDate').value;
    if (!selectedDate) {
        showAlert('Please select a date', 'warning');
        return;
    }
    
    showLoading();
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    let dayTimetable = timetableData.filter(t => t.dayOfWeek === dayOfWeek);
    
    if (dayTimetable.length === 0) {
        document.getElementById('attendanceForm').innerHTML = 
            '<div class="alert alert-warning text-center"><i class="fas fa-exclamation-triangle me-2"></i>No classes scheduled for this day.</div>';
        showLoading(false);
        return;
    }
    
    const dayAttendance = attendanceData.filter(a => a.date === selectedDate);
    
    let html = `
        <form id="bulkAttendanceForm">
            <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th><i class="fas fa-clock me-1"></i>Period</th>
                            <th><i class="fas fa-users me-1"></i>Class</th>
                            <th><i class="fas fa-user me-1"></i>Staff Name</th>
                            <th><i class="fas fa-check-circle me-1"></i>Mark Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
    `;
    
    dayTimetable
        .sort((a, b) => a.period - b.period)
        .forEach(entry => {
            const attendance = dayAttendance.find(a => a.staffId === entry.staffId && a.period === entry.period);
            const currentStatus = attendance ? attendance.status : '';
            
            html += `<tr>
                <td><span class="badge bg-primary">Period ${entry.period}</span></td>
                <td><strong>${entry.className}</strong></td>
                <td>${entry.staffName}</td>
                <td>
                    <select class="form-control" name="attendance_${entry.staffId}_${entry.period}" required>
                        <option value="">Select Status</option>
                        <option value="Present" ${currentStatus === 'Present' ? 'selected' : ''}>
                            ✅ Present
                        </option>
                        <option value="Absent" ${currentStatus === 'Absent' ? 'selected' : ''}>
                            ❌ Absent
                        </option>
                        <option value="Free" ${currentStatus === 'Free' ? 'selected' : ''}>
                            ☕ Free Period
                        </option>
                    </select>
                </td>
            </tr>`;
        });
    
    html += `
                </tbody>
            </table>
        </div>
        <div class="text-center mt-4">
            <button type="submit" class="btn btn-success btn-lg me-3">
                <i class="fas fa-save me-1"></i>Save All Attendance
            </button>
            <button type="button" class="btn btn-secondary" onclick="resetAttendanceForm()">
                <i class="fas fa-undo me-1"></i>Reset All
            </button>
        </div>
    </form>`;
    
    document.getElementById('attendanceForm').innerHTML = html;
    
    // Add form submission handler
    document.getElementById('bulkAttendanceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAttendance(selectedDate, dayTimetable);
    });
    
    showLoading(false);
}

function markAllPresent() {
    const selects = document.querySelectorAll('#bulkAttendanceForm select');
    selects.forEach(select => {
        select.value = 'Present';
    });
    showAlert('All staff marked as present!', 'success');
}

function markAllFree() {
    const selects = document.querySelectorAll('#bulkAttendanceForm select');
    selects.forEach(select => {
        select.value = 'Free';
    });
    showAlert('All periods marked as free!', 'info');
}

function resetAttendanceForm() {
    if (confirm('Are you sure you want to reset all attendance entries?')) {
        const selects = document.querySelectorAll('#bulkAttendanceForm select');
        selects.forEach(select => {
            select.value = '';
        });
        showAlert('Attendance form reset!', 'info');
    }
}

async function saveAttendance(date, dayTimetable) {
    showLoading();
    
    const formData = new FormData(document.getElementById('bulkAttendanceForm'));
    
    // Remove existing attendance for this date
    attendanceData = attendanceData.filter(a => a.date !== date);
    
    // Add new attendance records
    dayTimetable.forEach(entry => {
        const status = formData.get(`attendance_${entry.staffId}_${entry.period}`);
        if (status) {
            attendanceData.push({
                id: Date.now().toString() + Math.random(),
                date,
                staffId: entry.staffId,
                staffName: entry.staffName,
                period: entry.period,
                className: entry.className,
                status,
                timestamp: new Date().toISOString()
            });
        }
    });
    
    const result = await apiPost('/api/attendance', attendanceData);
    showLoading(false);
    
    if (result.success) {
        showAlert('Attendance saved successfully!', 'success');
        
        // Refresh dashboard if it's showing the same date
        const dashboardDate = document.getElementById('dashboardDate').value;
        if (dashboardDate === date) {
            loadDashboard();
        }
    }
}

// Reports
async function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const staffFilter = document.getElementById('reportStaff').value;
    
    if (!startDate || !endDate) {
        showAlert('Please select both start and end dates', 'warning');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        showAlert('Start date cannot be after end date', 'warning');
        return;
    }
    
    showLoading();
    
    let filteredData = attendanceData.filter(a => a.date >= startDate && a.date <= endDate);
    
    if (staffFilter) {
        filteredData = filteredData.filter(a => a.staffId === staffFilter);
    }
    
    if (filteredData.length === 0) {
        document.getElementById('reportContent').innerHTML = 
            '<div class="alert alert-warning text-center"><i class="fas fa-exclamation-triangle me-2"></i>No attendance data found for the selected period.</div>';
        showLoading(false);
        return;
    }
    
    // Generate simple detailed report
    const reportHTML = generateSimpleReport(filteredData);
    document.getElementById('reportContent').innerHTML = reportHTML;
    
    showLoading(false);
}

function generateSimpleReport(data) {
    // Group by staff and date
    const reportData = {};
    data.forEach(record => {
        const key = `${record.staffId}_${record.date}`;
        if (!reportData[key]) {
            reportData[key] = {
                staffName: record.staffName,
                staffId: record.staffId,
                date: record.date,
                records: []
            };
        }
        reportData[key].records.push(record);
    });
    
    let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th><i class="fas fa-calendar me-1"></i>Date</th>
                        <th><i class="fas fa-user me-1"></i>Staff Name</th>
                        <th><i class="fas fa-clock me-1"></i>Total Classes</th>
                        <th><i class="fas fa-check-circle me-1"></i>Present</th>
                        <th><i class="fas fa-times-circle me-1"></i>Absent</th>
                        <th><i class="fas fa-coffee me-1"></i>Free</th>
                        <th><i class="fas fa-percentage me-1"></i>Attendance %</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    Object.values(reportData)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(dayData => {
            const total = dayData.records.length;
            const present = dayData.records.filter(r => r.status === 'Present').length;
            const absent = dayData.records.filter(r => r.status === 'Absent').length;
            const free = dayData.records.filter(r => r.status === 'Free').length;
            const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
            
            const staff = staffData.find(s => s.id === dayData.staffId);
            const department = staff ? staff.designation : 'Unknown';
            
            html += `<tr>
                <td><strong>${formatDate(dayData.date)}</strong></td>
                <td>
                    ${dayData.staffName}<br>
                    <small class="text-muted">${dayData.staffId} • ${department}</small>
                </td>
                <td><span class="badge bg-info">${total}</span></td>
                <td><span class="badge bg-success">${present}</span></td>
                <td><span class="badge bg-danger">${absent}</span></td>
                <td><span class="badge bg-warning text-dark">${free}</span></td>
                <td>
                    <div class="progress" style="height: 25px;">
                        <div class="progress-bar bg-success" style="width: ${percentage}%">
                            <strong>${percentage}%</strong>
                        </div>
                    </div>
                </td>
            </tr>`;
        });
    
    html += '</tbody></table></div>';
    return html;
}

function generateDetailedReport(data) {
    // Group by staff and date
    const reportData = {};
    data.forEach(record => {
        const key = `${record.staffId}_${record.date}`;
        if (!reportData[key]) {
            reportData[key] = {
                staffName: record.staffName,
                staffId: record.staffId,
                date: record.date,
                records: []
            };
        }
        reportData[key].records.push(record);
    });
    
    let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped table-hover">
                <thead>
                    <tr>
                        <th><i class="fas fa-calendar me-1"></i>Date</th>
                        <th><i class="fas fa-user me-1"></i>Staff</th>
                        <th><i class="fas fa-clock me-1"></i>Total Periods</th>
                        <th><i class="fas fa-check-circle me-1"></i>Present</th>
                        <th><i class="fas fa-times-circle me-1"></i>Absent</th>
                        <th><i class="fas fa-coffee me-1"></i>Free</th>
                        <th><i class="fas fa-percentage me-1"></i>Attendance %</th>
                        <th><i class="fas fa-info-circle me-1"></i>Details</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    Object.values(reportData)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(dayData => {
            const total = dayData.records.length;
            const present = dayData.records.filter(r => r.status === 'Present').length;
            const absent = dayData.records.filter(r => r.status === 'Absent').length;
            const free = dayData.records.filter(r => r.status === 'Free').length;
            const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
            
            const staff = staffData.find(s => s.id === dayData.staffId);
            const department = staff ? staff.department : 'Unknown';
            
            html += `<tr>
                <td><strong>${formatDate(dayData.date)}</strong></td>
                <td>
                    ${dayData.staffName}<br>
                    <small class="text-muted">${dayData.staffId} • ${department}</small>
                </td>
                <td><span class="badge bg-info">${total}</span></td>
                <td><span class="badge bg-success">${present}</span></td>
                <td><span class="badge bg-danger">${absent}</span></td>
                <td><span class="badge bg-warning text-dark">${free}</span></td>
                <td>
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar bg-success" style="width: ${percentage}%">${percentage}%</div>
                    </div>
                </td>
                <td>
                    <button class="btn btn-sm btn-outline-info" onclick="showDayDetails('${dayData.staffId}', '${dayData.date}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                </td>
            </tr>`;
        });
    
    html += '</tbody></table></div>';
    return html;
}

function generateSummaryReport(data) {
    // Group by staff
    const staffSummary = {};
    data.forEach(record => {
        if (!staffSummary[record.staffId]) {
            staffSummary[record.staffId] = {
                staffName: record.staffName,
                total: 0,
                present: 0,
                absent: 0,
                free: 0
            };
        }
        staffSummary[record.staffId].total++;
        staffSummary[record.staffId][record.status.toLowerCase()]++;
    });
    
    let html = `
        <div class="table-responsive">
            <table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Staff Name</th>
                        <th>Department</th>
                        <th>Total Periods</th>
                        <th>Present</th>
                        <th>Absent</th>
                        <th>Free</th>
                        <th>Attendance Rate</th>
                        <th>Performance</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    Object.values(staffSummary).forEach(summary => {
        const percentage = ((summary.present / summary.total) * 100).toFixed(1);
        const staff = staffData.find(s => s.name === summary.staffName);
        const department = staff ? staff.department : 'Unknown';
        
        let performanceClass = 'success';
        let performanceText = 'Excellent';
        if (percentage < 90) {
            performanceClass = 'warning';
            performanceText = 'Good';
        }
        if (percentage < 75) {
            performanceClass = 'danger';
            performanceText = 'Needs Improvement';
        }
        
        html += `<tr>
            <td><strong>${summary.staffName}</strong></td>
            <td>${department}</td>
            <td>${summary.total}</td>
            <td><span class="badge bg-success">${summary.present}</span></td>
            <td><span class="badge bg-danger">${summary.absent}</span></td>
            <td><span class="badge bg-warning text-dark">${summary.free}</span></td>
            <td>${percentage}%</td>
            <td><span class="badge bg-${performanceClass}">${performanceText}</span></td>
        </tr>`;
    });
    
    html += '</tbody></table></div>';
    return html;
}

function generateMonthlyReport(data) {
    // Group by month and staff
    const monthlyData = {};
    data.forEach(record => {
        const month = record.date.substring(0, 7); // YYYY-MM
        if (!monthlyData[month]) {
            monthlyData[month] = {};
        }
        if (!monthlyData[month][record.staffId]) {
            monthlyData[month][record.staffId] = {
                staffName: record.staffName,
                present: 0,
                absent: 0,
                free: 0,
                total: 0
            };
        }
        monthlyData[month][record.staffId][record.status.toLowerCase()]++;
        monthlyData[month][record.staffId].total++;
    });
    
    let html = '<div class="row">';
    
    Object.keys(monthlyData).sort().reverse().forEach(month => {
        const monthName = new Date(month + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
        
        html += `
            <div class="col-12 mb-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        <h5 class="mb-0"><i class="fas fa-calendar-alt me-2"></i>${monthName}</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-sm">
                                <thead>
                                    <tr>
                                        <th>Staff</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Free</th>
                                        <th>Rate</th>
                                    </tr>
                                </thead>
                                <tbody>
        `;
        
        Object.values(monthlyData[month]).forEach(staffData => {
            const rate = ((staffData.present / staffData.total) * 100).toFixed(1);
            html += `<tr>
                <td>${staffData.staffName}</td>
                <td><span class="badge bg-success">${staffData.present}</span></td>
                <td><span class="badge bg-danger">${staffData.absent}</span></td>
                <td><span class="badge bg-warning text-dark">${staffData.free}</span></td>
                <td>${rate}%</td>
            </tr>`;
        });
        
        html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

function updateReportStats(data) {
    const totalRecords = data.length;
    const presentRecords = data.filter(d => d.status === 'Present').length;
    const absentRecords = data.filter(d => d.status === 'Absent').length;
    const avgAttendance = totalRecords > 0 ? ((presentRecords / totalRecords) * 100).toFixed(1) : 0;
    
    // Get unique dates to count working days
    const uniqueDates = [...new Set(data.map(d => d.date))];
    
    document.getElementById('avgAttendance').textContent = avgAttendance + '%';
    document.getElementById('totalStaffDays').textContent = totalRecords;
    document.getElementById('absentDays').textContent = absentRecords;
    document.getElementById('workingDays').textContent = uniqueDates.length;
    
    document.getElementById('reportStats').style.display = 'flex';
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showDayDetails(staffId, date) {
    const dayRecords = attendanceData.filter(a => a.staffId === staffId && a.date === date);
    const staff = staffData.find(s => s.id === staffId);
    
    let details = `<strong>${staff.name}</strong> - ${formatDate(date)}<br><br>`;
    dayRecords.sort((a, b) => a.period - b.period).forEach(record => {
        const statusClass = record.status === 'Present' ? 'success' : 
                           record.status === 'Absent' ? 'danger' : 'warning';
        details += `Period ${record.period} (${record.className}): <span class="badge bg-${statusClass}">${record.status}</span><br>`;
    });
    
    showAlert(details, 'info');
}

// Export functions
function exportToPDF() {
    showAlert('PDF export feature will be implemented with a PDF library.', 'info');
}

function exportToExcel() {
    showAlert('Excel export feature will be implemented with a spreadsheet library.', 'info');
}

function printReport() {
    const reportContent = document.getElementById('reportContent').innerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Attendance Report</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                <style>
                    body { padding: 20px; }
                    @media print { 
                        .btn { display: none; }
                        .card { border: 1px solid #000; }
                    }
                </style>
            </head>
            <body>
                <h2>Staff Attendance Report</h2>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                ${reportContent}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

function emailReport() {
    showAlert('Email report feature will be implemented with email service integration.', 'info');
}

// Export and import functions
function exportStaffData() {
    const data = JSON.stringify(staffData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'staff_data.json';
    a.click();
    URL.revokeObjectURL(url);
    showAlert('Staff data exported successfully!', 'success');
}

function bulkImportStaff() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                if (Array.isArray(importedData)) {
                    // Merge with existing data
                    importedData.forEach(newStaff => {
                        if (!staffData.some(s => s.id === newStaff.id)) {
                            staffData.push(newStaff);
                        }
                    });
                    apiPost('/api/staff', staffData);
                    loadStaff();
                    showAlert(`${importedData.length} staff members imported successfully!`, 'success');
                } else {
                    showAlert('Invalid file format. Please use a JSON array.', 'warning');
                }
            } catch (error) {
                showAlert('Error parsing file. Please check the format.', 'danger');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// Dashboard
async function loadDashboard() {
    const selectedDate = document.getElementById('dashboardDate').value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const dayTimetable = timetableData.filter(t => t.dayOfWeek === dayOfWeek);
    
    if (dayTimetable.length === 0) {
        document.getElementById('dashboardContent').innerHTML = 
            '<div class="alert alert-warning">No classes scheduled for this day.</div>';
        return;
    }
    
    const dayAttendance = attendanceData.filter(a => a.date === selectedDate);
    
    let html = '<table class="table table-bordered"><thead><tr><th>Period</th><th>Class</th><th>Staff Name</th><th>Status</th></tr></thead><tbody>';
    
    dayTimetable
        .sort((a, b) => a.period - b.period)
        .forEach(entry => {
            const attendance = dayAttendance.find(a => a.staffId === entry.staffId && a.period === entry.period);
            const status = attendance ? attendance.status : 'Not Marked';
            let statusClass = '';
            let statusBadge = '';
            
            switch(status) {
                case 'Present':
                    statusClass = 'table-status-present';
                    statusBadge = 'status-present';
                    break;
                case 'Absent':
                    statusClass = 'table-status-absent';
                    statusBadge = 'status-absent';
                    break;
                case 'Free':
                    statusClass = 'table-status-free';
                    statusBadge = 'status-free';
                    break;
                default:
                    statusBadge = 'bg-secondary';
            }
            
            html += `<tr class="${statusClass}">
                <td>${entry.period}</td>
                <td>${entry.className}</td>
                <td>${entry.staffName}</td>
                <td><span class="status-badge ${statusBadge}">${status}</span></td>
            </tr>`;
        });
    
    html += '</tbody></table>';
    document.getElementById('dashboardContent').innerHTML = html;
}

// Attendance Management
async function loadAttendanceData() {
    attendanceData = await apiGet('/api/attendance');
}

async function loadAttendanceForm() {
    const selectedDate = document.getElementById('attendanceDate').value;
    if (!selectedDate) {
        alert('Please select a date');
        return;
    }
    
    const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
    const dayTimetable = timetableData.filter(t => t.dayOfWeek === dayOfWeek);
    
    if (dayTimetable.length === 0) {
        document.getElementById('attendanceForm').innerHTML = 
            '<div class="alert alert-warning">No classes scheduled for this day.</div>';
        return;
    }
    
    const dayAttendance = attendanceData.filter(a => a.date === selectedDate);
    
    let html = '<form id="bulkAttendanceForm"><table class="table table-bordered"><thead><tr><th>Period</th><th>Class</th><th>Staff Name</th><th>Status</th></tr></thead><tbody>';
    
    dayTimetable
        .sort((a, b) => a.period - b.period)
        .forEach(entry => {
            const attendance = dayAttendance.find(a => a.staffId === entry.staffId && a.period === entry.period);
            const currentStatus = attendance ? attendance.status : '';
            
            html += `<tr>
                <td>${entry.period}</td>
                <td>${entry.className}</td>
                <td>${entry.staffName}</td>
                <td>
                    <select class="form-control" name="attendance_${entry.staffId}_${entry.period}" required>
                        <option value="">Select Status</option>
                        <option value="Present" ${currentStatus === 'Present' ? 'selected' : ''}>Present</option>
                        <option value="Absent" ${currentStatus === 'Absent' ? 'selected' : ''}>Absent</option>
                        <option value="Free" ${currentStatus === 'Free' ? 'selected' : ''}>Free Period</option>
                    </select>
                </td>
            </tr>`;
        });
    
    html += `</tbody></table>
        <button type="submit" class="btn btn-success">Save Attendance</button>
    </form>`;
    
    document.getElementById('attendanceForm').innerHTML = html;
    
    // Add form submission handler
    document.getElementById('bulkAttendanceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveAttendance(selectedDate, dayTimetable);
    });
}

async function saveAttendance(date, dayTimetable) {
    const formData = new FormData(document.getElementById('bulkAttendanceForm'));
    
    // Remove existing attendance for this date
    attendanceData = attendanceData.filter(a => a.date !== date);
    
    // Add new attendance records
    dayTimetable.forEach(entry => {
        const status = formData.get(`attendance_${entry.staffId}_${entry.period}`);
        if (status) {
            attendanceData.push({
                id: Date.now().toString() + Math.random(),
                date,
                staffId: entry.staffId,
                staffName: entry.staffName,
                period: entry.period,
                className: entry.className,
                status
            });
        }
    });
    
    await apiPost('/api/attendance', attendanceData);
    alert('Attendance saved successfully!');
}

// Reports
async function generateReport() {
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    const staffFilter = document.getElementById('reportStaff').value;
    
    if (!startDate || !endDate) {
        alert('Please select both start and end dates');
        return;
    }
    
    let filteredData = attendanceData.filter(a => a.date >= startDate && a.date <= endDate);
    
    if (staffFilter) {
        filteredData = filteredData.filter(a => a.staffId === staffFilter);
    }
    
    if (filteredData.length === 0) {
        document.getElementById('reportContent').innerHTML = 
            '<div class="alert alert-warning">No attendance data found for the selected criteria.</div>';
        return;
    }
    
    // Group by staff and date
    const reportData = {};
    filteredData.forEach(record => {
        const key = `${record.staffId}_${record.date}`;
        if (!reportData[key]) {
            reportData[key] = {
                staffName: record.staffName,
                date: record.date,
                records: []
            };
        }
        reportData[key].records.push(record);
    });
    
    let html = '<table class="table table-bordered table-striped"><thead><tr><th>Date</th><th>Staff</th><th>Total Periods</th><th>Present</th><th>Absent</th><th>Free</th><th>Attendance %</th></tr></thead><tbody>';
    
    Object.values(reportData)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .forEach(dayData => {
            const total = dayData.records.length;
            const present = dayData.records.filter(r => r.status === 'Present').length;
            const absent = dayData.records.filter(r => r.status === 'Absent').length;
            const free = dayData.records.filter(r => r.status === 'Free').length;
            const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 0;
            
            html += `<tr>
                <td>${dayData.date}</td>
                <td>${dayData.staffName}</td>
                <td>${total}</td>
                <td class="text-success">${present}</td>
                <td class="text-danger">${absent}</td>
                <td class="text-warning">${free}</td>
                <td>${percentage}%</td>
            </tr>`;
        });
    
    html += '</tbody></table>';
    document.getElementById('reportContent').innerHTML = html;
}

// Search functionality
let searchQuery = '';

function filterStaff() {
    searchQuery = document.getElementById('staffSearch').value.toLowerCase().trim();
    
    if (searchQuery === '') {
        // Show all staff
        displayStaffStatus();
        document.getElementById('searchResults').textContent = '';
        return;
    }
    
    // Filter staff data
    const filteredStaff = eeeStaffData.filter(staff => 
        staff.name.toLowerCase().includes(searchQuery) || 
        staff.designation.toLowerCase().includes(searchQuery)
    );
    
    // Update search results count
    const resultCount = filteredStaff.length;
    document.getElementById('searchResults').textContent = 
        `Found ${resultCount} staff member${resultCount !== 1 ? 's' : ''} matching "${searchQuery}"`;
    
    // Display filtered results
    displayFilteredStaff(filteredStaff);
}

function clearSearch() {
    document.getElementById('staffSearch').value = '';
    searchQuery = '';
    document.getElementById('searchResults').textContent = '';
    displayStaffStatus();
}

function displayFilteredStaff(filteredStaff) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const today = days[new Date().getDay()];
    
    let availableHTML = '';
    let busyHTML = '';
    let availableCount = 0;
    let busyCount = 0;
    
    if (filteredStaff.length === 0) {
        availableHTML = '<div class="alert alert-warning"><i class="fas fa-search me-2"></i>No staff members found matching your search.</div>';
        busyHTML = '<div class="alert alert-warning"><i class="fas fa-search me-2"></i>No staff members found matching your search.</div>';
    } else {
        filteredStaff.forEach(staff => {
            const staffSchedule = staffPeriodSchedule[staff.name];
            const todayPeriods = staffSchedule && staffSchedule[today] ? staffSchedule[today] : [];
            
            const isBusy = currentPeriod !== 0 && todayPeriods.includes(currentPeriod);
            const nextClass = getNextClass(staff.name, today);
            const currentSubject = isBusy ? getCurrentSubject(staff.name, today, currentPeriod) : null;
            
            if (isBusy) {
                busyCount++;
                busyHTML += `
                    <div class="staff-card mb-2 p-3 bg-light rounded border-start border-danger border-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1 text-danger"><i class="fas fa-chalkboard-teacher me-1"></i>${staff.name}</h6>
                                <small class="text-muted">${staff.designation}</small>
                                ${currentSubject ? `<br><small class="text-primary"><i class="fas fa-book me-1"></i>Teaching: ${currentSubject}</small>` : ''}
                            </div>
                            <div class="text-end">
                                <span class="badge bg-danger">In Class</span>
                                <small class="d-block text-muted">Period ${currentPeriod}</small>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                availableCount++;
                availableHTML += `
                    <div class="staff-card mb-2 p-3 bg-light rounded border-start border-success border-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-1 text-success"><i class="fas fa-user-check me-1"></i>${staff.name}</h6>
                                <small class="text-muted">${staff.designation}</small>
                                ${nextClass ? `<br><small class="text-warning"><i class="fas fa-clock me-1"></i>Next: ${nextClass}</small>` : ''}
                            </div>
                            <div class="text-end">
                                <span class="badge bg-success">Available</span>
                                <small class="d-block text-muted">${staff.subjectCount} subjects</small>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    if (availableHTML === '') {
        availableHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>No available staff matching your search.</div>';
    }
    
    if (busyHTML === '') {
        busyHTML = '<div class="alert alert-info"><i class="fas fa-info-circle me-2"></i>No busy staff matching your search.</div>';
    }
    
    document.getElementById('availableStaff').innerHTML = availableHTML;
    document.getElementById('busyStaff').innerHTML = busyHTML;
    document.getElementById('availableCount').textContent = availableCount;
    document.getElementById('busyCount').textContent = busyCount;
}

// Staff Management Functions
function toggleManageStaff() {
    const panel = document.getElementById('manageStaffPanel');
    const btn = document.getElementById('manageStaffBtn');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-times me-1"></i>Close';
        btn.classList.remove('btn-light');
        btn.classList.add('btn-danger');
        loadStaffManagementList();
    } else {
        panel.style.display = 'none';
        btn.innerHTML = '<i class="fas fa-user-cog me-1"></i>Manage Staff';
        btn.classList.remove('btn-danger');
        btn.classList.add('btn-light');
    }
}

function loadStaffManagementList() {
    const tbody = document.getElementById('staffManagementList');
    let html = '';
    
    eeeStaffData.forEach((staff, index) => {
        html += `
            <tr>
                <td>${staff.name}</td>
                <td><span class="badge bg-primary">${staff.designation}</span></td>
                <td>EEE</td>
                <td><small>${staff.subjectCount} subject(s)</small></td>
                <td class="text-center">
                    <button class="btn btn-sm btn-warning me-1" onclick="editStaff(${index})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteStaff(${index})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    if (html === '') {
        html = '<tr><td colspan="5" class="text-center text-muted">No staff members found</td></tr>';
    }
    
    tbody.innerHTML = html;
}

function addNewStaff(event) {
    event.preventDefault();
    
    const name = document.getElementById('newStaffName').value.trim();
    const designation = document.getElementById('newStaffDesignation').value;
    const department = document.getElementById('newStaffDepartment').value;
    
    if (!name || !designation || !department) {
        alert('Please fill all required fields');
        return;
    }
    
    // Check if staff already exists
    const exists = eeeStaffData.some(staff => staff.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        alert('Staff member with this name already exists!');
        return;
    }
    
    // Add new staff to data
    const newStaff = {
        name: name,
        designation: designation,
        department: department,
        subjects: [],
        subjectCount: 0
    };
    
    eeeStaffData.push(newStaff);
    
    // Initialize empty schedule for new staff
    staffPeriodSchedule[name] = {
        "MON": [], "TUE": [], "WED": [], "THU": [], "FRI": [], "SAT": []
    };
    
    // Clear form
    document.getElementById('addStaffForm').reset();
    
    // Reload lists
    loadStaffManagementList();
    if (document.getElementById('departmentSelect').value === 'EEE') {
        displayStaffStatus();
    }
    
    alert(`✅ ${name} added successfully!`);
}

function editStaff(index) {
    const staff = eeeStaffData[index];
    
    const newName = prompt('Edit Staff Name:', staff.name);
    if (newName && newName.trim() !== '') {
        const oldName = staff.name;
        staff.name = newName.trim();
        
        // Update schedule mapping
        if (staffPeriodSchedule[oldName]) {
            staffPeriodSchedule[newName.trim()] = staffPeriodSchedule[oldName];
            delete staffPeriodSchedule[oldName];
        }
        
        loadStaffManagementList();
        if (document.getElementById('departmentSelect').value === 'EEE') {
            displayStaffStatus();
        }
        
        alert('✅ Staff updated successfully!');
    }
}

function deleteStaff(index) {
    const staff = eeeStaffData[index];
    
    if (confirm(`Are you sure you want to delete ${staff.name}?`)) {
        // Remove from data
        eeeStaffData.splice(index, 1);
        
        // Remove schedule
        delete staffPeriodSchedule[staff.name];
        
        // Reload lists
        loadStaffManagementList();
        if (document.getElementById('departmentSelect').value === 'EEE') {
            displayStaffStatus();
        }
        
        alert('✅ Staff deleted successfully!');
    }
}

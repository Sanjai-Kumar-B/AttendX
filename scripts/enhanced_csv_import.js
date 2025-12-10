const fs = require('fs');
const path = require('path');

// Enhanced CSV parser with better timetable logic
function parseCSVDataEnhanced() {
    const csvPath = path.join(__dirname, '../staff_details.csv');
    const dataPath = path.join(__dirname, '../data');
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n');
    
    const staffMap = new Map();
    const timetableEntries = [];
    let staffIdCounter = 1;
    
    // Define period schedule
    const periods = [
        { period: 1, time: '9:00-9:50 AM' },
        { period: 2, time: '9:50-10:40 AM' },
        { period: 3, time: '11:00-11:50 AM' },
        { period: 4, time: '11:50-12:40 PM' },
        { period: 5, time: '1:30-2:20 PM' },
        { period: 6, time: '2:20-3:10 PM' },
        { period: 7, time: '3:10-4:00 PM' },
        { period: 8, time: '4:00-4:50 PM' }
    ];
    
    const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        if (values.length < 5) continue;
        
        const [year, section, staffName, designation, subject] = values;
        
        if (!staffName || !subject) continue;
        
        // Generate unique staff ID if not exists
        if (!staffMap.has(staffName)) {
            const staffId = `EEE${staffIdCounter.toString().padStart(3, '0')}`;
            staffIdCounter++;
            
            let department = 'General';
            let email = '';
            
            if (designation.includes('EEE') || designation.includes('HoD')) {
                department = 'Electrical & Electronics Engineering';
                email = `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@eee.college.edu`;
            } else if (designation.includes('MATHS')) {
                department = 'Mathematics';
                email = `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@math.college.edu`;
            } else if (designation.includes('English')) {
                department = 'English';
                email = `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@english.college.edu`;
            } else if (designation.includes('Civil')) {
                department = 'Civil Engineering';
                email = `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@civil.college.edu`;
            } else if (designation === 'External') {
                department = 'External Faculty';
                email = `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@external.college.edu`;
            }
            
            staffMap.set(staffName, {
                id: staffId,
                name: staffName,
                designation: designation,
                department: department,
                email: email,
                phone: `+91-9${Math.floor(Math.random() * 900000000 + 100000000)}` // Sample phone
            });
        }
        
        const staff = staffMap.get(staffName);
        const className = section ? `EEE-${year}${section}` : `EEE-${year}`;
        
        // Assign periods more intelligently based on subject type
        let assignedPeriods = [];
        let assignedDays = [];
        
        if (subject.includes('Laboratory') || subject.includes('Lab')) {
            // Lab subjects get 2-3 consecutive periods
            assignedPeriods = [5, 6, 7]; // Afternoon slots for labs
            assignedDays = [workingDays[Math.floor(Math.random() * 5)]];
        } else if (subject.includes('Programming') && subject.includes('Laboratory')) {
            assignedPeriods = [3, 4]; // Programming labs
            assignedDays = [workingDays[Math.floor(Math.random() * 5)]];
        } else if (subject.includes('Seminar') || subject.includes('Library')) {
            assignedPeriods = [8]; // Last period
            assignedDays = [workingDays[Math.floor(Math.random() * 5)]];
        } else if (subject.includes('Placement Training')) {
            assignedPeriods = [6, 7]; // Evening sessions
            assignedDays = ['Friday'];
        } else {
            // Regular theory subjects
            assignedPeriods = [Math.floor(Math.random() * 6) + 1]; // Periods 1-6
            assignedDays = [workingDays[Math.floor(Math.random() * 5)]];
        }
        
        // Create timetable entries
        assignedDays.forEach(day => {
            assignedPeriods.forEach(period => {
                timetableEntries.push({
                    id: `T${timetableEntries.length + 1}`,
                    staffId: staff.id,
                    staffName: staffName,
                    className: className,
                    subject: subject,
                    year: parseInt(year),
                    section: section || '',
                    designation: designation,
                    period: period,
                    dayOfWeek: day,
                    timeSlot: periods[period - 1]?.time || '',
                    isLab: subject.includes('Laboratory') || subject.includes('Lab'),
                    venue: subject.includes('Laboratory') ? `${subject.includes('Programming') ? 'Computer' : 'EEE'} Lab ${Math.floor(Math.random() * 3) + 1}` : `Room ${Math.floor(Math.random() * 20) + 201}`
                });
            });
        });
    }
    
    // Convert staff map to array and sort by name
    const staffData = Array.from(staffMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    
    // Sort timetable entries
    timetableEntries.sort((a, b) => {
        const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        if (a.dayOfWeek !== b.dayOfWeek) {
            return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
        }
        return a.period - b.period;
    });
    
    // Write to JSON files
    fs.writeFileSync(
        path.join(dataPath, 'staff.json'), 
        JSON.stringify(staffData, null, 2)
    );
    
    fs.writeFileSync(
        path.join(dataPath, 'timetable.json'), 
        JSON.stringify(timetableEntries, null, 2)
    );
    
    // Create sample attendance for current week
    const attendanceData = generateSampleAttendance(timetableEntries, staffData);
    fs.writeFileSync(
        path.join(dataPath, 'attendance.json'), 
        JSON.stringify(attendanceData, null, 2)
    );
    
    console.log('✅ Enhanced CSV data imported successfully!');
    console.log(`📊 Staff Members: ${staffData.length}`);
    console.log(`📅 Timetable Entries: ${timetableEntries.length}`);
    console.log(`✅ Sample Attendance Records: ${attendanceData.length}`);
    
    // Print summary by department
    const deptSummary = {};
    staffData.forEach(staff => {
        deptSummary[staff.department] = (deptSummary[staff.department] || 0) + 1;
    });
    
    console.log('\\n📈 Department-wise Staff Count:');
    Object.entries(deptSummary).forEach(([dept, count]) => {
        console.log(`   ${dept}: ${count}`);
    });
    
    return { staffData, timetableEntries, attendanceData };
}

function generateSampleAttendance(timetableEntries, staffData) {
    const attendanceData = [];
    const today = new Date();
    
    // Generate attendance for last 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
        
        // Skip weekends
        if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') continue;
        
        const dayTimetable = timetableEntries.filter(t => t.dayOfWeek === dayOfWeek);
        
        dayTimetable.forEach(entry => {
            // Generate realistic attendance (90% present, 5% absent, 5% free)
            const rand = Math.random();
            let status = 'Present';
            if (rand < 0.05) status = 'Absent';
            else if (rand < 0.1) status = 'Free';
            
            attendanceData.push({
                id: `A${attendanceData.length + 1}`,
                date: dateStr,
                staffId: entry.staffId,
                staffName: entry.staffName,
                period: entry.period,
                className: entry.className,
                subject: entry.subject,
                status: status,
                timestamp: new Date(date.getTime() + (entry.period * 60 * 60 * 1000)).toISOString(),
                venue: entry.venue
            });
        });
    }
    
    return attendanceData;
}

// Run the enhanced import
if (require.main === module) {
    parseCSVDataEnhanced();
}

module.exports = { parseCSVDataEnhanced };
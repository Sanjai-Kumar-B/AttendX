const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Data file paths
const staffFile = path.join(__dirname, '../data/staff.json');
const timetableFile = path.join(__dirname, '../data/timetable.json');
const attendanceFile = path.join(__dirname, '../data/attendance.json');

// Utility to read JSON
function readJSON(file) {
  try {
    if (!fs.existsSync(file)) return [];
    const data = fs.readFileSync(file, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error(`Error reading ${file}:`, error);
    return [];
  }
}

// Utility to write JSON
function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(`Error writing ${file}:`, error);
  }
}

// Initialize data files with sample data if they don't exist
function initializeData() {
  if (!fs.existsSync(staffFile) || readJSON(staffFile).length === 0) {
    const sampleStaff = [
      { id: 'S001', name: 'Prof. Kumar', department: 'Computer Science' },
      { id: 'S002', name: 'Prof. Anitha', department: 'Information Technology' },
      { id: 'S003', name: 'Prof. Ravi', department: 'Computer Science' },
      { id: 'S004', name: 'Prof. Priya', department: 'Information Technology' }
    ];
    writeJSON(staffFile, sampleStaff);
  }
  
  if (!fs.existsSync(timetableFile) || readJSON(timetableFile).length === 0) {
    const sampleTimetable = [
      { id: '1', period: 1, className: 'CSE-2A', staffId: 'S001', staffName: 'Prof. Kumar', dayOfWeek: 'Monday' },
      { id: '2', period: 1, className: 'IT-1A', staffId: 'S002', staffName: 'Prof. Anitha', dayOfWeek: 'Monday' },
      { id: '3', period: 2, className: 'CSE-3A', staffId: 'S003', staffName: 'Prof. Ravi', dayOfWeek: 'Monday' },
      { id: '4', period: 2, className: 'IT-2A', staffId: 'S004', staffName: 'Prof. Priya', dayOfWeek: 'Monday' },
      { id: '5', period: 3, className: 'CSE-1A', staffId: 'S001', staffName: 'Prof. Kumar', dayOfWeek: 'Monday' },
      { id: '6', period: 1, className: 'IT-2A', staffId: 'S002', staffName: 'Prof. Anitha', dayOfWeek: 'Tuesday' },
      { id: '7', period: 2, className: 'CSE-2A', staffId: 'S003', staffName: 'Prof. Ravi', dayOfWeek: 'Tuesday' },
      { id: '8', period: 3, className: 'IT-1A', staffId: 'S004', staffName: 'Prof. Priya', dayOfWeek: 'Tuesday' }
    ];
    writeJSON(timetableFile, sampleTimetable);
  }
  
  if (!fs.existsSync(attendanceFile)) {
    writeJSON(attendanceFile, []);
  }
}

// Initialize data on server start
initializeData();

// API: Get staff
app.get('/api/staff', (req, res) => {
  res.json(readJSON(staffFile));
});

// API: Add/Edit staff
app.post('/api/staff', (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // If array is sent, replace entire staff list
      writeJSON(staffFile, req.body);
    } else {
      // If single staff object, add/update
      const staff = readJSON(staffFile);
      const { id, name, department } = req.body;
      const existingIndex = staff.findIndex(s => s.id === id);
      
      if (existingIndex >= 0) {
        staff[existingIndex] = { id, name, department };
      } else {
        staff.push({ id, name, department });
      }
      writeJSON(staffFile, staff);
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Get timetable
app.get('/api/timetable', (req, res) => {
  res.json(readJSON(timetableFile));
});

// API: Set timetable
app.post('/api/timetable', (req, res) => {
  try {
    writeJSON(timetableFile, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Get attendance
app.get('/api/attendance', (req, res) => {
  res.json(readJSON(attendanceFile));
});

// API: Mark attendance
app.post('/api/attendance', (req, res) => {
  try {
    writeJSON(attendanceFile, req.body);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Get attendance by date
app.get('/api/attendance/:date', (req, res) => {
  try {
    const attendance = readJSON(attendanceFile);
    const dateAttendance = attendance.filter(a => a.date === req.params.date);
    res.json(dateAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API: Reports
app.get('/api/report', (req, res) => {
  try {
    const { startDate, endDate, staffId } = req.query;
    let attendance = readJSON(attendanceFile);
    
    if (startDate && endDate) {
      attendance = attendance.filter(a => a.date >= startDate && a.date <= endDate);
    }
    
    if (staffId) {
      attendance = attendance.filter(a => a.staffId === staffId);
    }
    
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Staff Attendance System running on http://localhost:${PORT}`);
  console.log('Sample data has been loaded. You can now:');
  console.log('1. View the HOD Dashboard');
  console.log('2. Add more staff in Admin Panel');
  console.log('3. Set up timetables');
  console.log('4. Mark attendance');
  console.log('5. Generate reports');
});

const fs = require('fs');
const path = require('path');

// Parse CSV data and convert to system format
function parseCSVData() {
    const csvPath = path.join(__dirname, '../staff_details.csv');
    const dataPath = path.join(__dirname, '../data');
    
    const csvContent = fs.readFileSync(csvPath, 'utf8');
    const lines = csvContent.split('\n');
    const headers = lines[0].split(',');
    
    const staffMap = new Map();
    const timetableEntries = [];
    let staffIdCounter = 1;
    
    // Process each line (skip header)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',');
        if (values.length < 5) continue;
        
        const [year, section, staffName, designation, subject] = values;
        
        // Skip if essential data is missing
        if (!staffName || !subject) continue;
        
        // Generate unique staff ID if not exists
        if (!staffMap.has(staffName)) {
            const staffId = `S${staffIdCounter.toString().padStart(3, '0')}`;
            staffIdCounter++;
            
            // Determine department based on designation
            let department = 'General';
            if (designation.includes('EEE')) department = 'Electrical & Electronics Engineering';
            else if (designation.includes('MATHS')) department = 'Mathematics';
            else if (designation.includes('English')) department = 'English';
            else if (designation.includes('Civil')) department = 'Civil Engineering';
            else if (designation === 'External') department = 'External Faculty';
            
            staffMap.set(staffName, {
                id: staffId,
                name: staffName,
                designation: designation,
                department: department,
                email: `${staffName.toLowerCase().replace(/[^a-z]/g, '')}@college.edu`
            });
        }
        
        const staff = staffMap.get(staffName);
        const className = section ? `${year}-${section}` : `Year-${year}`;
        
        // Create timetable entry
        timetableEntries.push({
            id: `T${timetableEntries.length + 1}`,
            staffId: staff.id,
            staffName: staffName,
            className: className,
            subject: subject,
            year: year,
            section: section || '',
            designation: designation,
            period: Math.floor(Math.random() * 8) + 1, // Random period for now
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)]
        });
    }
    
    // Convert staff map to array
    const staffData = Array.from(staffMap.values());
    
    // Write to JSON files
    fs.writeFileSync(
        path.join(dataPath, 'staff.json'), 
        JSON.stringify(staffData, null, 2)
    );
    
    fs.writeFileSync(
        path.join(dataPath, 'timetable.json'), 
        JSON.stringify(timetableEntries, null, 2)
    );
    
    // Initialize empty attendance
    fs.writeFileSync(
        path.join(dataPath, 'attendance.json'), 
        JSON.stringify([], null, 2)
    );
    
    console.log('✅ CSV data imported successfully!');
    console.log(`📊 Imported ${staffData.length} staff members`);
    console.log(`📅 Created ${timetableEntries.length} timetable entries`);
    
    return { staffData, timetableEntries };
}

// Run the import
if (require.main === module) {
    parseCSVData();
}

module.exports = { parseCSVData };
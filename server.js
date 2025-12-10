const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Data storage paths
const dataDir = path.join(__dirname, 'data');
const staffFile = path.join(dataDir, 'staff.json');
const timetableFile = path.join(dataDir, 'timetable.json');
const attendanceFile = path.join(dataDir, 'attendance.json');

// Ensure data directory exists
async function ensureDataDirectory() {
    try {
        await fs.access(dataDir);
    } catch {
        await fs.mkdir(dataDir);
    }
}

// Initialize data files with empty arrays if they don't exist
async function initializeDataFiles() {
    const files = [staffFile, timetableFile, attendanceFile];
    
    for (const file of files) {
        try {
            await fs.access(file);
        } catch {
            await fs.writeFile(file, '[]');
        }
    }
}

// Helper function to read JSON file
async function readJSONFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

// Helper function to write JSON file
async function writeJSONFile(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return { success: true };
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return { success: false, error: error.message };
    }
}

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Staff API routes
app.get('/api/staff', async (req, res) => {
    const staff = await readJSONFile(staffFile);
    res.json(staff);
});

app.post('/api/staff', async (req, res) => {
    const result = await writeJSONFile(staffFile, req.body);
    res.json(result);
});

// Timetable API routes
app.get('/api/timetable', async (req, res) => {
    const timetable = await readJSONFile(timetableFile);
    res.json(timetable);
});

app.post('/api/timetable', async (req, res) => {
    const result = await writeJSONFile(timetableFile, req.body);
    res.json(result);
});

// Attendance API routes
app.get('/api/attendance', async (req, res) => {
    const attendance = await readJSONFile(attendanceFile);
    res.json(attendance);
});

app.post('/api/attendance', async (req, res) => {
    const result = await writeJSONFile(attendanceFile, req.body);
    res.json(result);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
    try {
        await ensureDataDirectory();
        await initializeDataFiles();
        
        app.listen(PORT, () => {
            console.log(`🚀 Dean's Panel Server running on http://localhost:${PORT}`);
            console.log(`📁 Data directory: ${dataDir}`);
            console.log(`⏰ Started at: ${new Date().toLocaleString()}`);
            console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n⏹️  Shutting down server gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n⏹️  Shutting down server gracefully...');
    process.exit(0);
});

startServer();
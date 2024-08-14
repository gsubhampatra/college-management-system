import { Attendance } from "../models/index.js";

// Controller to get attendance for each subject of a student by user ID
export const getStudentAttendanceBySubject = async (req, res) => {
    const { userId } = req.params; // User ID of the student

    try {
        // Fetch the attendance records for the student
        const attendanceRecords = await Attendance.find({ student: userId })
            .populate({
                path: 'class',
                populate: {
                    path: 'subject',
                    select: 'subjectName subjectCode'
                }
            })
            .populate('class.section');

        // Organize attendance records by subject
        const subjectAttendance = {};

  
        attendanceRecords.forEach(record => {
            const subjectId = record.class.subject._id;
            if (!subjectAttendance[subjectId]) {
                subjectAttendance[subjectId] = {
                    subjectName: record.class.subject.subjectName,
                    subjectCode: record.class.subject.subjectCode,
                    attendance: [],
                    totalClasses: 0,
                    presentClasses: 0
                };
            }

            // Add attendance record to the subject
            subjectAttendance[subjectId].attendance.push({
                date: record.date,
                status: record.status
            });

            // Increment the total class count
            subjectAttendance[subjectId].totalClasses++;

            // Increment the present class count if status is "Present"
            if (record.status === "Present") {
                subjectAttendance[subjectId].presentClasses++;
            }
        });

        // Calculate the attendance percentage for each subject
        Object.values(subjectAttendance).forEach(subject => {
            subject.attendancePercentage = 
                (subject.presentClasses / subject.totalClasses) * 100;
        });

        // Convert the subjectAttendance object to an array for response
        const response = Object.values(subjectAttendance);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getStudentMarksBySubject = async (req, res) => {
    const { userId } = req.params; // User ID of the student

    try {
        // Fetch the marks records for the student
        const marksRecords = await Marks.find({ student: userId })
            .populate({
                path: 'class',
                populate: {
                    path: 'subject',
                    select: 'subjectName subjectCode'
                }
            })
            .populate('class.section');

        // Organize marks records by subject
        const subjectMarks = {};

        marksRecords.forEach(record => {
            const subjectId = record.class.subject._id;
            if (!subjectMarks[subjectId]) {
                subjectMarks[subjectId] = {
                    subjectName: record.class.subject.subjectName,
                    subjectCode: record.class.subject.subjectCode,
                    marks: []
                };
            }

            subjectMarks[subjectId].marks.push({
                marks: record.marks
            });
        });

        // Convert the subjectMarks object to an array for response
        const response = Object.values(subjectMarks);

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
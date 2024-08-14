import mongoose, { Schema } from "mongoose";

// User Model
const UserSchema = new Schema({
  userid: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Teacher", "Student"], required: true },
  batch: { type: Schema.Types.ObjectId, ref: "Batch" },
  course: { type: Schema.Types.ObjectId, ref: "Course" },
  branch: { type: Schema.Types.ObjectId, ref: "Branch" },
  section: { type: Schema.Types.ObjectId, ref: "Section" },
});

// Course Model
const CourseSchema = new Schema({
  courseName: { type: String, required: true, unique: true },
});

// Branch Model
const BranchSchema = new Schema({
  branchName: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: "Course", required: true ,unique:true },
});

// Section Model
const SectionSchema = new Schema({
  sectionName: { type: String, required: true },
  branch: { type: Schema.Types.ObjectId, ref: "Branch", required: true },
});

// Batch Model
const BatchSchema = new Schema(
  {
    year: { type: Number, required: true, unique: true },
    courses: [
      {
        course: { type: Schema.Types.ObjectId, ref: "Course"},
        branches: [
          {
            branch: {
              type: Schema.Types.ObjectId,
              ref: "Branch",
            },
            sections: [{ type: Schema.Types.ObjectId, ref: "Section" }],
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

// Subject Model
const SubjectSchema = new Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true },
  
});

//Class Model
const ClassSchema = new Schema({
  subject:{type:Schema.Types.ObjectId,ref:"Subject"},
  teacher: { type: Schema.Types.ObjectId, ref: "User",  },
  section: { type: Schema.Types.ObjectId, ref: "Section",  },
})

// Attendance Model
const AttendanceSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true },
});

// Marks Model
const MarksSchema = new Schema({
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: Schema.Types.ObjectId, ref: "Class", required: true },
  marks: { type: Number, required: true },
});

// Mongoose Models
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);
const Branch = mongoose.model("Branch", BranchSchema);
const Section = mongoose.model("Section", SectionSchema);
const Batch = mongoose.model("Batch", BatchSchema);
const Subject = mongoose.model("Subject", SubjectSchema);
const Class = mongoose.model("Class", ClassSchema);
const Attendance = mongoose.model("Attendance", AttendanceSchema);
const Marks = mongoose.model("Marks", MarksSchema);

export { User, Course, Branch, Section, Batch, Subject,Class, Attendance, Marks };

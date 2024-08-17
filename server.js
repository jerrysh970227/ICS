const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 資料庫連接
mongoose.connect('mongodb://localhost:27017/security-club', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema 定義
const InstructorSchema = new mongoose.Schema({
  name: String,
  bio: String
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String
});

const ForumTopicSchema = new mongoose.Schema({
  title: String,
  content: String
});

const CalendarEventSchema = new mongoose.Schema({
  title: String,
  date: String
});

const Instructor = mongoose.model('Instructor', InstructorSchema);
const Course = mongoose.model('Course', CourseSchema);
const ForumTopic = mongoose.model('ForumTopic', ForumTopicSchema);
const CalendarEvent = mongoose.model('CalendarEvent', CalendarEventSchema);

// API 路由
app.get('/api/instructors', async (req, res) => {
  const instructors = await Instructor.find();
  res.json(instructors);
});

app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

app.get('/api/forum', async (req, res) => {
  const topics = await ForumTopic.find();
  res.json(topics);
});

app.get('/api/calendar', async (req, res) => {
  const events = await CalendarEvent.find();
  res.json(events);
});

// 啟動伺服器
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

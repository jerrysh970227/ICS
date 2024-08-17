document.addEventListener("DOMContentLoaded", function () {
    // 載入講師資訊
    fetch('/api/instructors')
      .then(response => response.json())
      .then(data => {
        const instructorsList = document.getElementById('instructors-list');
        data.forEach(instructor => {
          const instructorElement = document.createElement('div');
          instructorElement.innerHTML = `<h3>${instructor.name}</h3><p>${instructor.bio}</p>`;
          instructorsList.appendChild(instructorElement);
        });
      });
  
    // 載入課程資訊
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => {
        const coursesList = document.getElementById('courses-list');
        data.forEach(course => {
          const courseElement = document.createElement('div');
          courseElement.innerHTML = `<h3>${course.title}</h3><p>${course.description}</p>`;
          coursesList.appendChild(courseElement);
        });
      });
  
    // 載入討論區主題
    fetch('/api/forum')
      .then(response => response.json())
      .then(data => {
        const forumTopics = document.getElementById('forum-topics');
        data.forEach(topic => {
          const topicElement = document.createElement('div');
          topicElement.innerHTML = `<h3>${topic.title}</h3><p>${topic.content}</p>`;
          forumTopics.appendChild(topicElement);
        });
      });
  
    // 載入行事曆事件
    fetch('/api/calendar')
      .then(response => response.json())
      .then(data => {
        const calendarEvents = document.getElementById('calendar-events');
        data.forEach(event => {
          const eventElement = document.createElement('div');
          eventElement.innerHTML = `<h3>${event.title}</h3><p>${event.date}</p>`;
          calendarEvents.appendChild(eventElement);
        });
      });
  });
  
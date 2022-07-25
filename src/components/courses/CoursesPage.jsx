import React, { useState } from 'react';

function CoursesPage() {
  const [course, setCourse] = useState({ title: '' });

  function handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    setCourse((course) => {
      return { ...course, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(JSON.stringify(course, null, 2));
  }

  return (
    <main>
      <h1>Courses</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            className="form-control"
            type="text"
            value={course.title}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </main>
  );
}

export default CoursesPage;

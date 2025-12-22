const About = () => {
  const skills = [
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces'
    },
    {
      icon: '⚡',
      title: 'Frontend Development',
      description: 'Building responsive and interactive web applications'
    },
    {
      icon: '🔧',
      title: 'Backend Development',
      description: 'Developing robust server-side applications and APIs'
    }
  ]

  return (
    <section id="about" className="fade-in">
      <h2 data-aos="fade-up">About Me</h2>
      <div className="about-content" data-aos="fade-up" data-aos-delay="100">
        <div className="about-text">
          <p className="code-greeting">Println("Hello, world!");</p>
          <p>
            Hey, I'm Paul — a Software Development student at the University of Utah who's basically allergic to standing still. I love building tools, apps, and interfaces that make people smile (or at least stop clicking the refresh button out of frustration).
          </p>
          <p>
            I live at the intersection of "does it work?" and "does it look good?" Whether I'm designing a dashboard, coding up a new idea, or tinkering with front-end designs in React, I'm all about learning fast and building things that <em>feel right</em> to use.
          </p>
          <p>
            At my core, I'm a problem-solver with a creative streak. My projects range from audio capture apps in Python to full-on meal planning platforms that make daily life a little simpler (and tastier). I bring energy, curiosity, and a "what if we tried THIS?" mindset to every team I join.
          </p>
          <p>
            Currently, I'm looking for <strong>Summer and Fall 2026 software development or UI/UX design internships</strong> where I can create meaningful user experiences, write clean code, and collaborate with people who inspire me.
          </p>
        </div>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-item"
            data-aos="zoom-in"
            data-aos-delay={(index + 2) * 100}
          >
            <div className="skill-icon">{skill.icon}</div>
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default About

const Bio = () => {
  const BASE_URL = import.meta.env.BASE_URL
  
  return (
    <section id="bio" className="fade-in">
      <h2 data-aos="fade-up">Bio</h2>
      <div className="bio">
        <div className="bio-content" data-aos="fade-up" data-aos-delay="100">
          <div className="bio-image">
            <img src={`${BASE_URL}img/pfp.jpg`} alt="Paul David Gauvreau" />
          </div>
          <div className="bio-text">
            <p>
              Software Development student at the University of Utah passionate about creating intuitive, user-focused applications. Currently working on <strong>TATE AI</strong> — an AI agent you can converse with about school topics as an impactful way of studying. Always exploring new ways to blend design, technology, and creativity.
            </p>
            <p>
              <br /> When I'm not coding, you can find me exploring new technologies, playing volleyball, or watching redzone football.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bio

const Bio = () => {
  return (
    <section id="bio" className="fade-in">
      <h2 data-aos="fade-up">Bio</h2>
      <div className="bio">
        <div className="bio-content" data-aos="fade-up" data-aos-delay="100">
          <div className="bio-image">
            <img src="/img/pfp.jpg" alt="Paul David Gauvreau" />
          </div>
          <div className="bio-text">
            <p>
              Software Development student at the University of Utah passionate about creating intuitive, user-focused applications. Currently developing Lunchbox, a meal-planning platform designed to make organizing meals effortless. Always exploring new ways to blend design, technology, and creativity.
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

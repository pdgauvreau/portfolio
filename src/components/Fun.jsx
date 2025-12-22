const Fun = () => {
  const songs = [
    {
      title: 'Loose - Daniel Caesar',
      embed: 'https://www.youtube.com/embed/Eakt1tkxIXc?si=o3zd9fXiPaBfUcm6'
    },
    {
      title: 'Restless Mind - Sam Barber',
      embed: 'https://www.youtube.com/embed/W6JVKpz91zk?si=bTDaQAc4lXD7FfFQ'
    },
    {
      title: 'This Is Berk - John Powell (How to Train Your Dragon)',
      embed: 'https://www.youtube.com/embed/hNFM2f4BvAo?si=gd9IW6mvwTIdKEzd'
    }
  ]

  return (
    <section id="fun" className="fade-in">
      <h2 data-aos="fade-up">The Fun Stuff</h2>
      
      <div className="fun-subsection">
        <h3>Songs I Like Right Now</h3>
        <div className="songs-grid">
          {songs.map((song, index) => (
            <div key={index} className="song-item">
              <h4>{song.title}</h4>
              <iframe
                width="560"
                height="315"
                src={song.embed}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <div className="fun-subsection">
        <div className="podcast-book-grid">
          <div className="podcast-item">
            <h3>Podcast I Like Right Now</h3>
            <h4>Diary Of A CEO w/ Matthew McConaughey</h4>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/QMzxNfX-uAg?si=wb0lYgDGxHaxROev"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="book-item">
            <h3>Book I'm Reading</h3>
            <div className="book-content">
              <div className="book-cover">
                <img
                  src="https://m.media-amazon.com/images/I/91+1ACqS4PL._AC_UF1000,1000_QL80_.jpg"
                  alt="Mistborn book cover"
                />
              </div>
              <div className="book-info">
                <h4>Mistborn: The Final Empire</h4>
                <p className="book-author">by Brandon Sanderson</p>
                <p className="book-description">
                  A brilliant fantasy novel about a world ruled by an immortal tyrant, a young street thief who discovers her powers, and a daring plan to ignite a revolution using magic fueled by metal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Fun

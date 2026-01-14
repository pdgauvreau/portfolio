import { useEffect, useMemo, useState } from 'react'
import Navigation from '../components/Navigation'
import HeroBackground from '../components/HeroBackground'
import ScrollProgress from '../components/ScrollProgress'
import { blogPosts, linkedInPosts } from '../blog/posts'

const BASE_URL = import.meta.env.BASE_URL

const BlogPage = () => {
  const items = useMemo(() => {
    return [...blogPosts, ...linkedInPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [])
  const [activeSlug, setActiveSlug] = useState(null)

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search)
      setActiveSlug(params.get('post'))
    }

    syncFromUrl()
    window.addEventListener('popstate', syncFromUrl)
    return () => window.removeEventListener('popstate', syncFromUrl)
  }, [])

  const activePost = useMemo(() => {
    if (!activeSlug) return null
    return blogPosts.find((p) => p.slug === activeSlug) || null
  }, [activeSlug])

  const openPost = (slug) => {
    const url = new URL(window.location.href)
    url.searchParams.set('post', slug)
    window.history.pushState({}, '', url.toString())
    setActiveSlug(slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearPost = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('post')
    window.history.pushState({}, '', url.toString())
    setActiveSlug(null)
  }

  return (
    <>
      <ScrollProgress />
      <HeroBackground />
      <Navigation page="blog" />

      <section id="blog" className="fade-in visible">
        <div className="blog-header">
          <h2>Blog</h2>
          <p className="blog-subtitle">
            Professional notes on what I’m building, learning, and shipping.
          </p>
          <div className="blog-actions">
            <a className="project-link" href={BASE_URL}>
              Back to portfolio
            </a>
          </div>
        </div>

        {activePost ? (
          <article className="blog-post">
            <button type="button" className="blog-back" onClick={clearPost}>
              ← All posts
            </button>
            <h3 className="blog-post-title">{activePost.title}</h3>
            <div className="blog-post-meta">
              <span>{activePost.date}</span>
              <span className="blog-dot">•</span>
              <span>{activePost.readTime}</span>
            </div>
            <div className="blog-tags">
              {activePost.tags.map((tag) => (
                <span key={tag} className="blog-tag">
                  {tag}
                </span>
              ))}
            </div>
            <div className="blog-post-content">
              {activePost.content.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </article>
        ) : (
          <div className="blog-timeline" aria-label="Blog timeline">
            {items.map((post) => (
              <div key={post.slug || post.id} className="blog-timeline-item">
                <div className="blog-timeline-marker" aria-hidden="true" />
                <button
                  type="button"
                  className="blog-timeline-card"
                  onClick={() => {
                    if (post.source === 'linkedin') {
                      window.open(post.externalUrl, '_blank', 'noopener,noreferrer')
                      return
                    }
                    openPost(post.slug)
                  }}
                >
                  <div className="blog-timeline-top">
                    <span className="blog-date-pill">
                      {post.source === 'linkedin' ? `LinkedIn · ${post.dateLabel || post.date}` : post.date}
                    </span>
                    <span className="blog-readtime">
                      {post.source === 'linkedin' ? 'External post ↗' : post.readTime}
                    </span>
                  </div>
                  <h3 className="blog-timeline-title">{post.title}</h3>
                  <p className="blog-timeline-excerpt">{post.excerpt}</p>
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="blog-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default BlogPage


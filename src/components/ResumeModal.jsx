import { useEffect } from 'react'

const ResumeModal = ({ isOpen, onClose }) => {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="resume-modal-close" onClick={onClose} aria-label="Close resume">
          ×
        </button>
        <iframe
          src={resumeUrl}
          className="resume-modal-iframe"
          title="Resume"
        />
        <div style={{ padding: '0.75rem 1.25rem', textAlign: 'center' }}>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link"
          >
            Open / Download Resume
          </a>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal

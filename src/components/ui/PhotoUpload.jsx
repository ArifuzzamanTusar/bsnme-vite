import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/**
 * PhotoUpload — Drag-and-drop + click-to-upload with Cloudinary progress.
 *
 * Props:
 *  - onFileSelect: (file: File) => void
 *  - uploadProgress: number | null  (0–100, or null = not uploading)
 *  - uploadedUrl: string | null
 *  - uploadError: string | null
 */
export default function PhotoUpload({ onFileSelect, uploadProgress, uploadedUrl, uploadError }) {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState(null)

  const handleFile = (file) => {
    if (!file) return
    setFileName(file.name)
    onFileSelect(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  const handleChange = (e) => {
    const file = e.target.files[0]
    handleFile(file)
  }

  return (
    <div>
      <motion.div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? 'var(--orange)' : uploadedUrl ? 'rgba(34,197,94,0.5)' : 'var(--border)',
          background: isDragging ? 'rgba(232,93,4,0.05)' : 'var(--steel)',
        }}
        style={{
          border: '1.5px dashed',
          borderRadius: 4,
          padding: '1.25rem',
          textAlign: 'center',
          cursor: 'pointer',
          fontSize: '0.82rem',
          color: 'var(--muted)',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        whileHover={{ borderColor: 'var(--orange)', color: 'var(--silver)' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic"
          style={{ display: 'none' }}
          onChange={handleChange}
          id="photo-input"
        />

        <AnimatePresence mode="wait">
          {uploadedUrl ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ color: '#22c55e' }}
            >
              ✅ <strong>Photo uploaded!</strong>
              <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: 'var(--muted)', wordBreak: 'break-all' }}>
                {fileName}
              </div>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              📸 <strong style={{ color: 'var(--orange)' }}>Upload Damage Photos</strong>
              <br />
              <span style={{ fontSize: '0.75rem' }}>
                {fileName ? fileName : 'Drag & drop or click — helps us match you faster'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      <AnimatePresence>
        {uploadProgress !== null && uploadProgress < 100 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="upload-progress-bar" style={{ marginTop: '0.5rem' }}>
              <div
                className="upload-progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
              Uploading… {uploadProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ fontSize: '0.72rem', color: '#ef4444', marginTop: '0.35rem' }}
          >
            {uploadError}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * cloudinary.js
 * Unsigned upload helper for Cloudinary.
 * Configure via .env:
 *   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
 *   VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic']
const MAX_SIZE_MB = 10
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

/**
 * Upload a single file to Cloudinary via unsigned preset.
 * @param {File} file - The file to upload
 * @param {function(number): void} onProgress - Progress callback (0–100)
 * @returns {Promise<string>} - Resolves to the secure_url
 */
export async function uploadToCloudinary(file, onProgress) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error('Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to .env')
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Unsupported file type. Please upload JPG, PNG, WEBP, or HEIC.')
  }

  if (file.size > MAX_SIZE_BYTES) {
    throw new Error(`File is too large. Maximum size is ${MAX_SIZE_MB}MB.`)
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    xhr.open('POST', url)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText)
          resolve(data.secure_url)
        } catch {
          reject(new Error('Photo upload failed. Please try again.'))
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText)
          const msg = err?.error?.message || 'Upload failed'
          console.error('[Cloudinary] Upload error:', msg, '| Status:', xhr.status)
          reject(new Error(`Photo upload failed: ${msg}`))
        } catch {
          reject(new Error(`Photo upload failed (HTTP ${xhr.status}). Please try again.`))
        }
      }
    }

    xhr.onerror = () => reject(new Error('Photo upload failed. Please try again.'))
    xhr.ontimeout = () => reject(new Error('Photo upload timed out. Please try again.'))

    xhr.send(formData)
  })
}

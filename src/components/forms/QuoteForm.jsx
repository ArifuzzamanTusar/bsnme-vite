import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import PhotoUpload from '../ui/PhotoUpload'
import { uploadToCloudinary } from '../../lib/cloudinary'
import { submitToWeb3Forms } from '../../lib/web3forms'

const schema = z.object({
  firstName:   z.string().min(1, 'First name is required'),
  lastName:    z.string().min(1, 'Last name is required'),
  phone:       z.string().min(10, 'Enter a valid phone number (min 10 digits)').regex(/[\d\s\-()+]+/, 'Enter a valid phone number'),
  zip:         z.string().min(5, 'Enter a valid ZIP code').max(10),
  email:       z.string().email('Enter a valid email address'),
  vehicle:     z.string().optional(),
  damageType:  z.string().min(1, 'Select a damage type'),
  contactPref: z.string().min(1, 'Select a contact preference'),
  notes:       z.string().optional(),
})

export default function QuoteForm() {
  const [photoFile, setPhotoFile]         = useState(null)
  const [uploadProgress, setUploadProgress] = useState(null)
  const [uploadedUrl, setUploadedUrl]     = useState(null)
  const [uploadError, setUploadError]     = useState(null)
  const [submitting, setSubmitting]       = useState(false)
  const [submitError, setSubmitError]     = useState('')
  const [submitted, setSubmitted]         = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const handlePhotoSelect = async (file) => {
    setPhotoFile(file)
    setUploadError(null)
    setUploadedUrl(null)
    setUploadProgress(0)
    try {
      const url = await uploadToCloudinary(file, (pct) => setUploadProgress(pct))
      setUploadedUrl(url)
      setUploadProgress(100)
    } catch (err) {
      setUploadError(err.message)
      setUploadProgress(null)
    }
  }

  const onSubmit = async (data) => {
    setSubmitting(true)
    setSubmitError('')

    // If a photo was selected but not yet uploaded, wait/error
    if (photoFile && !uploadedUrl && uploadProgress !== null && uploadProgress < 100) {
      setSubmitError('Please wait for the photo to finish uploading.')
      setSubmitting(false)
      return
    }

    const payload = {
      subject: 'New Quote Request — BodyShopNearMe',
      from_name: 'BodyShopNearMe Website',
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      zip: data.zip,
      vehicle: data.vehicle || 'Not specified',
      damage_type: data.damageType,
      contact_preference: data.contactPref,
      notes: data.notes || 'None',
      photo_url: uploadedUrl || 'No photo uploaded',
    }

    const result = await submitToWeb3Forms(payload)

    if (result.success) {
      setSubmitted(true)
      reset()
      setPhotoFile(null)
      setUploadedUrl(null)
      setUploadProgress(null)
    } else {
      setSubmitError(result.message)
    }

    setSubmitting(false)
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="success-panel"
        >
          <motion.div
            className="success-icon"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          >
            ✅
          </motion.div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', letterSpacing: '0.04em' }}>
            QUOTE REQUEST RECEIVED!
          </h3>
          <p style={{ color: 'var(--silver)', fontSize: '0.9rem', maxWidth: 340 }}>
            An agent will contact you within 15 minutes to confirm your match and next steps.
          </p>
          <button
            className="btn-ghost"
            style={{ marginTop: '0.5rem', fontSize: '0.82rem', padding: '0.6rem 1.5rem' }}
            onClick={() => setSubmitted(false)}
          >
            Submit Another Request
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          className="quote-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          noValidate
        >
          {/* Row: First + Last */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div className="field">
              <label htmlFor="qf-firstName">First Name</label>
              <input id="qf-firstName" type="text" placeholder="John" {...register('firstName')} />
              {errors.firstName && <span className="field-error">{errors.firstName.message}</span>}
            </div>
            <div className="field">
              <label htmlFor="qf-lastName">Last Name</label>
              <input id="qf-lastName" type="text" placeholder="Smith" {...register('lastName')} />
              {errors.lastName && <span className="field-error">{errors.lastName.message}</span>}
            </div>
          </div>

          {/* Row: Phone + ZIP */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div className="field">
              <label htmlFor="qf-phone">Phone</label>
              <input id="qf-phone" type="tel" placeholder="(555) 000-0000" {...register('phone')} />
              {errors.phone && <span className="field-error">{errors.phone.message}</span>}
            </div>
            <div className="field">
              <label htmlFor="qf-zip">ZIP Code</label>
              <input id="qf-zip" type="text" placeholder="10001" {...register('zip')} />
              {errors.zip && <span className="field-error">{errors.zip.message}</span>}
            </div>
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="qf-email">Email Address</label>
            <input id="qf-email" type="email" placeholder="john@email.com" {...register('email')} />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          {/* Row: Vehicle + Damage type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div className="field">
              <label htmlFor="qf-vehicle">Vehicle Make &amp; Model</label>
              <input id="qf-vehicle" type="text" placeholder="e.g. Toyota Camry 2022" {...register('vehicle')} />
            </div>
            <div className="field">
              <label htmlFor="qf-damageType">Type of Damage</label>
              <select id="qf-damageType" {...register('damageType')}>
                <option value="Collision / Accident">Collision / Accident</option>
                <option value="Paint Damage">Paint Damage</option>
                <option value="Dent Repair">Dent Repair</option>
                <option value="Scratch">Scratch</option>
                <option value="Frame Damage">Frame Damage</option>
                <option value="Windshield / Glass">Windshield / Glass</option>
                <option value="Other">Other</option>
              </select>
              {errors.damageType && <span className="field-error">{errors.damageType.message}</span>}
            </div>
          </div>

          {/* Preferred contact */}
          <div className="field">
            <label htmlFor="qf-contactPref">Preferred Contact</label>
            <select id="qf-contactPref" {...register('contactPref')}>
              <option value="Text Message">Text Message</option>
              <option value="Phone Call">Phone Call</option>
              <option value="Email">Email</option>
            </select>
          </div>

          {/* Photo upload */}
          <PhotoUpload
            onFileSelect={handlePhotoSelect}
            uploadProgress={uploadProgress}
            uploadedUrl={uploadedUrl}
            uploadError={uploadError}
          />

          {/* Notes */}
          <div className="field">
            <label htmlFor="qf-notes">Additional Notes</label>
            <textarea
              id="qf-notes"
              placeholder="Describe what happened, any insurance details, timeframe, etc."
              {...register('notes')}
            />
          </div>

          {/* Submit error */}
          <AnimatePresence>
            {submitError && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ color: '#ef4444', fontSize: '0.82rem', textAlign: 'center' }}
              >
                {submitError}
              </motion.p>
            )}
          </AnimatePresence>

          <button type="submit" className="form-submit-btn" disabled={submitting} id="qf-submit">
            {submitting ? (
              <>
                <span className="spinner" />
                Submitting…
              </>
            ) : (
              '→ GET MY FREE QUOTE NOW'
            )}
          </button>

          <p className="form-disclaimer">
            By submitting you agree to be contacted by our network. We do not sell your information to third parties. Your quote is 100% free.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

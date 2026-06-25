import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'motion/react'
import { submitToWeb3Forms } from '../../lib/web3forms'

const schema = z.object({
  shopName:  z.string().min(1, 'Shop name is required'),
  ownerName: z.string().min(1, 'Owner name is required'),
  phone:     z.string().min(10, 'Enter a valid phone number'),
  email:     z.string().email('Enter a valid email address'),
  zip:       z.string().length(5, 'ZIP code must be 5 digits').regex(/^\d{5}$/, 'ZIP must be 5 digits'),
  state:     z.string().min(1, 'Select a state'),
  volume:    z.string().min(1, 'Select a monthly volume'),
})

export default function ShopOwnerForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = async (data) => {
    setSubmitting(true)
    setSubmitError('')

    const payload = {
      subject:    'New Shop Owner Application — BodyShopNearMe',
      from_name:  'BodyShopNearMe Website',
      shop_name:  data.shopName,
      owner_name: data.ownerName,
      email:      data.email,
      phone:      data.phone,
      zip:        data.zip,
      state:      data.state,
      volume:     data.volume,
    }

    const result = await submitToWeb3Forms(payload)

    if (result.success) {
      setSubmitted(true)
      reset()
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
            APPLICATION RECEIVED!
          </h3>
          <p style={{ color: 'var(--silver)', fontSize: '0.9rem', maxWidth: 320 }}>
            We'll confirm your market availability and follow up within 24 hours.
          </p>
          <button
            className="btn-ghost"
            style={{ marginTop: '0.5rem', fontSize: '0.82rem', padding: '0.6rem 1.5rem' }}
            onClick={() => setSubmitted(false)}
          >
            Submit Another Application
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
          noValidate
        >
          {/* Row: Shop + Owner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div className="field">
              <label htmlFor="sof-shopName">Shop Name</label>
              <input id="sof-shopName" type="text" placeholder="Mike's Auto Body" {...register('shopName')} />
              {errors.shopName && <span className="field-error">{errors.shopName.message}</span>}
            </div>
            <div className="field">
              <label htmlFor="sof-ownerName">Owner Name</label>
              <input id="sof-ownerName" type="text" placeholder="Mike Johnson" {...register('ownerName')} />
              {errors.ownerName && <span className="field-error">{errors.ownerName.message}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className="field">
            <label htmlFor="sof-phone">Phone</label>
            <input id="sof-phone" type="tel" placeholder="(555) 000-0000" {...register('phone')} />
            {errors.phone && <span className="field-error">{errors.phone.message}</span>}
          </div>

          {/* Email */}
          <div className="field">
            <label htmlFor="sof-email">Email</label>
            <input id="sof-email" type="email" placeholder="mike@mikesautobody.com" {...register('email')} />
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          {/* ZIP */}
          <div className="field">
            <label htmlFor="sof-zip">Shop ZIP Code</label>
            <input id="sof-zip" type="text" placeholder="10001" {...register('zip')} />
            {errors.zip && <span className="field-error">{errors.zip.message}</span>}
          </div>

          {/* State */}
          <div className="field">
            <label htmlFor="sof-state">State</label>
            <select id="sof-state" {...register('state')}>
              <option value="">Select a state…</option>
              <option value="New York">New York</option>
              <option value="New Jersey">New Jersey</option>
              <option value="Florida">Florida</option>
              <option value="California">California</option>
              <option value="Nevada">Nevada</option>
              <option value="Texas">Texas</option>
            </select>
            {errors.state && <span className="field-error">{errors.state.message}</span>}
          </div>

          {/* Volume */}
          <div className="field">
            <label htmlFor="sof-volume">Monthly Repair Volume</label>
            <select id="sof-volume" {...register('volume')}>
              <option value="">Select volume…</option>
              <option value="Under 20 jobs/month">Under 20 jobs/month</option>
              <option value="20–50 jobs/month">20–50 jobs/month</option>
              <option value="50–100 jobs/month">50–100 jobs/month</option>
              <option value="100+ jobs/month">100+ jobs/month</option>
            </select>
            {errors.volume && <span className="field-error">{errors.volume.message}</span>}
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

          <button type="submit" className="form-submit-btn" disabled={submitting} id="sof-submit">
            {submitting ? (
              <>
                <span className="spinner" />
                Submitting…
              </>
            ) : (
              '→ APPLY TO JOIN THE NETWORK'
            )}
          </button>

          <p className="form-disclaimer">
            Territory spots are limited per market. We'll confirm availability within 24 hours of your application.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

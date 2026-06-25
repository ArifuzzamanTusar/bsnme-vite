/**
 * web3forms.js
 * Reusable form submission helper for Web3Forms.
 * Configure via .env:
 *   VITE_WEB3FORMS_KEY=your_access_key
 */

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

/**
 * Submit form data to Web3Forms.
 * @param {Record<string, string>} payload - Form fields to submit
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitToWeb3Forms(payload) {
  if (!ACCESS_KEY) {
    console.warn('VITE_WEB3FORMS_KEY is not set. Form submission is simulated.')
    // Simulate success in dev when key not set
    await new Promise(r => setTimeout(r, 1200))
    return { success: true, message: 'Form submitted successfully! (dev mode)' }
  }

  try {
    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        ...payload,
      }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      return { success: true, message: data.message || 'Submission received!' }
    } else {
      return { success: false, message: data.message || 'Submission failed. Please try again.' }
    }
  } catch (err) {
    console.error('Web3Forms network error:', err)
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
    }
  }
}

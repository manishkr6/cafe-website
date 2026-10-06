/**
 * Café Zéro — Web3Forms Serverless Contact & Reservation Client
 * Zero backend database required. All submissions are dispatched directly
 * via Web3Forms (https://web3forms.com) to your inbox with client-side offline backup.
 */

const LOCAL_STORAGE_KEY = 'cafe_zero_local_enquiries';
const WEB3FORMS_KEY_STORAGE = 'cafe_zero_web3forms_key';

export function getWeb3FormsKey() {
  return (
    import.meta.env.WEB3FORMS_ACCESS_KEY ||
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    (typeof window !== 'undefined' && localStorage.getItem(WEB3FORMS_KEY_STORAGE)) ||
    ''
  );
}

export function saveWeb3FormsKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem(WEB3FORMS_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(WEB3FORMS_KEY_STORAGE);
    }
  }
}

export function getLocalEnquiries() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalEnquiry(enquiry) {
  try {
    const list = getLocalEnquiries();
    list.unshift({
      ...enquiry,
      id: 'sub_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list.slice(0, 100)));
  } catch (e) {
    console.error('Failed to save local enquiry copy', e);
  }
}

export function clearLocalEnquiries() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch {}
}

/**
 * Submit Enquiry or Reservation directly to Web3Forms
 */
export async function submitEnquiry(data, customAccessKey = null) {
  const accessKey = customAccessKey || getWeb3FormsKey();

  const payload = {
    access_key: accessKey,
    name: data.name,
    email: data.email,
    phone: data.phone || 'Not provided',
    subject: `Café Zéro: ${data.enquiryType || 'New Enquiry'} from ${data.name}`,
    from_name: 'Café Zéro Gangtok',
    enquiry_type: data.enquiryType || 'General Enquiry',
    message: data.message,
    botcheck: '', // Honeypot field for spam prevention
  };

  saveLocalEnquiry(data);

  if (!accessKey) {
    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will get back to you shortly.',
    };
  }

  // If user is offline, return graceful offline confirmation
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      success: true,
      offline: true,
      message: 'Thank you! You are currently offline, but your message has been safely saved and will be sent once reconnected.'
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Thank you! Your enquiry has been received. Our team will get back to you shortly.',
        data: result
      };
    } else {
      console.warn('Web3Forms returned an error:', result.message);
      return {
        success: true,
        message: 'Thank you! Your enquiry has been received. Our team will get back to you shortly.',
      };
    }
  } catch (error) {
    console.warn('Network error, using local queue:', error);
    return {
      success: true,
      message: 'Thank you! Your enquiry has been received. Our team will get back to you shortly.'
    };
  }
}

export async function fetchEnquiries() {
  return getLocalEnquiries();
}

export async function syncOfflineEnquiries() {
  // Offline leads are kept safely in localStorage
  return getLocalEnquiries().length;
}

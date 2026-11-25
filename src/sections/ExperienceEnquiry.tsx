import React, { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Info } from 'lucide-react';
import { CREATIVE_EXPERIENCES, CreativeExperience } from '../data/experiences';
import { CosmosFlower } from '../components/illustrations/BotanicalMotifs';
import './ExperienceEnquiry.css';

interface ExperienceEnquiryProps {
  selectedExperienceId: CreativeExperience['id'];
  onChangeExperience: (id: CreativeExperience['id']) => void;
}

interface FormErrors {
  preferredDate?: string;
  preferredTime?: string;
  guests?: string;
  customerName?: string;
  contactNumber?: string;
}

/**
 * Formats a shareable enquiry payload that can later be connected directly
 * to WhatsApp Business (`https://wa.me/<confirmed-number>?text=...`) or an API endpoint
 * once MIM confirms official contact details.
 */
export function buildEnquirySummary(params: {
  experience: CreativeExperience;
  preferredDate: string;
  preferredTime: string;
  guests: string;
  customerName: string;
  contactNumber: string;
  message: string;
}): string {
  return [
    'MIM Bakery & Café — Creative Studio Enquiry (Demo Preview)',
    `Experience: ${params.experience.title} (Listed activity price: ${params.experience.priceDisplay})`,
    `Preferred Date: ${params.preferredDate}`,
    `Preferred Time: ${params.preferredTime}`,
    `Number of Guests: ${params.guests}`,
    `Name: ${params.customerName.trim()}`,
    `Contact Number: ${params.contactNumber.trim()}`,
    params.message.trim() ? `Message: ${params.message.trim()}` : null,
    'Status: Demo preview only — availability & pricing per guest to be confirmed with MIM Salugara.',
  ]
    .filter(Boolean)
    .join('\n');
}

export const ExperienceEnquiry: React.FC<ExperienceEnquiryProps> = ({
  selectedExperienceId,
  onChangeExperience,
}) => {
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [customerName, setCustomerName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [previewSummary, setPreviewSummary] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedExp = useMemo(
    () =>
      CREATIVE_EXPERIENCES.find((e) => e.id === selectedExperienceId) ??
      CREATIVE_EXPERIENCES[0],
    [selectedExperienceId],
  );

  useEffect(() => {
    // Clear stale preview if the visitor switches activities
    setPreviewSummary('');
    setCopied(false);
  }, [selectedExperienceId]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};
    if (!preferredDate) next.preferredDate = 'Please select a preferred date.';
    if (!preferredTime) next.preferredTime = 'Please enter a preferred time.';
    const guestCount = Number(guests);
    if (!guests || Number.isNaN(guestCount) || guestCount < 1 || guestCount > 30) {
      next.guests = 'Please enter a valid number of guests (1–30).';
    }
    if (!customerName.trim() || customerName.trim().length < 2) {
      next.customerName = 'Please enter your name.';
    }
    const digitsOnly = contactNumber.replace(/\D/g, '');
    if (digitsOnly.length < 10 || digitsOnly.length > 13) {
      next.contactNumber = 'Please enter a valid 10–13 digit contact number.';
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setPreviewSummary('');
      return;
    }

    const summary = buildEnquirySummary({
      experience: selectedExp,
      preferredDate,
      preferredTime,
      guests,
      customerName,
      contactNumber,
      message,
    });
    setPreviewSummary(summary);
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!previewSummary) return;
    try {
      await navigator.clipboard.writeText(previewSummary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="enquire"
      className="chapter chapter-compact enquiry-chapter"
      aria-labelledby="enquiry-heading"
    >
      <div className="chapter-inner">
        <div className="enquiry-panel">
          <div className="enquiry-info-col reveal">
            <span className="chapter-label">Studio Enquiry · Demo Mode</span>
            <h2 id="enquiry-heading" className="title headline-chapter" style={{ marginTop: '0.65rem' }}>
              Plan a creative moment.
            </h2>
            <p className="enquiry-intro">
              Choose an experience below to prepare an enquiry summary. Because this is a
              frontend demo, submitting creates a copyable preview rather than sending a live
              booking or claiming slot availability.
            </p>

            {/* Activity Selector Cards */}
            <div className="enquiry-activity-cards" role="radiogroup" aria-label="Choose creative experience">
              {CREATIVE_EXPERIENCES.map((exp) => {
                const selected = exp.id === selectedExp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onChangeExperience(exp.id)}
                    className={`enquiry-activity-option ${selected ? 'is-selected' : ''}`}
                  >
                    <div className="enquiry-activity-top">
                      <strong>{exp.title}</strong>
                      <span className="enquiry-activity-price">{exp.priceDisplay}</span>
                    </div>
                    <span className="enquiry-activity-sub">{exp.tagline}</span>
                  </button>
                );
              })}
            </div>

            <div className="enquiry-price-note">
              <Info size={16} aria-hidden="true" />
              <span>
                Listed price for <strong>{selectedExp.title}</strong>: <strong>{selectedExp.priceDisplay}</strong>.
                Pricing unit and group confirmation are verified directly with MIM.
              </span>
            </div>

            <CosmosFlower className="enquiry-cosmos-deco" />
          </div>

          <div className="enquiry-form-col reveal">
            <form onSubmit={handleSubmit} className="enquiry-form" noValidate>
              <div className="enquiry-field">
                <label htmlFor="enquiry-experience">Selected experience</label>
                <select
                  id="enquiry-experience"
                  value={selectedExp.id}
                  onChange={(e) =>
                    onChangeExperience(e.target.value as CreativeExperience['id'])
                  }
                >
                  {CREATIVE_EXPERIENCES.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.title} — {exp.priceDisplay}
                    </option>
                  ))}
                </select>
              </div>

              <div className="enquiry-grid-2">
                <div className="enquiry-field">
                  <label htmlFor="enquiry-date">Preferred date *</label>
                  <input
                    id="enquiry-date"
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                  />
                  {errors.preferredDate && (
                    <span id="err-date" className="enquiry-error" role="alert">
                      {errors.preferredDate}
                    </span>
                  )}
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-time">Preferred time *</label>
                  <input
                    id="enquiry-time"
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    aria-invalid={Boolean(errors.preferredTime)}
                    aria-describedby={errors.preferredTime ? 'err-time' : undefined}
                  />
                  {errors.preferredTime && (
                    <span id="err-time" className="enquiry-error" role="alert">
                      {errors.preferredTime}
                    </span>
                  )}
                </div>
              </div>

              <div className="enquiry-grid-2">
                <div className="enquiry-field">
                  <label htmlFor="enquiry-guests">Number of guests *</label>
                  <input
                    id="enquiry-guests"
                    type="number"
                    min={1}
                    max={30}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? 'err-guests' : undefined}
                  />
                  {errors.guests && (
                    <span id="err-guests" className="enquiry-error" role="alert">
                      {errors.guests}
                    </span>
                  )}
                </div>

                <div className="enquiry-field">
                  <label htmlFor="enquiry-name">Your name *</label>
                  <input
                    id="enquiry-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full name"
                    aria-invalid={Boolean(errors.customerName)}
                    aria-describedby={errors.customerName ? 'err-name' : undefined}
                  />
                  {errors.customerName && (
                    <span id="err-name" className="enquiry-error" role="alert">
                      {errors.customerName}
                    </span>
                  )}
                </div>
              </div>

              <div className="enquiry-field">
                <label htmlFor="enquiry-phone">Contact number *</label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="10-digit mobile number"
                  aria-invalid={Boolean(errors.contactNumber)}
                  aria-describedby={errors.contactNumber ? 'err-phone' : undefined}
                />
                {errors.contactNumber && (
                  <span id="err-phone" className="enquiry-error" role="alert">
                    {errors.contactNumber}
                  </span>
                )}
              </div>

              <div className="enquiry-field">
                <label htmlFor="enquiry-message">Optional message</label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share cake flavour preference, Clay Studio option, or questions..."
                />
              </div>

              <button type="submit" className="button">
                Generate Enquiry Preview
              </button>
            </form>

            {previewSummary && (
              <div className="enquiry-preview" aria-live="polite">
                <div className="enquiry-preview-top">
                  <span className="enquiry-preview-badge">
                    Demo Preview Ready — Copy to Share (Not Sent Automatically)
                  </span>
                  <button
                    type="button"
                    className="enquiry-copy-button"
                    onClick={handleCopy}
                  >
                    {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                    <span>{copied ? 'Copied!' : 'Copy Enquiry'}</span>
                  </button>
                </div>
                <pre className="enquiry-preview-text">{previewSummary}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const DAILY_QUOTES: readonly string[] = [
  'Just a little reminder that you are loved.',
  'A moment to slow down. A chance to create.',
  'A warm cup, a quiet corner, something sweet.',
  'Leave the rush outside the green door.',
  'Your canvas, your story.',
  'Good coffee waits for unhurried company.',
  'Something made by your hands, something to stay.',
  'Little moments are the ones that linger.',
  'Brewed warm, shared slow.',
  'Save a little afternoon for yourself.',
  'Quiet tables hold the best conversations.',
  'Bake a memory, paint a thought.',
  'Sunlight tastes sweeter with something warm.',
  'Golden lights and unhurried evenings.',
  'Come for the coffee, stay for the calm.',
  'Make something sweet, and make it yours.',
  'Let the day soften over a warm cup.',
  'Every small thing deserves a little care.',
  'A gentler pace lives just inside.',
  'Warm bread, soft music, unhurried hours.',
  'Take a breath between the busy things.',
  'Stories begin where the kettle sings.',
  'A corner for daydreamers and makers.',
  'Hold onto the quiet sweetness of today.',
  'Slow mornings turn ordinary days into keepsakes.',
  'Gather around what feels like home.',
  'A little colour, a little imagination, your own moment.',
  'Happiness often smells like fresh pastry.',
  'Be gentle with your time today.',
  'Crafted slowly, shared with affection.',
  'Made with a little love.',
];

/**
 * Selects a deterministic daily quote from a Siliguri calendar key (`YYYY-MM-DD`)
 * so the message rotates smoothly day by day in Siliguri local time.
 */
export function getDailyQuoteForDateKey(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return DAILY_QUOTES[0];
  const dayNumber = Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
  const index = ((dayNumber % DAILY_QUOTES.length) + DAILY_QUOTES.length) % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
}

export function formatSiliguriShortDate(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  if (!y || !m || !d) return dateKey;
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: 'numeric',
    month: 'short',
  }).format(new Date(Date.UTC(y, m - 1, d, 12, 0, 0)));
}

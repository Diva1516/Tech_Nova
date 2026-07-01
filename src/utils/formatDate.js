/**
 * TechNova E-Commerce — Date Formatting Utility
 * Provides human-readable date strings and relative "time ago" labels.
 */

/**
 * Format a Date (or date-string) into "DD Mon YYYY".
 *
 * @param {Date|string|number} date — Any value parseable by `new Date()`
 * @returns {string} e.g. "01 Jul 2026"
 *
 * @example
 * formatDate('2026-07-01') // "01 Jul 2026"
 */
export const formatDate = (date) => {
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid date';

    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return 'Invalid date';
  }
};

/**
 * Return a human-friendly relative time string.
 *
 * @param {Date|string|number} date — Any value parseable by `new Date()`
 * @returns {string} e.g. "2 days ago", "just now", "3 months ago"
 *
 * @example
 * timeAgo(new Date(Date.now() - 86400000 * 2)) // "2 days ago"
 */
export const timeAgo = (date) => {
  try {
    const now = Date.now();
    const then = new Date(date).getTime();
    if (isNaN(then)) return 'Invalid date';

    const seconds = Math.floor((now - then) / 1000);

    /** @type {Array<[number, string, string]>} [threshold, singular, plural] */
    const intervals = [
      [60, 'second', 'seconds'],
      [3600, 'minute', 'minutes'],
      [86400, 'hour', 'hours'],
      [2592000, 'day', 'days'],
      [31536000, 'month', 'months'],
      [Infinity, 'year', 'years'],
    ];

    if (seconds < 5) return 'just now';

    // Walk through the intervals from smallest to largest
    const divisors = [1, 60, 3600, 86400, 2592000, 31536000];
    for (let i = 0; i < intervals.length; i++) {
      const [threshold, singular, plural] = intervals[i];
      if (seconds < threshold) {
        const value = Math.floor(seconds / divisors[i]);
        return `${value} ${value === 1 ? singular : plural} ago`;
      }
    }

    return formatDate(date);
  } catch {
    return 'Invalid date';
  }
};

export default formatDate;

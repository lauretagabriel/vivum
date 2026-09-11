/* Dial codes for the phone field's country picker. A curated list, not the ISO 249 — a
   contact form's job is to accept a number, not to be a reference table, and a shorter list
   is faster to scan than it is to search. [iso, name, dial, flag].

   Flags are regional-indicator pairs, so they need no asset and no request. Where the
   platform has no flag font (Windows, most notably) the pair falls back to the two ISO
   letters, which is the right degradation: still an identifier, still legible, no box glyph.
   United States sits first because it is the default; everything after it is alphabetical. */
window.VV_COUNTRIES = [
  ['US', 'United States', '+1', '\uD83C\uDDFA\uD83C\uDDF8'],
  ['AU', 'Australia', '+61', '\uD83C\uDDE6\uD83C\uDDFA'],
  ['AT', 'Austria', '+43', '\uD83C\uDDE6\uD83C\uDDF9'],
  ['BE', 'Belgium', '+32', '\uD83C\uDDE7\uD83C\uDDEA'],
  ['BR', 'Brazil', '+55', '\uD83C\uDDE7\uD83C\uDDF7'],
  ['CA', 'Canada', '+1', '\uD83C\uDDE8\uD83C\uDDE6'],
  ['CL', 'Chile', '+56', '\uD83C\uDDE8\uD83C\uDDF1'],
  ['CN', 'China', '+86', '\uD83C\uDDE8\uD83C\uDDF3'],
  ['CZ', 'Czechia', '+420', '\uD83C\uDDE8\uD83C\uDDFF'],
  ['DK', 'Denmark', '+45', '\uD83C\uDDE9\uD83C\uDDF0'],
  ['EE', 'Estonia', '+372', '\uD83C\uDDEA\uD83C\uDDEA'],
  ['FI', 'Finland', '+358', '\uD83C\uDDEB\uD83C\uDDEE'],
  ['FR', 'France', '+33', '\uD83C\uDDEB\uD83C\uDDF7'],
  ['DE', 'Germany', '+49', '\uD83C\uDDE9\uD83C\uDDEA'],
  ['GR', 'Greece', '+30', '\uD83C\uDDEC\uD83C\uDDF7'],
  ['IN', 'India', '+91', '\uD83C\uDDEE\uD83C\uDDF3'],
  ['ID', 'Indonesia', '+62', '\uD83C\uDDEE\uD83C\uDDE9'],
  ['IE', 'Ireland', '+353', '\uD83C\uDDEE\uD83C\uDDEA'],
  ['IL', 'Israel', '+972', '\uD83C\uDDEE\uD83C\uDDF1'],
  ['IT', 'Italy', '+39', '\uD83C\uDDEE\uD83C\uDDF9'],
  ['JP', 'Japan', '+81', '\uD83C\uDDEF\uD83C\uDDF5'],
  ['MX', 'Mexico', '+52', '\uD83C\uDDF2\uD83C\uDDFD'],
  ['NL', 'Netherlands', '+31', '\uD83C\uDDF3\uD83C\uDDF1'],
  ['NZ', 'New Zealand', '+64', '\uD83C\uDDF3\uD83C\uDDFF'],
  ['NO', 'Norway', '+47', '\uD83C\uDDF3\uD83C\uDDF4'],
  ['PH', 'Philippines', '+63', '\uD83C\uDDF5\uD83C\uDDED'],
  ['PL', 'Poland', '+48', '\uD83C\uDDF5\uD83C\uDDF1'],
  ['PT', 'Portugal', '+351', '\uD83C\uDDF5\uD83C\uDDF9'],
  ['SA', 'Saudi Arabia', '+966', '\uD83C\uDDF8\uD83C\uDDE6'],
  ['SG', 'Singapore', '+65', '\uD83C\uDDF8\uD83C\uDDEC'],
  ['ZA', 'South Africa', '+27', '\uD83C\uDDFF\uD83C\uDDE6'],
  ['KR', 'South Korea', '+82', '\uD83C\uDDF0\uD83C\uDDF7'],
  ['ES', 'Spain', '+34', '\uD83C\uDDEA\uD83C\uDDF8'],
  ['SE', 'Sweden', '+46', '\uD83C\uDDF8\uD83C\uDDEA'],
  ['CH', 'Switzerland', '+41', '\uD83C\uDDE8\uD83C\uDDED'],
  ['TW', 'Taiwan', '+886', '\uD83C\uDDF9\uD83C\uDDFC'],
  ['TR', 'Türkiye', '+90', '\uD83C\uDDF9\uD83C\uDDF7'],
  ['AE', 'United Arab Emirates', '+971', '\uD83C\uDDE6\uD83C\uDDEA'],
  ['GB', 'United Kingdom', '+44', '\uD83C\uDDEC\uD83C\uDDE7'],
  ['UA', 'Ukraine', '+380', '\uD83C\uDDFA\uD83C\uDDE6'],
  ['VN', 'Vietnam', '+84', '\uD83C\uDDFB\uD83C\uDDF3'],
];

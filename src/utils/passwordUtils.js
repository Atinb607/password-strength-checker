// src/utils/passwordUtils.js

// Scoring function and criteria definitions
export function analyzePassword(password) {
  const criteria = [
    {
      label: "At least 8 characters",
      test: (pw) => pw.length >= 8
    },
    {
      label: "Contains uppercase letter",
      test: (pw) => /[A-Z]/.test(pw)
    },
    {
      label: "Contains lowercase letter",
      test: (pw) => /[a-z]/.test(pw)
    },
    {
      label: "Contains number",
      test: (pw) => /[0-9]/.test(pw)
    },
    {
      label: "Contains symbol",
      test: (pw) => /[^A-Za-z0-9]/.test(pw)
    },
    {
      label: "No common words",
      test: (pw) => !/(password|qwerty|12345|letmein|admin|welcome)/i.test(pw)
    },
    {
      label: "No repeated sequences",
      test: (pw) => !/(.)\1{2,}/.test(pw)
    }
  ];

  const results = criteria.map(c => c.test(password));
  let score = results.filter(Boolean).length; // 0-7

  // Bonus: longer passwords (extra up to 3)
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  // Penalty for short (<8)
  if (password.length > 0 && password.length < 8) score = Math.max(score - 1, 0);

  return {
    score: Math.min(score, 10), // cap score to 10
    criteriaMet: results,
    criteriaLabels: criteria.map(c => c.label)
  };
}

export function getPasswordSuggestions(password) {
  const suggestions = [];
  if (password.length < 8) suggestions.push("Make your password at least 8 characters.");
  if (!/[A-Z]/.test(password)) suggestions.push("Add an uppercase letter.");
  if (!/[a-z]/.test(password)) suggestions.push("Add a lowercase letter.");
  if (!/[0-9]/.test(password)) suggestions.push("Add a number.");
  if (!/[^A-Za-z0-9]/.test(password)) suggestions.push("Add a symbol.");
  if (/(password|qwerty|12345|letmein|admin|welcome)/i.test(password)) suggestions.push("Avoid common words or phrases.");
  if (/(.)\1{2,}/.test(password)) suggestions.push("Avoid repeated characters.");

  return suggestions;
}

// Strong password generator
export function generateStrongPassword(length = 14) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+{}[];:,.<>?";
  let chars = upper + lower + numbers + symbols;

  let password = [
    upper[Math.floor(Math.random()*upper.length)],
    lower[Math.floor(Math.random()*lower.length)],
    numbers[Math.floor(Math.random()*numbers.length)],
    symbols[Math.floor(Math.random()*symbols.length)]
  ];

  for (let i = password.length; i < length; i++) {
    password.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  // Shuffle result
  return password.sort(() => Math.random() - 0.5).join('');
}

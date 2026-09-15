export function titleCase(value) {
  return value.toLowerCase().replace(/(^|[\s.])\p{L}/gu, (letter) => letter.toUpperCase());
}

export function initials(name) {
  const parts = name.trim().split(/\s+/);
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`;
}

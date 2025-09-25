// Check if string starts with "**"
export function checkHeading(str) {
  return /^\*\*(.*)/.test(str.trim());
}

// Remove leading and optional trailing "**"
export function cleanHeading(str) {
  return str.replace(/^\*\*(.*?)\*\*?$/, "$1").trim();
}

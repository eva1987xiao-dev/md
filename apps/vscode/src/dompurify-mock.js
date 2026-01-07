// Simple DOMPurify mock for VS Code extension
// Since we're running in a trusted Node.js environment and the markdown
// comes from the user's own files, we can safely skip sanitization

module.exports = {
  sanitize: (html, _options) => html,
  default: {
    sanitize: (html, _options) => html,
  },
}

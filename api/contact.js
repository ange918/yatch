import { handleContactRequest } from '../server/contact/handler.js'

// Fonction Node.js (signature Web documentée pour le dossier /api).
// Le runtime reste Node : pas de runtime Edge.
export const maxDuration = 15

export default {
  async fetch(request) {
    return handleContactRequest(request)
  },
}

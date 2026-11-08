/**
 * MOFIXA site configuration
 * Update these values before go-live. Every page reads from this file.
 */
const MOFIXA = {
    businessName: "MOFIXA",
    tagline: "Computer Repair & Shop",
    location: "Lebanon",
    currencySymbol: "$",

    // TODO: replace with the real MOFIXA WhatsApp number (country code, digits only)
    whatsappNumber: "96100000000",
    // TODO: replace with the display phone number customers should see
    phoneDisplay: "+961 00 000 000",
    // TODO: replace with the real MOFIXA email
    email: "hello@mofixa.lb",

    whatsappUrl(message) {
        const base = `https://wa.me/${this.whatsappNumber}`;
        if (!message) return base;
        return `${base}?text=${encodeURIComponent(message)}`;
    },

    mailtoUrl({ subject = "MOFIXA inquiry", body = "" } = {}) {
        const params = new URLSearchParams();
        if (subject) params.set("subject", subject);
        if (body) params.set("body", body);
        const query = params.toString();
        return `mailto:${this.email}${query ? `?${query}` : ""}`;
    },

    formatPrice(amount) {
        return `${this.currencySymbol}${amount}`;
    }
};

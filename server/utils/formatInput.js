import sanitize from "sanitize-html";

export const sanitizeInput = (input) => {
    // Define allowed HTML tags and attributes
    const cleanInput = sanitize(input, {
        allowedTags: [],
        allowedAttributes: {}
    });
    return cleanInput;
};

export const capitalizeFirstLetter = (input) => {
    if (typeof input !== 'string' || input.length === 0) {
      return input;
    }
    input = input.toLowerCase();
    return input.charAt(0).toUpperCase() + input.slice(1);
};

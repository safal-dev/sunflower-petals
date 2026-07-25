const fs = require('fs');
const content = fs.readFileSync('/Users/samreshan/.gemini/antigravity/brain/8ebda6c1-92eb-4cf1-8fba-cee338ed7608/.system_generated/steps/2719/content.md', 'utf8');

// Match sequences of characters that look like English sentences/paragraphs inside double quotes
const matches = content.match(/"([^"]{40,})"/g);

if (matches) {
    console.log("EXTRACTED_TEXT_START");
    matches.forEach(m => {
        const text = m.slice(1, -1);
        if (text.includes(' ') && !text.includes('<svg') && !text.includes('path d=')) {
            console.log("---");
            console.log(text);
        }
    });
    console.log("EXTRACTED_TEXT_END");
} else {
    console.log("No matches found.");
}

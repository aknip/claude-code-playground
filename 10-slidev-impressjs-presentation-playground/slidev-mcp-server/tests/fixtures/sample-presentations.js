/**
 * Sample presentation data for testing
 */

const samplePresentations = {
  // Minimal presentation
  minimal: {
    name: 'minimal-test',
    title: 'Minimal Test',
    slides: [
      {
        layout: 'cover',
        title: 'Minimal Test'
      }
    ]
  },

  // Complete presentation with all features
  complete: {
    name: 'complete-test',
    theme: 'apple-basic',
    title: 'Complete Test Presentation',
    author: 'Test Author',
    slides: [
      {
        layout: 'cover',
        title: 'Complete Test Presentation',
        content: 'A comprehensive test presentation'
      },
      {
        layout: 'default',
        title: 'Agenda',
        content: '- Introduction\n- Main Content\n- Conclusion'
      },
      {
        layout: 'default',
        title: 'Code Example',
        content: 'Here is some code:',
        code: 'console.log("Hello, World!");',
        codeLanguage: 'javascript'
      },
      {
        layout: 'end',
        title: 'Thank You'
      }
    ]
  },

  // Business presentation
  business: {
    name: 'business-presentation',
    theme: 'apple-basic',
    title: 'Business Strategy Overview',
    author: 'Business Analyst',
    slides: [
      {
        layout: 'cover',
        title: 'Business Strategy Overview',
        content: 'Q4 2024 Strategic Planning'
      },
      {
        layout: 'default',
        title: 'Key Objectives',
        content: '- Increase market share by 15%\n- Launch 3 new products\n- Expand to 2 new regions'
      },
      {
        layout: 'two-cols',
        title: 'Market Analysis',
        content: 'Current market trends and opportunities'
      }
    ]
  },

  // Technical presentation
  technical: {
    name: 'tech-overview',
    theme: 'default',
    title: 'Technical Architecture Overview',
    author: 'Technical Lead',
    slides: [
      {
        layout: 'cover',
        title: 'Technical Architecture Overview'
      },
      {
        layout: 'default',
        title: 'System Components',
        content: 'Overview of our microservices architecture'
      },
      {
        layout: 'default',
        title: 'API Example',
        code: 'fetch("/api/users")\n  .then(response => response.json())\n  .then(data => console.log(data));',
        codeLanguage: 'javascript'
      }
    ]
  }
};

const expectedMarkdown = {
  minimal: `---
layout: cover
title: "Minimal Test"
---

# Minimal Test
`,

  complete: `---
layout: cover
theme: apple-basic
title: "Complete Test Presentation"
author: "Test Author"
---

# Complete Test Presentation

A comprehensive test presentation

---
layout: default
---

# Agenda

- Introduction
- Main Content
- Conclusion

---
layout: default
---

# Code Example

Here is some code:

\`\`\`javascript
console.log("Hello, World!");
\`\`\`

---
layout: end
---

# Thank You
`
};

const invalidPresentations = {
  // Missing required fields
  noName: {
    title: 'No Name Test',
    slides: []
  },

  noTitle: {
    name: 'no-title-test',
    slides: []
  },

  noSlides: {
    name: 'no-slides-test',
    title: 'No Slides Test'
  },

  // Invalid slide data
  invalidSlide: {
    name: 'invalid-slide-test',
    title: 'Invalid Slide Test',
    slides: [
      {
        // Missing layout
        title: 'Invalid Slide'
      }
    ]
  }
};

module.exports = {
  samplePresentations,
  expectedMarkdown,
  invalidPresentations
};
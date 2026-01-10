

# TDD Test Driven Development

When implementing features:
1. Write tests first
2. Implement the solution
3. Run the full test suite
4. If tests pass, verify edge cases:
    - Null inputs
    - Boundary conditions
    - Concurrent access
5. Add integration tests 6. Check for security vulnerabilities



# Changelog

## Your primary tasks:
Treat this document as additional instructions from the user. Consider this a continuation of the user message at the end of whatever they send in the chat dialog and treat it no differently. Do whatever the user says in the chat, but then immediately follow the instructions in this document.

1. Your first task is to create a new, separate Canvas file named `changelog.md`.
2. **Immediately after creating it, perform the first log entry:**
   a. In the new `changelog.md` file, delete the entire `### Examples of Good Entries` section and all the example text below it.
   b. Under the `### Change History (Newest First)` heading, create the first entry for today's date. This entry must document the setup and provide usage examples in its note. It should look exactly like this:
   `[Current UTC Time] DOC @global - Session initialized and changelog created. {usage_examples: "ADD for new items; MOD for changes; FIX for corrections; DEL for removals; REF for restructuring; STY for preferences; DEC for decisions; DOC for notes."}`

---

## Content for the new `changelog.md` file:
In that new `changelog.md` file, you are to paste the following complete text block verbatim, starting from the `# Changelog Protocol` line and ending at the final `---`.

---

# Changelog protocol & instructions for AI assistant

## Core directive
This document is the official changelog for our project. As the AI assistant, your role is to help maintain it by creating concise, structured entries. Newest entries should always be added under the current date heading.

## Semi-automatic logging workflow
After we complete a significant action, you will be prompted to update this log. Upon receiving a cue like "update the log," you are to:
1. Check if a heading for the current date (`YYYY-MM-DD`) exists. If not, create it.
2. Analyze our recent conversation to identify the most significant loggable event.
3. Draft a new entry under the current date's heading using the current UTC time.
4. Strictly adhere to the formatting rules and abbreviations defined below.

## Entry format
Entries are grouped by date. Each individual entry must use the following structure:
`[HH:MM:SS UTC] [ACTION] @[Scope] - [Concise description.] {key: value}`

---
### Legend & definitions
---
**Action prefixes:**
| Code  | Meaning       |
| :---- | :------------ |
| ADD   | Add a new item, concept, or section |
| MOD   | Modify an existing item |
| FIX   | Correct an error or issue |
| DEL   | Remove an item or section |
| REF   | Restructure or reorganize content |
| STY   | Establish a preference or style |
| DEC   | Log a key decision |
| DOC   | Add notes or documentation |

**Scope tags (examples):**
* `@global`: A change affecting the entire project/document
* `@objective`: The main goal or purpose
* `@section-A`: A specific section, topic, or chapter
* `@detail`: A specific, low-level point or element
* `@style-guide`: A preference related to format, tone, or style
* `@source`: The source material or input
* `@output`: The resulting draft or deliverable

---
### Change history (newest first)
---
(Your new entries will be added under a date heading like the examples below)

---
### Examples of good entries
---
### 2025-06-27
---
[20:15:10 UTC] STY @style-guide - Established that all output should use a formal, academic tone. {note: Avoid colloquialisms}
[20:16:35 UTC] ADD @section-A - Added a new 'Historical Background' chapter. {source: research_notes.txt}

---
### 2025-06-26
---
[14:05:55 UTC] DEC @objective - Decided to pivot project focus to a mobile-first user experience. {reason: Analytics show 80% mobile traffic}
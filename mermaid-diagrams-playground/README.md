# Agents and skill for creating a mermaid diagram

## Quickstart Guide

Use agent:
```
@"agent-Assisant for creating a mermaid diagram" Create a gannt chart for the rollout of a SAP CRM solution. do not ask additional questions, just create the diagram. 
```

Convert Mermaid to PNG and SVG:
python convert_mermaid_to_png_svg.py timeline.mmd


## What's in

### Skills by Anthropic

- Source: https://claude-plugins.dev/skills/@BlueEventHorizon/Swift-Selena/mermaid-diagram

### Agent "Assisant for creating a mermaid diagram""

- Based on "Mermaid Prompt Pack" (univeral-prompt-template.md)
- Enhanced by the other prompts from the pack. The agent has a reference to the pack.
- Mermaid Prompt Pack: https://www.youtube.com/watch?v=0pzu6bSvB7A

## Mermaid Diagrams Examples and Editor

- https://www.mermaidchart.com/play?new=true

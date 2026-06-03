# premium-vibe-styler SKILL.md
---
name: premium-vibe-styler
description: Generates high-end CSS style systems based on Lovable and Chlavm aesthetics (Dark Mode, Glow, Typography).
agent: any
input_schema:
  type: object
  properties:
    base_mode:
      type: string
      enum: [deep_dark, cosmic_gradient, clean_tech]
    accent_color:
      type: string
    typography_vibe:
      type: string
      enum: [technical_wide, bold_community, minimalist_clean]
  required: [base_mode, accent_color, typography_vibe]
run: |
  # Inspired by Chlavm Lovable and Chlavm CA
  antigravity --task "Generate a CSS design system with {{input.base_mode}} as the base. 
  Use {{input.accent_color}} for glow effects and primary actions.
  Implement {{input.typography_vibe}} using Google Fonts or system stacks.
  Include utility classes for glassmorphism, depth layers, and smooth hover transitions."
---

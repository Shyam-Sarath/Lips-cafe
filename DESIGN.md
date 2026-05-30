---
name: Vibrant Wave
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ad'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#add500'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#c6f311'
  on-primary-container: '#576c00'
  inverse-primary: '#516600'
  secondary: '#ffb0cd'
  on-secondary: '#640039'
  secondary-container: '#aa0266'
  on-secondary-container: '#ffbad3'
  tertiary: '#ffffff'
  on-tertiary: '#3c0091'
  tertiary-container: '#e9ddff'
  on-tertiary-container: '#7342dd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c6f311'
  primary-fixed-dim: '#add500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#ffd9e4'
  secondary-fixed-dim: '#ffb0cd'
  on-secondary-fixed: '#3e0022'
  on-secondary-fixed-variant: '#8c0053'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 42px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 80px
---

## Brand & Style
The brand personality is energetic, "cozy-funky," and unapologetically bold. It targets a youthful, social audience that values experimental aesthetics and high-energy environments. 

The visual style is a fusion of **Glassmorphism** and **Modern Retro**. It utilizes the wavy, organic patterns found in the cafe's interior to break traditional grid structures. The "cozy" aspect is maintained through a dark-themed base, allowing the vibrant lime, pink, and purple accents to pop with a neon-like intensity. Surfaces should feel tactile and layered, using translucent blurs to mimic the play of light on the cafe's polished surfaces and warm accent lighting.

## Colors
This design system operates on a deep, dark foundation to anchor the high-saturation accent colors.

- **Primary (Lime Green):** Used for primary actions, success states, and key highlights. It represents the tables and energy of the space.
- **Secondary (Vibrant Pink):** Inspired by the "Lips" branding and wall patterns. Used for secondary call-to-actions and brand expression.
- **Tertiary (Electric Purple):** Used for interactive states, deep shadows, and accent gradients.
- **Neutral (Dark Charcoal):** The canvas for the application. A dark neutral prevents the vibrant palette from becoming overwhelming.
- **Accent (Warm Amber):** Derived from the cafe's lighting, used sparingly for "golden hour" glows and notification badges.

## Typography
The typography is modern and approachable with a technical edge. **Sora** provides a geometric, futuristic feel for headlines that echoes the "funky" nature of the interior. **Plus Jakarta Sans** is used for body text to maintain friendliness and readability against dark backgrounds. 

Large display titles should often use a gradient transition between the Secondary and Tertiary colors to mimic the wavy wall patterns. All labels should be in uppercase with slight tracking to ensure legibility in high-contrast environments.

## Layout & Spacing
The layout follows a **Fluid Grid** with an emphasis on organic movement. While the structural elements align to a standard 12-column grid, background decorative elements and image containers should utilize "wavy" masks or asymmetrical placements to reflect the cafe's wall art.

- **Mobile:** 4-column grid with 16px margins. Content is stacked vertically with generous 32px gaps between cards.
- **Desktop:** 12-column grid with 64px margins. Use staggered heights for image galleries to create a rhythmic, non-linear flow.
- **Rhythm:** An 8px base unit drives all padding and margin decisions, ensuring a tight, systematic feel despite the expressive colors.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and **Glassmorphism**. Rather than traditional black shadows, this design system uses "Glow Shadows"—low-opacity drop shadows that inherit the color of the element (e.g., a Lime Green button casts a faint Lime glow).

Upper-tier elements like modals and floating navigation bars use a backdrop blur (20px to 40px) with a semi-transparent dark fill (60% opacity) and a 1px "inner glow" border to separate them from the background. This creates a "neon-on-glass" effect that feels premium and immersive.

## Shapes
The shape language is "Rounded" but controlled. Standard UI components like buttons and inputs use a 0.5rem (8px) radius to maintain a modern, friendly look. 

However, larger containers and "hero" images should feature a **custom wavy radius** on at least one corner, or a complete organic blob shape, to directly reference the cafe's signature interior patterns. These organic shapes should be used as masks for food photography to integrate the product into the brand environment.

## Components
- **Buttons:** Primary buttons are Lime Green with black text for maximum contrast. They feature a slight outer glow on hover. Secondary buttons use a "ghost" style with a Pink border.
- **Cards:** Feature a dark surface slightly lighter than the background (#2A2A2A). They use a subtle 1px border gradient (Purple to Pink).
- **Chips:** Highly rounded (pill-shaped) with low-opacity background tints of the accent colors.
- **Input Fields:** Dark backgrounds with a 1px bottom border. On focus, the border transitions to a Lime Green to Purple gradient.
- **Wavy Dividers:** Instead of flat horizontal lines, use a subtle 20px high SVG wave to separate sections.
- **Selection Controls:** Checkboxes and radios use the Primary Lime Green color for the "checked" state, appearing like small glowing lights.
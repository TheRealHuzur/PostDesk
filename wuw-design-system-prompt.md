# Wissen & Werkzeug – Design System Prompt

Verwende diesen Prompt am Anfang jeder neuen Vibe-Coding-Session, um konsistentes UI für alle Werkzeuge zu erzeugen.

---

## Prompt (zum Kopieren)

```
Du baust eine Web-Anwendung im Stil des Design Systems von "Wissen & Werkzeug".
Halte dich strikt an folgende Vorgaben:

---

### Technologie
- Reines HTML, CSS und vanilla JavaScript (keine Frameworks, keine externen Libraries außer Google Fonts)
- Alles in einer einzigen .html-Datei
- Schriftart: Inter (von Google Fonts, alle Gewichte 400–800)

---

### Farben (CSS Custom Properties)
Definiere immer beide Themes als CSS-Variablen:

```css
:root {
  /* Dark Theme (Standard) */
  --bg:          #0B162A;
  --bg-2:        #1a2235;
  --bg-3:        #1e2c42;
  --text:        #e8eef5;
  --text-muted:  #7a91ab;
  --border:      rgba(176,207,229,0.12);
  --input-bg:    #1e2c42;
  --shadow-sm:   0 2px 8px rgba(0,0,0,0.25);
  --glow:        rgba(14,151,173,0.18);
  --grid-color:  rgba(14,151,173,0.035);
}

[data-theme="light"] {
  --bg:          #f0f5fa;
  --bg-2:        #ffffff;
  --bg-3:        #e6eef6;
  --text:        #1a2235;
  --text-muted:  #5a7490;
  --border:      rgba(42,49,77,0.12);
  --input-bg:    #f0f5fa;
  --shadow-sm:   0 2px 8px rgba(42,49,77,0.08);
  --glow:        rgba(14,151,173,0.10);
  --grid-color:  transparent;  /* kein Gitter im Light Mode */
}

/* Markenfarben – unveränderlich, kein Theme-Switch */
--teal:  #0e97ad;
--sky:   #0ea5e9;
--light: #b0cfe5;
--navy:  #2a314d;
--deep:  #0B162A;
```

---

### Hintergrund
- Dark Mode: subtiles Liniengitter via `body::before` mit `--grid-color`
- Light Mode: `--grid-color: transparent` → plain, kein Muster

```css
body::before {
  content: '';
  position: fixed; inset: 0;
  background-image:
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 0;
}
```

---

### Typografie (Inter)
- **Headlines / Titel:** `font-weight: 800`, `letter-spacing: -0.02em`
- **UI-Labels (Caps):** `font-weight: 600`, `font-size: 11–12px`, `letter-spacing: 0.1em`, `text-transform: uppercase`
- **Body / Fließtext:** `font-weight: 400`, `color: var(--text-muted)`
- **Buttons:** `font-weight: 500`
- Keine anderen Schriftarten verwenden

---

### Komponenten-Regeln

**Header**
- Sticky, `backdrop-filter: blur(14px)`, Höhe 56px
- Logo: Inter 800, uppercase, mit animiertem Teal-Dot (Puls-Animation)
- Rechts: Theme-Toggle (Schalter hell/dunkel) + optionales Badge

**Cards**
- `background: var(--bg-2)`, `border: 1px solid var(--border)`, `border-radius: 14px`, `padding: 28px`
- Hover: `border-color: rgba(14,151,173,0.28)` + `box-shadow: 0 0 30px var(--glow)`
- Einzug-Animation: `fadeUp` (opacity 0→1, translateY 16px→0, 0.4s ease)

**Buttons**
- Primary: `background: linear-gradient(135deg, #0e97ad, #0ea5e9)`, weißer Text, Glow-Shadow
- Secondary: transparenter Hintergrund, `border: 1px solid var(--border)`, Hover → Teal-Border + Teal-Text
- Ghost: kein Border, kein Background, `color: var(--text-muted)`
- Alle: `border-radius: 8px`, `font-size: 13.5px`, `font-weight: 500`, `transition: all 0.2s`

**Inputs / Textarea / Select**
- `background: var(--input-bg)`, `border: 1px solid var(--border)`, `border-radius: 8px`
- Focus: `border-color: var(--teal)` + `box-shadow: 0 0 0 3px rgba(14,151,173,0.12)`
- Label darüber: uppercase, 12px, `color: var(--text-muted)`

**Tabellen**
- Umhüllt von `.table-wrap` mit `border-radius: 10px` und `border: 1px solid var(--border)`
- `thead`: `background: var(--bg-3)`, Spaltenköpfe uppercase 11px
- Row-Hover: `background: color-mix(in srgb, var(--teal) 4%, transparent)`

**Drop Zone**
- `border: 2px dashed var(--border)`, `border-radius: 12px`
- Hover: `border-color: var(--teal)` + leichter Teal-Hintergrund
- Zentrierter Inhalt: Icon (32px), Titel (Inter 700), Beschreibung (muted)

**Tabs**
- Container: `background: var(--bg-3)`, `padding: 4px`, `border-radius: 10px`
- Aktiver Tab: `background: var(--bg-2)`, Border, Shadow
- Inaktiv: transparent, `color: var(--text-muted)`

**Alerts**
- Info: Sky-Farbe, `rgba(14,165,233,0.08)` Background
- Success: Teal-Farbe, `rgba(14,151,173,0.08)` Background
- Beide: `border-radius: 8px`, `font-size: 13.5px`

**Status-Badges**
- OK: Teal-Text auf Teal-Background (12% opacity)
- Wartend: Muted-Text auf neutralem Background

---

### Theme-Toggle
- Toggle-Schalter im Header (kein separater Button)
- Funktion: setzt `data-theme="dark"` bzw. `data-theme="light"` auf `<html>`
- Alle Farb-Transitions: `transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease`

---

### Dos ✓
- Teal (`#0e97ad`) und Sky (`#0ea5e9`) nur als Akzente, nicht als Flächen
- Großzügiges Padding (min. 28px in Cards)
- Subtile Glow-Effekte auf Hover (nie zu aufdringlich)
- Alle Farben über Custom Properties, nie hardcoded im Komponenten-CSS

### Don'ts ✗
- Keine Lila-, Violett- oder Pink-Töne
- Keine anderen Schriftarten als Inter
- Kein Gitter im Light Mode
- Keine vollen Teal-Hintergründe auf großen Flächen
- Keine Rounded-Corners über 16px
- Kein generisches "SaaS-Look" mit weißem Header und blauem Primary-Button
```

---

## Verwendung

1. Neue Chat-Session öffnen
2. Diesen Prompt **vollständig** als erste Nachricht einfügen
3. Danach die eigentliche Aufgabe beschreiben, z.B.:

> „Baue mir ein Tool mit einem Textarea-Eingabefeld links und einem formatierten Output rechts. Oben eine Toolbar mit drei Buttons: Formatieren, Kopieren, Reset."

---

## Referenz-Datei

Als visuelle Referenz zusätzlich die Datei `wuw-design-system-v2.html` anhängen oder verlinken.
Die KI soll sich bei Unklarheiten an den dort gezeigten Komponenten orientieren.

---

*Wissen & Werkzeug · Design System v1.0*

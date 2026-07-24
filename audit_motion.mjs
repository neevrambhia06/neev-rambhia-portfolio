import fs from 'fs';
import path from 'path';

const sectionsDir = 'D:/Projects/portfolio/components/sections';
const files = fs.readdirSync(sectionsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const p = path.join(sectionsDir, file);
  let content = fs.readFileSync(p, 'utf-8');

  // 1. Audit GSAP durations and easings
  // Standardize GSAP duration for reveals to 0.5 or 0.6
  content = content.replace(/duration:\s*0\.[789],/g, 'duration: 0.5,');
  content = content.replace(/duration:\s*1([.0-9]*),/g, 'duration: 0.6,');
  // Stagger to 0.1
  content = content.replace(/stagger:\s*0\.1[0-9],/g, 'stagger: 0.1,');
  // Easing to power2.out
  content = content.replace(/ease:\s*"power[34]\.out"/g, 'ease: "power2.out"');

  // 2. Section dividers
  // Replace className="bg-bg py-24 sm:py-32" with className="bg-bg py-24 sm:py-32 border-t border-border/40 relative"
  // Except for Hero which is first section (no border-t)
  if (file !== 'Hero.tsx' && file !== 'Contact.tsx') {
    if (!content.includes('border-t border-border/40')) {
      content = content.replace(/className="bg-bg py-24 sm:py-32"/g, 'className="bg-bg py-24 sm:py-32 border-t border-border/40 relative"');
    }
  }

  // 3. Hover/focus states
  // We'll manually fix specific interactive elements if they lack focus-visible

  fs.writeFileSync(p, content, 'utf-8');
}

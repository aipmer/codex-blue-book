// Serialize this function into the project's browser executor. Rules select text links only.
export function inspectLinks({ rules = [], publicOrigin = location.origin } = {}) {
  const failures = [];
  let checked = 0;
  for (const rule of rules) {
    const links = [...document.querySelectorAll(rule.selector)].filter(a => a.checkVisibility());
    if (rule.required && !links.length) failures.push({ type: 'missing-link-scope', selector: rule.selector });
    for (const a of links) {
      checked++;
      const label = a.textContent.trim().slice(0, 100);
      const c = getComputedStyle(a);
      const after = getComputedStyle(a, '::after');
      const before = getComputedStyle(a, '::before');
      const href = a.getAttribute('href') || '';
      const url = new URL(href, publicOrigin);
      const external = /^https?:$/.test(url.protocol) && url.origin !== new URL(publicOrigin).origin;
      const exempt = a.hasAttribute('download') || !/^https?:$/.test(url.protocol);
      if (rule.underline !== false && !c.textDecorationLine.includes('underline')) failures.push({ type: 'missing-underline', label });
      if (rule.color) {
        const probe = document.createElement('span');
        probe.style.color = rule.color;
        a.append(probe);
        const expected = getComputedStyle(probe).color;
        probe.remove();
        if (c.color !== expected) failures.push({ type: 'link-color', label, actual: c.color, expected });
      }
      const svgs = [...a.querySelectorAll(rule.iconSelector || '.lucide-external-link, [data-external-icon]')];
      const pseudos = [before, after].filter(p => p.display !== 'none' && p.content !== 'none' && p.maskImage !== 'none');
      const icons = svgs.length + pseudos.length;
      if (/[↗]/.test(a.textContent)) failures.push({ type: 'bare-external-arrow', label });
      if (icons > 1) failures.push({ type: 'duplicate-external-icon', label, count: icons });
      if ((!external || exempt) && icons) failures.push({ type: 'wrong-external-icon', label, href });
      if (rule.externalIcon && external && !exempt && !icons) failures.push({ type: 'missing-external-icon', label });
      for (const icon of svgs) {
        const box = icon.getBoundingClientRect();
        if (Math.min(box.width, box.height) < 13.9) failures.push({ type: 'small-link-icon', label, width: box.width, height: box.height });
        if (getComputedStyle(icon).color !== c.color) failures.push({ type: 'icon-color', label });
      }
      for (const p of pseudos) if (Math.min(parseFloat(p.width), parseFloat(p.height)) < 13.9) failures.push({ type: 'small-pseudo-icon', label });
    }
  }
  return { url: location.href, width: innerWidth, checked, failures };
}

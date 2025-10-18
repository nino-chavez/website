// Svelte action: dispatches `progress` events with { progress: number }
// progress is 0..1 based on how far the element has scrolled through the viewport
// Options: { offsetTop?: number (px), offsetBottom?: number (px), clamp?: boolean }

export type ScrollProgressDetail = { progress: number };
export type ScrollProgressOptions = {
  offsetTop?: number;
  offsetBottom?: number;
  clamp?: boolean;
};

export function scrollProgress(node: HTMLElement, options: ScrollProgressOptions = {}) {
  const { offsetTop = 0, offsetBottom = 0, clamp = true } = options;

  let raf = 0;

  const calc = () => {
    const rect = node.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Start when top of el hits bottom of viewport - offsetTop
    const start = viewH - offsetTop;
    // End when bottom of el hits top of viewport + offsetBottom
    const end = -rect.height + offsetBottom;

    // How far top has moved past start to end (negative numbers as we scroll up)
    const y = rect.top - start; // y goes from 0 -> end
    let p = (start - rect.top) / (start - end);

    if (clamp) {
      p = Math.max(0, Math.min(1, p));
    }

    node.dispatchEvent(new CustomEvent<ScrollProgressDetail>('progress', { detail: { progress: p } }));
  };

  const onScroll = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(calc);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  // initial
  onScroll();

  return {
    destroy() {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    }
  };
}

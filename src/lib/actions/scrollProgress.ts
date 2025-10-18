// Svelte action: dispatches `progress` events with { progress: number }
// progress is 0..1 based on how far the element has scrolled through the viewport
// Options: { offsetTop?: number (px), offsetBottom?: number (px), clamp?: boolean }

export type ScrollProgressDetail = { progress: number };
export type ScrollProgressOptions = {
  offsetTop?: number;
  offsetBottom?: number;
  clamp?: boolean;
  disabled?: boolean;
};

export function scrollProgress(node: HTMLElement, initialOptions: ScrollProgressOptions = {}) {
  let { offsetTop = 0, offsetBottom = 0, clamp = true, disabled = false } = initialOptions;

  let raf = 0;
  let attached = false;

  const calc = () => {
    const rect = node.getBoundingClientRect();
    const viewH = window.innerHeight;

    // Start when top of el hits bottom of viewport - offsetTop
    const start = viewH - offsetTop;
    // End when bottom of el hits top of viewport + offsetBottom
    const end = -rect.height + offsetBottom;

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

  function attach() {
    if (attached) return;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    attached = true;
    onScroll();
  }

  function detach() {
    if (!attached) return;
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    if (raf) cancelAnimationFrame(raf);
    attached = false;
  }

  if (!disabled) attach();

  return {
    update(newOptions: ScrollProgressOptions = {}) {
      const prevDisabled = disabled;
      offsetTop = newOptions.offsetTop ?? offsetTop;
      offsetBottom = newOptions.offsetBottom ?? offsetBottom;
      clamp = newOptions.clamp ?? clamp;
      disabled = newOptions.disabled ?? false;

      if (disabled && !prevDisabled) {
        detach();
        // Optionally emit a final progress state; callers can ignore if not needed
        node.dispatchEvent(new CustomEvent<ScrollProgressDetail>('progress', { detail: { progress: 1 } }));
      } else if (!disabled && prevDisabled) {
        attach();
      } else if (!disabled) {
        // re-calc with updated options
        onScroll();
      }
    },
    destroy() {
      detach();
    }
  };
}

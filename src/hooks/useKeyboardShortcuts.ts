import { onMount } from 'svelte';

export function useKeyboardShortcuts() {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case '1':
        // Logic for shortcut 1
        break;
      case '2':
        // Logic for shortcut 2
        break;
      // Add more shortcuts as needed
      default:
        break;
    }
  };

  onMount(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
}
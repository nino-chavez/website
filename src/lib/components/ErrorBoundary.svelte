<script>
  import { onMount } from 'svelte';

  export let fallback = null;
  export let onError = (error) => console.error('ErrorBoundary caught:', error);
  
  let error = null;
  let errorInfo = null;

  function handleError(event) {
    error = event.error || event.reason;
    errorInfo = {
      message: error?.message || 'Unknown error',
      stack: error?.stack || '',
      timestamp: new Date().toISOString()
    };
    onError(error);
    
    // Prevent default error handling
    event.preventDefault();
  }

  function handleReset() {
    error = null;
    errorInfo = null;
  }

  onMount(() => {
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  });
</script>

{#if error}
  {#if fallback}
    <svelte:component this={fallback} {error} {errorInfo} onReset={handleReset} />
  {:else}
    <div 
      class="p-8 mx-auto max-w-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-lg"
      role="alert"
      aria-live="assertive"
    >
      <div class="flex items-start gap-4">
        <svg 
          class="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        
        <div class="flex-1">
          <h3 class="text-lg font-bold text-red-800 dark:text-red-200 mb-2">
            Something went wrong
          </h3>
          <p class="text-red-700 dark:text-red-300 mb-4">
            {errorInfo?.message || 'An unexpected error occurred'}
          </p>
          
          <div class="flex gap-3">
            <button
              on:click={handleReset}
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try Again
            </button>
            <button
              on:click={() => window.location.reload()}
              class="px-4 py-2 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 text-red-600 dark:text-red-400 font-semibold border border-red-200 dark:border-red-800 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reload Page
            </button>
          </div>
          
          {#if errorInfo?.stack}
            <details class="mt-4">
              <summary class="text-sm text-red-600 dark:text-red-400 cursor-pointer hover:underline">
                Show error details
              </summary>
              <pre class="mt-2 text-xs text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/20 p-3 rounded overflow-x-auto">
{errorInfo.stack}
              </pre>
            </details>
          {/if}
        </div>
      </div>
    </div>
  {/if}
{:else}
  <slot />
{/if}

<style>
  /* Ensure error boundary takes full width */
  :global(.error-boundary-wrapper) {
    width: 100%;
  }
</style>
/**
 * Vercel Speed Insights Integration
 * 
 * This script initializes Vercel Speed Insights for tracking
 * web vitals and performance metrics on this portfolio site.
 * 
 * The script automatically tracks Core Web Vitals (LCP, FID, CLS)
 * and other performance metrics when deployed to Vercel.
 */

// Initialize the Speed Insights queue
(function() {
  'use strict';
  
  // Create the Speed Insights queue if it doesn't exist
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };

  // Dynamically load the Speed Insights script
  function loadSpeedInsights() {
    // Only load in production (when deployed to Vercel)
    const isDevelopment = window.location.hostname === 'localhost' || 
                         window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      console.log('[Speed Insights] Running in development mode - tracking disabled');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://va.vercel-scripts.com/v1/speed-insights/script.js';
    script.defer = true;
    
    // Add error handling
    script.onerror = function() {
      console.error('[Speed Insights] Failed to load tracking script');
    };
    
    script.onload = function() {
      console.log('[Speed Insights] Tracking initialized successfully');
    };
    
    document.head.appendChild(script);
  }

  // Load Speed Insights when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSpeedInsights);
  } else {
    loadSpeedInsights();
  }
})();

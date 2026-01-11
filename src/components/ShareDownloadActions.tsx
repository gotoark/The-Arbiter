'use client';

import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { ComparisonResult } from '@/types/comparison';

interface ShareDownloadActionsProps {
  result: ComparisonResult;
  resultsRef: React.RefObject<HTMLDivElement>;
}

export const ShareDownloadActions = ({ result, resultsRef }: ShareDownloadActionsProps) => {
  const downloadAsImage = async () => {
    if (!resultsRef.current) return;

    try {
      // Hide the action buttons temporarily
      const actionButtons = document.querySelector('.share-download-actions') as HTMLElement;
      if (actionButtons) actionButtons.style.display = 'none';

      // Create canvas from the results section
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: '#0a0a0a',
        scale: 2, // Higher quality
        useCORS: true,
        allowTaint: true,
        ignoreElements: (element) => {
          return element.classList.contains('share-download-actions');
        }
      });

      // Show the action buttons again
      if (actionButtons) actionButtons.style.display = 'flex';

      // Create download link
      const link = document.createElement('a');
      link.download = `arbiter-comparison-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('DOWNLOAD FAILED - SYSTEM ERROR');
    }
  };

  const shareOnTwitter = () => {
    const text = `Just compared ${result.optionA.name} vs ${result.optionB.name} using The Arbiter! 🤖\n\nScores: ${result.optionA.score}/10 vs ${result.optionB.score}/10\n\nCheck it out:`;
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = window.location.href;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank');
  };

  const copyToClipboard = async () => {
    const text = `Technology Stack Comparison Results from The Arbiter:

🔵 ALPHA: ${result.optionA.name} - Score: ${result.optionA.score}/10
🔴 BETA: ${result.optionB.name} - Score: ${result.optionB.score}/10

Use Case: ${result.useCase}

Recommendation: ${result.recommendation}

Generated at: ${window.location.href}`;

    try {
      await navigator.clipboard.writeText(text);
      alert('COMPARISON COPIED TO CLIPBOARD - READY FOR SHARING');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('COPY FAILED - MANUAL SELECTION REQUIRED');
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Tech Stack Comparison: ${result.optionA.name} vs ${result.optionB.name}`,
          text: `Check out this technology comparison I made with The Arbiter! ${result.optionA.name} (${result.optionA.score}/10) vs ${result.optionB.name} (${result.optionB.score}/10)`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Native share failed:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="share-download-actions flex flex-wrap justify-center gap-4 mb-8">
      {/* Download Button */}
      <button
        onClick={downloadAsImage}
        className="flex items-center space-x-2 px-4 py-2 cyber-card border-green-400 rounded font-mono text-sm uppercase tracking-wider hover:bg-green-400/10 transition-all"
      >
        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-green-400">[ DOWNLOAD PNG ]</span>
      </button>

      {/* Native Share Button */}
      <button
        onClick={shareNative}
        className="flex items-center space-x-2 px-4 py-2 cyber-card border-blue-400 rounded font-mono text-sm uppercase tracking-wider hover:bg-blue-400/10 transition-all"
      >
        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        <span className="text-blue-400">[ SHARE ]</span>
      </button>

      {/* Twitter Share */}
      <button
        onClick={shareOnTwitter}
        className="flex items-center space-x-2 px-4 py-2 cyber-card border-cyan-400 rounded font-mono text-sm uppercase tracking-wider hover:bg-cyan-400/10 transition-all"
      >
        <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
        <span className="text-cyan-400">[ TWITTER ]</span>
      </button>

      {/* LinkedIn Share */}
      <button
        onClick={shareOnLinkedIn}
        className="flex items-center space-x-2 px-4 py-2 cyber-card border-pink-400 rounded font-mono text-sm uppercase tracking-wider hover:bg-pink-400/10 transition-all"
      >
        <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="text-pink-400">[ LINKEDIN ]</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={copyToClipboard}
        className="flex items-center space-x-2 px-4 py-2 cyber-card border-orange-400 rounded font-mono text-sm uppercase tracking-wider hover:bg-orange-400/10 transition-all"
      >
        <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="text-orange-400">[ COPY TEXT ]</span>
      </button>
    </div>
  );
};
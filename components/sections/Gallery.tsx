"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Image as ImageIcon } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type GalleryItem = {
  id: string;
  title: string;
  category: string;
  aspectClass: string;
};

// Placeholder data structure — easily replaceable with real images via next/image later.
const mockGallery: GalleryItem[] = [
  { id: "1", title: "VOLTpark Dashboard UI", category: "UI Design", aspectClass: "aspect-[16/9]" },
  { id: "2", title: "Jain Temple Exhibition Setup", category: "Photography", aspectClass: "aspect-[3/4]" },
  { id: "3", title: "Employee Payroll System", category: "Software", aspectClass: "aspect-[4/3]" },
  { id: "4", title: "Flex Gym UI", category: "UI Design", aspectClass: "aspect-square" },
  { id: "5", title: "IoT Hardware Prototyping", category: "Hardware", aspectClass: "aspect-[3/4]" },
  { id: "6", title: "System Architecture", category: "Diagram", aspectClass: "aspect-[16/9]" },
];

export function Gallery() {
  const container = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Ref for the lightbox to handle focus trap
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Scroll animations
  useGSAP(
    () => {
      gsap.from(".gallery-item", {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: container }
  );

  // Keyboard navigation & Focus trap for accessibility
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev !== null && prev < mockGallery.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : mockGallery.length - 1));
      }
      
      // Basic focus trap for tab key
      if (e.key === "Tab") {
        const focusableElements = lightboxRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;
        
        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    
    // Prevent scrolling on body when lightbox is open
    document.body.style.overflow = "hidden";
    
    // Focus the lightbox when opened
    setTimeout(() => {
      lightboxRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  return (
    <section id="gallery" ref={container} aria-labelledby="gallery-heading" className="bg-bg py-24 sm:py-32 border-t border-border/40 relative">
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-8">
        <p className="text-label text-accent mb-4 font-semibold uppercase tracking-eyebrow">
          Visuals
        </p>
        <h2 id="gallery-heading" className="text-h2 font-heading text-text-primary mb-12">
          Gallery
        </h2>

        {/* ── Masonry Grid via CSS Columns ── */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {mockGallery.map((item, index) => (
            <div 
              key={item.id} 
              className="gallery-item break-inside-avoid"
            >
              <button
                onClick={() => setSelectedIndex(index)}
                className={`w-full relative group overflow-hidden rounded-xl bg-surface border border-border/50 text-left transition-all duration-300 hover:border-accent/50 ${item.aspectClass}`}
                aria-label={`View ${item.title}`}
              >
                {/* Simulated Image Placeholder */}
                <div className="absolute inset-0 bg-surface-hover flex flex-col items-center justify-center text-text-muted transition-transform duration-500 group-hover:scale-105">
                  <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-medium uppercase tracking-wider opacity-60">Placeholder</span>
                </div>
                

                {/* Enlarge Icon */}
                <div className="absolute top-4 right-4 bg-bg/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm border border-border/50">
                  <Maximize2 className="w-4 h-4 text-text-primary" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Overlay ── */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-bg/95 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedIndex(null)}
          >
            <div 
              ref={lightboxRef}
              tabIndex={-1}
              className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center outline-none"
              onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the overlay
              role="dialog"
              aria-modal="true"
              aria-label={`Viewing ${mockGallery[selectedIndex].title}`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 sm:-top-8 right-0 p-2 text-text-secondary hover:text-text-primary bg-surface/50 sm:bg-transparent rounded-full backdrop-blur-sm transition-colors z-10"
                aria-label="Close gallery"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button (Desktop) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : mockGallery.length - 1));
                }}
                className="absolute left-0 sm:-left-16 top-1/2 -translate-y-1/2 p-3 text-text-secondary hover:text-text-primary hover:scale-110 transition-all z-10 hidden sm:block"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>

              {/* Next Button (Desktop) */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => (prev !== null && prev < mockGallery.length - 1 ? prev + 1 : 0));
                }}
                className="absolute right-0 sm:-right-16 top-1/2 -translate-y-1/2 p-3 text-text-secondary hover:text-text-primary hover:scale-110 transition-all z-10 hidden sm:block"
                aria-label="Next image"
              >
                <ChevronRight className="w-8 h-8" />
              </button>

              {/* Image Container */}
              <motion.div 
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`w-full max-h-[65vh] sm:max-h-[75vh] bg-surface border border-border shadow-2xl rounded-2xl flex flex-col items-center justify-center relative overflow-hidden ${mockGallery[selectedIndex].aspectClass} max-w-4xl mx-auto`}
              >
                <ImageIcon className="w-16 h-16 text-text-muted opacity-30 mb-4" />
                <span className="text-text-secondary font-medium tracking-wide">
                  {mockGallery[selectedIndex].title} (Placeholder)
                </span>
              </motion.div>

              {/* Mobile Navigation Controls */}
              <div className="flex items-center gap-6 mt-6 sm:hidden">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : mockGallery.length - 1));
                  }}
                  className="p-3 bg-surface border border-border rounded-full text-text-secondary shadow-sm active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-text-secondary font-medium text-sm w-12 text-center">
                  {selectedIndex + 1} / {mockGallery.length}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex((prev) => (prev !== null && prev < mockGallery.length - 1 ? prev + 1 : 0));
                  }}
                  className="p-3 bg-surface border border-border rounded-full text-text-secondary shadow-sm active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

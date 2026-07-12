import React from "react";
import { motion } from "framer-motion";

export default function MenuCard({ item }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {item.image_url ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {!item.available && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-semibold text-sm bg-destructive px-3 py-1 rounded-full">
                No disponible
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <span className="text-4xl">🍽️</span>
        </div>
      )}

      <div className="p-5">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {item.name}
          </h3>
          <span className="font-heading text-xl font-bold text-primary whitespace-nowrap">
            ${item.price}
          </span>
        </div>
        {item.description && (
          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
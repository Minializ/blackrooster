import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MenuCard from "./MenuCard";

const CATEGORY_LABELS = {
  snacks: "🍔 Snacks",
  bebidas: "🥤 Bebidas",
  frappes: "🧊 Frappés",
  postres: "🍰 Postres",
  combos: "🎉 Combos",
  otros: "✨ Otros",
};

export default function MenuSection({ items }) {
  const categories = [...new Set(items.map((item) => item.category))];
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto" id="menu">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
          Nuestro Menú
        </h2>
        <p className="text-muted-foreground text-lg">
          Descubre todos nuestros platillos y bebidas
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-primary text-primary-foreground shadow-lg"
              : "bg-card text-muted-foreground hover:bg-secondary border border-border"
          }`}
        >
          🍽️ Todos
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-secondary border border-border"
            }`}
          >
            {CATEGORY_LABELS[cat] || cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No hay productos en esta categoría todavía.
        </p>
      )}
    </section>
  );
}
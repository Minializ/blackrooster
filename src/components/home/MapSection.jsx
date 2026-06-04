import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function MapSection({ info }) {
  return (
    <section className="py-16 px-6 md:px-12 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
            Encuéntranos
          </h2>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5" />
            <p className="text-lg">
              {info?.address || "Progreso 89, General Andrés Figueroa, 45765 Jal., Mexico"}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden shadow-2xl border border-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1835.3265233142588!2d-103.60715425491723!3d20.299741157043528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8425f74fcd71f2c3%3A0x73ece8556505e32d!2sGallo%20Negro!5e0!3m2!1ses!2smx!4v1773456181551!5m2!1ses!2smx"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
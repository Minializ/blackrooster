import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroBanner({ info }) {
  const whatsappLink = info?.whatsapp
    ? `https://wa.me/${info.whatsapp}?text=${encodeURIComponent(info.whatsapp_message || "¡Hola! Me gustaría hacer un pedido 🍗")}`
    : null;

  return (
    <section className="relative overflow-hidden">
      {/* Banner Image */}
      <div className="relative h-[60vh] min-h-[400px] md:h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: info?.banner_url
              ? `url(${info.banner_url})`
              : `url(https://scontent.fgdl1-3.fna.fbcdn.net/v/t39.30808-6/601394090_122148100844956151_3063710166379386803_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeGbGC-1cRzFDV4rDJen1YhXA2WtOmUq9KoDZa06ZSr0qpoLY-b0n2yZl6gugrhP82Tm8ZELGdZtd5W4SDsX9rfO&_nc_ohc=8Qhn7v0DtmQQ7kNvwH3c5JS&_nc_oc=AdmQexl1RHPloihnRatx2vPZIKDcBgbr6Qut5JVkTqmN4jPQzBBOJj_bpKua29S0Z3E&_nc_zt=23&_nc_ht=scontent.fgdl1-3.fna&_nc_gid=lK3uGStyJrFq8XAc-Epo6g&_nc_ss=8&oh=00_Afz--_ly7cT8qAdeSU7RBgZsGKJRvpoL9OTOPK5aXZrx0A&oe=69BA8E1A)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        <div className="relative h-full flex flex-col justify-end p-6 md:p-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {info?.logo_url && (
              <img
                src={info.logo_url}
                alt={info?.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover mb-4 border-2 border-white/20 shadow-xl"
              />
            )}
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3">
              {info?.name || "Gallo Negro"}
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-xl mb-6">
              {info?.description || "Snack bar con el mejor sabor de Jalisco"}
            </p>

            <div className="flex flex-wrap gap-4 text-white/70 text-sm mb-6">
              {info?.address && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {info.address}
                </span>
              )}
              {info?.schedule && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {info.schedule}
                </span>
              )}
              {info?.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4" />
                  {info.phone}
                </span>
              )}
            </div>

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Pedir por WhatsApp
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
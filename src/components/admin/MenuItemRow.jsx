import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";

const CATEGORY_LABELS = {
  snacks: "Snacks",
  bebidas: "Bebidas",
  frappes: "Frappés",
  postres: "Postres",
  combos: "Combos",
  otros: "Otros",
};

export default function MenuItemRow({ item, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-all">
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-16 h-16 rounded-lg object-cover shrink-0"
        />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <span className="text-2xl">🍽️</span>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-foreground truncate">{item.name}</h4>
          {!item.available && (
            <Badge variant="secondary" className="text-xs">No disponible</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-primary font-bold">${item.price}</span>
          <Badge variant="outline" className="text-xs">
            {CATEGORY_LABELS[item.category] || item.category}
          </Badge>
        </div>
      </div>

      <div className="flex gap-2 shrink-0">
        <Button variant="ghost" size="icon" onClick={() => onEdit(item)}>
          <Pencil className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(item)}>
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </div>
  );
}
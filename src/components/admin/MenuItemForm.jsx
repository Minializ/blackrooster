import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { X, Upload, Loader2 } from "lucide-react";

const CATEGORIES = [
  { value: "snacks", label: "🍔 Snacks" },
  { value: "bebidas", label: "🥤 Bebidas" },
  { value: "frappes", label: "🧊 Frappés" },
  { value: "postres", label: "🍰 Postres" },
  { value: "combos", label: "🎉 Combos" },
  { value: "otros", label: "✨ Otros" },
];

export default function MenuItemForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || "",
    category: item?.category || "snacks",
    image_url: item?.image_url || "",
    available: item?.available !== false,
    sort_order: item?.sort_order || 0,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm((prev) => ({ ...prev, image_url: file_url }));
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = { ...form, price: parseFloat(form.price) || 0 };
    if (item?.id) {
      await base44.entities.MenuItem.update(item.id, data);
    } else {
      await base44.entities.MenuItem.create(data);
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-heading text-xl font-bold">
          {item ? "Editar Producto" : "Nuevo Producto"}
        </h3>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Nombre *</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ej: Hamburguesa especial"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Precio (MXN) *</Label>
            <Input
              type="number"
              step="0.5"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="Ej: 45"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Descripción</Label>
          <Textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe el producto..."
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Orden</Label>
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label>Imagen</Label>
          {form.image_url ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border">
              <img src={form.image_url} alt="" className="w-full h-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={() => setForm({ ...form, image_url: "" })}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-sm text-muted-foreground">Subir imagen</span>
                </>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Switch
            checked={form.available}
            onCheckedChange={(v) => setForm({ ...form, available: v })}
          />
          <Label>Disponible</Label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancelar
          </Button>
          <Button type="submit" disabled={saving} className="flex-1">
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            {item ? "Guardar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
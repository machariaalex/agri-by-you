"use client";

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { inputClass } from "./form";
import { formatKES } from "./format";

export type OrderLine = { productId: number | null; description: string; quantity: number; unitPrice: number };
type Product = { id: number; name: string; unit: string; price: number };

const blank: OrderLine = { productId: null, description: "", quantity: 1, unitPrice: 0 };

/** Editable line items; submitted as JSON in the hidden "items" field. */
export function OrderLines({ products, initial }: { products: Product[]; initial: OrderLine[] }) {
  const [lines, setLines] = useState<OrderLine[]>(initial.length ? initial : [blank]);
  const total = lines.reduce((s, l) => s + (l.quantity || 0) * (l.unitPrice || 0), 0);

  const update = (i: number, patch: Partial<OrderLine>) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  function pickProduct(i: number, value: string) {
    const product = products.find((p) => p.id === Number(value));
    if (!product) return update(i, { productId: null });
    update(i, { productId: product.id, description: `${product.name} (${product.unit})`, unitPrice: product.price });
  }

  return (
    <div>
      <input type="hidden" name="items" value={JSON.stringify(lines)} />
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-ink/55">Items</p>
      <div className="space-y-3">
        {lines.map((line, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 rounded-xl bg-cream/60 p-3 sm:bg-transparent sm:p-0">
            <select
              aria-label="Product"
              value={line.productId ?? ""}
              onChange={(e) => pickProduct(i, e.target.value)}
              className={`${inputClass} col-span-12 sm:col-span-3`}
            >
              <option value="">Custom item</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              aria-label="Description"
              placeholder="Description"
              value={line.description}
              onChange={(e) => update(i, { description: e.target.value })}
              className={`${inputClass} col-span-12 sm:col-span-4`}
            />
            <input
              aria-label="Quantity"
              type="number"
              min="0"
              step="0.01"
              value={line.quantity}
              onChange={(e) => update(i, { quantity: Number(e.target.value) })}
              className={`${inputClass} col-span-4 sm:col-span-1`}
            />
            <input
              aria-label="Unit price (KES)"
              type="number"
              min="0"
              step="1"
              value={line.unitPrice}
              onChange={(e) => update(i, { unitPrice: Number(e.target.value) })}
              className={`${inputClass} col-span-4 sm:col-span-2`}
            />
            <div className="col-span-3 flex items-center justify-end text-sm font-bold sm:col-span-1">
              {formatKES(Math.round(line.quantity * line.unitPrice))}
            </div>
            <button
              type="button"
              aria-label="Remove line"
              onClick={() => setLines((ls) => (ls.length > 1 ? ls.filter((_, j) => j !== i) : [blank]))}
              className="col-span-1 flex items-center justify-center text-ink/40 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setLines((ls) => [...ls, blank])}
          className="inline-flex items-center gap-1 text-sm font-bold text-forest hover:text-gold"
        >
          <Plus size={15} /> Add line
        </button>
        <p className="text-sm">
          Total <span className="ml-2 font-display text-2xl text-forest">{formatKES(Math.round(total))}</span>
        </p>
      </div>
    </div>
  );
}

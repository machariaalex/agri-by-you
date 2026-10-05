import {
  boolean,
  date,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

/* ---------- Admin ---------- */

export const adminUsers = pgTable(
  "admin_users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    ...timestamps,
  },
  (t) => [uniqueIndex("admin_users_email_idx").on(t.email)],
);

/* ---------- CRM ---------- */

export const leadStatus = pgEnum("lead_status", ["new", "contacted", "qualified", "won", "lost"]);
export const leadSource = pgEnum("lead_source", [
  "website",
  "phone",
  "whatsapp",
  "referral",
  "event",
  "other",
]);

export const customerType = pgEnum("customer_type", [
  "household",
  "restaurant",
  "retailer",
  "wholesaler",
  "institution",
  "other",
]);

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: customerType("type").notNull().default("household"),
  contactName: text("contact_name"),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  notes: text("notes"),
  ...timestamps,
});

export const leads = pgTable(
  "leads",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone"),
    message: text("message"),
    interest: text("interest"),
    source: leadSource("source").notNull().default("website"),
    status: leadStatus("status").notNull().default("new"),
    followUpOn: date("follow_up_on"),
    customerId: integer("customer_id").references(() => customers.id, { onDelete: "set null" }),
    ...timestamps,
  },
  (t) => [index("leads_status_idx").on(t.status)],
);

export const partnerKind = pgEnum("partner_kind", [
  "supplier",
  "buyer",
  "cooperative",
  "logistics",
  "investor",
  "other",
]);
export const partnerStatus = pgEnum("partner_status", ["prospect", "active", "inactive"]);

export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  kind: partnerKind("kind").notNull().default("supplier"),
  status: partnerStatus("status").notNull().default("active"),
  contactName: text("contact_name"),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  offering: text("offering"),
  notes: text("notes"),
  ...timestamps,
});

export const activityKind = pgEnum("activity_kind", ["note", "call", "whatsapp", "email", "meeting", "visit"]);
export const entityType = pgEnum("entity_type", ["lead", "customer", "partner"]);

/** Interaction log shared by leads, customers and partners. */
export const activities = pgTable(
  "activities",
  {
    id: serial("id").primaryKey(),
    entityType: entityType("entity_type").notNull(),
    entityId: integer("entity_id").notNull(),
    kind: activityKind("kind").notNull().default("note"),
    body: text("body").notNull(),
    authorId: integer("author_id").references(() => adminUsers.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("activities_entity_idx").on(t.entityType, t.entityId)],
);

/* ---------- Sales ---------- */

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  unit: text("unit").notNull().default("kg"),
  /** Price per unit in KES. */
  price: integer("price").notNull().default(0),
  active: boolean("active").notNull().default(true),
  ...timestamps,
});

export const orderStatus = pgEnum("order_status", ["pending", "confirmed", "delivered", "cancelled"]);
export const paymentStatus = pgEnum("payment_status", ["unpaid", "partial", "paid"]);

export const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    customerId: integer("customer_id")
      .notNull()
      .references(() => customers.id, { onDelete: "restrict" }),
    status: orderStatus("status").notNull().default("pending"),
    paymentStatus: paymentStatus("payment_status").notNull().default("unpaid"),
    orderDate: date("order_date").notNull().defaultNow(),
    deliveryDate: date("delivery_date"),
    /** Order total in KES, recalculated from items on save. */
    total: integer("total").notNull().default(0),
    amountPaid: integer("amount_paid").notNull().default(0),
    notes: text("notes"),
    ...timestamps,
  },
  (t) => [index("orders_customer_idx").on(t.customerId), index("orders_date_idx").on(t.orderDate)],
);

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id").references(() => products.id, { onDelete: "set null" }),
  description: text("description").notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2, mode: "number" }).notNull(),
  unitPrice: integer("unit_price").notNull(),
});

/* ---------- Website content ---------- */

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt"),
    coverImage: text("cover_image").notNull(),
    /** Plain text; blank lines separate paragraphs, lines starting with "## " become headings. */
    body: text("body").notNull().default(""),
    published: boolean("published").notNull().default(false),
    publishedOn: date("published_on").notNull().defaultNow(),
    ...timestamps,
  },
  (t) => [uniqueIndex("posts_slug_idx").on(t.slug)],
);

const contentBlock = {
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  ...timestamps,
};

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: text("quote").notNull(),
  name: text("name").notNull(),
  role: text("role").notNull().default("Customer"),
  photo: text("photo").notNull(),
  ...contentBlock,
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  tag: text("tag").notNull(),
  image: text("image").notNull(),
  ...contentBlock,
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("Sprout"),
  image: text("image").notNull(),
  ...contentBlock,
});

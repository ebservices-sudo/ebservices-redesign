// Sample businesses for the /assistant chatbot demo.
// Everything here is made-up demo data (names, prices, hours) — it is NOT information about EB Services or any real business.

export type DemoBusinessId = "dental" | "restaurant" | "salon" | "shop";

/** Opening hours per weekday (0 = Sunday). null = closed. Times are "HH:MM". */
export type Hours = Record<number, [string, string] | null>;

export type DemoBusiness = {
  id: DemoBusinessId;
  label: string;
  name: string;
  kind: string;
  hours: Hours;
  hoursText: string;
  location: string;
  offer: string;
  booking: string;
};

export const DEMO_BUSINESSES: DemoBusiness[] = [
  {
    id: "dental",
    label: "Dental clinic",
    name: "Demo Dental Clinic",
    kind: "a dental clinic",
    hours: { 0: null, 1: ["08:00", "17:00"], 2: ["08:00", "17:00"], 3: ["08:00", "17:00"], 4: ["08:00", "17:00"], 5: ["08:00", "17:00"], 6: ["08:00", "13:00"] },
    hoursText: "Monday–Friday 08:00–17:00, Saturday 08:00–13:00, Sunday closed",
    location: "Prishtina (demo location — there is no real address)",
    offer: `SERVICES (prices approximate, exact price after examination):
- Check-up & consultation: €20–40
- Professional teeth cleaning: €30–50
- Teeth whitening: €150–250
- Filling: €40–80
- Root canal treatment: €100–200
- Tooth extraction: €40–100
- Dental implant: €500–900
- Braces / orthodontics: €800–2000
- Veneers / crowns: €150–400 per tooth
- Children's dentistry: €20–40
- Emergency visit: €50–100`,
    booking: `APPOINTMENTS:
- Bookable times: every hour, 08:00–16:00 on weekdays and 08:00–12:00 on Saturday.
- To book, collect: name, phone number, service or problem, date and time.
- Severe pain, swelling, a broken tooth or bleeding → treat as urgent and suggest the earliest slot.`,
  },
  {
    id: "restaurant",
    label: "Restaurant",
    name: "Demo Restaurant",
    kind: "a restaurant (Italian and grill)",
    hours: { 0: ["10:00", "23:00"], 1: ["08:00", "23:00"], 2: ["08:00", "23:00"], 3: ["08:00", "23:00"], 4: ["08:00", "23:00"], 5: ["08:00", "23:00"], 6: ["08:00", "23:00"] },
    hoursText: "Monday–Saturday 08:00–23:00, Sunday 10:00–23:00",
    location: "Prishtina city centre (demo location — there is no real address)",
    offer: `MENU (prices approximate):
- Pizza: €5–8
- Pasta: €6–9
- Grill plates: €8–14
- Salads: €4–6
- Desserts: €2–4
- Coffee & tea: €1–2
Vegetarian options available. Takeaway available. No delivery.`,
    booking: `TABLE BOOKINGS:
- Tables for 1–10 people. Larger groups / events → hand off to a person.
- Bookable times: every 30 minutes from 12:00 to 21:30 (Sunday from 12:00).
- To book, collect: date, time, number of people and a name.`,
  },
  {
    id: "salon",
    label: "Salon",
    name: "Demo Salon",
    kind: "a hair & beauty salon",
    hours: { 0: null, 1: ["09:00", "19:00"], 2: ["09:00", "19:00"], 3: ["09:00", "19:00"], 4: ["09:00", "19:00"], 5: ["09:00", "19:00"], 6: ["09:00", "17:00"] },
    hoursText: "Monday–Friday 09:00–19:00, Saturday 09:00–17:00, Sunday closed",
    location: "Prishtina, near the city centre (demo location — there is no real address)",
    offer: `SERVICES (prices approximate):
- Women's haircut & styling: €10–20
- Men's haircut: €5–8
- Hair colouring: €25–50
- Manicure: €10–15
- Pedicure: €15–20
- Make-up: €20–35`,
    booking: `APPOINTMENTS:
- Bookable times: every 30 minutes from opening until 1 hour before closing.
- To book, collect: service, date, time and a name.`,
  },
  {
    id: "shop",
    label: "Shop",
    name: "Demo Shop",
    kind: "a clothing and shoe shop",
    hours: { 0: ["10:00", "18:00"], 1: ["09:00", "21:00"], 2: ["09:00", "21:00"], 3: ["09:00", "21:00"], 4: ["09:00", "21:00"], 5: ["09:00", "21:00"], 6: ["09:00", "21:00"] },
    hoursText: "Monday–Saturday 09:00–21:00, Sunday 10:00–18:00",
    location: "Prishtina, in the city centre (demo location — there is no real address)",
    offer: `PRODUCTS (prices approximate):
- T-shirts: €10–20
- Jeans: €25–45
- Jackets: €40–90
- Sneakers: €40–100
Sizes XS–XXL, shoes 36–46. Returns within 14 days with receipt.
Delivery across Kosovo in 2–3 working days.`,
    booking: `RESERVATIONS:
- Customers can reserve items to pick up in store (kept for 48 hours), or book a time to come in.
- To reserve, collect: item, size, pick-up day and a name.
- Stock questions about a specific item → say you'll check with the team (hand off to a person).`,
  },
];

export function getDemoBusiness(id: DemoBusinessId) {
  return DEMO_BUSINESSES.find((b) => b.id === id) ?? DEMO_BUSINESSES[0];
}

export const DEMO_SUGGESTIONS = [
  "What are your opening hours?",
  "How much does it cost?",
  "Can I book for Saturday?",
  "Where are you located?",
];

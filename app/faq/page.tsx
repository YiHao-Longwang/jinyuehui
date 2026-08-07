import { FloatingWhatsApp, Footer, Header, JsonLd, SectionHead } from "../site-common";
import { faqJsonLd, pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "One Spa FAQ | 吉隆坡SPA按摩预约问题 · 南海龙宫",
  description:
    "FAQ for One Spa 南海龙宫 Kuala Lumpur: KL spa package pricing, massage booking, 12-hour stay, kids tickets, rescheduling and payment after treatment.",
  path: "/faq/",
  keywords: ["吉隆坡SPA FAQ", "吉隆坡按摩预约", "南海龙宫预约", "KL spa FAQ"],
});

const faqs: [string, string][] = [
  [
    "Where is One Spa in Kuala Lumpur?",
    "One Spa 南海龙宫 is at Lot No. 2-53 & 2-56, Level 2, Viva Home Mall, 85 Jalan Loke Yew, Taman Miharja, 55200 Kuala Lumpur - on the Cheras side of KL, take the lift to Level 2.",
  ],
  [
    "What are your opening hours?",
    "One Spa is a 24 hour spa in KL - open every day, all day, including weekends and public holidays.",
  ],
  [
    "Is there parking at Viva Home Mall?",
    "Yes - park at Viva Home Mall and come up to Level 2. Grab and taxi drop-off is at the main mall entrance.",
  ],
  [
    "What is included in the 12-hour pass?",
    "12 hours from check-in with the hot spring pools, steam room, sauna, rest lounges and dining areas all included; towels and basic bathing wear are provided.",
  ],
  [
    "How do I book a KL spa or massage session?",
    "Pick your package and date online and pay, or message the team on WhatsApp at +60 14-315 5632 - book at least 1 hour ahead, then show your order at the front desk.",
  ],
  ["Can I really stay 12 hours?", "Yes - 12 hours from check-in, all facilities included."],
  ["Is Sunday a weekday or weekend rate?", "Weekday rate. Sun-Thu are all weekday; Fri, Sat and public holidays are the other tier."],
  ["How are public holidays priced?", "Weekend rate. The price shows right on the calendar when you pick a date - no maths needed."],
  ["How does Buy 1 Free 1 work?", "One order, 2 adults, entering together on the same day and time - it cannot be split into two visits."],
  ["Best value for one person?", "The Solo 12-Hour Pass - book online and get a free 30-min massage."],
  ["How do 3 or 5 people buy?", "Pairs take Buy 1 Free 1; the extra person takes a Solo Pass."],
  ["Do packages include a massage?", "The Solo Pass includes a free 30-minute massage when booked online, and daytime packages include selected treatments."],
  ["Free entry when I spend RM499?", "Spend RM499 in one bill and entry is free - just book the treatments, no ticket needed."],
  ["Can kids come?", "Yes. Kids Ticket is for age 12 and under with an adult; age 2 and under register free at the front desk."],
  ["Couples - can we be together?", "Common areas are shared. Bath areas are separated by gender; there is no mixed bathing area."],
  ["Do I need a swimsuit? What's provided?", "Bathing is primarily unclothed, and you may bring swimwear. Towels and basic bathing wear are provided."],
  ["Can I stay overnight?", "Resting overnight within your 12-hour stay is fine, but this is a spa, not a hotel."],
  ["Is the food halal?", "No - the food is non-halal and not halal-certified."],
  ["Can I bring a cake or outside food?", "Cakes are welcome. Outside food is fine; alcohol is not allowed."],
  ["Any birthday deal?", "Within 2 days either side of your birthday, ask the team about the birthday pass."],
  ["How far ahead must I book?", "All packages: book at least 1 hour ahead."],
  ["Can I reschedule?", "Yes - free up to 1 day before your visit via WhatsApp."],
  ["How do refunds work?", "Message the team, they verify your order, and refunds are handled to the original payment method."],
  ["What do I bring on arrival?", "Just your phone - show the order to the front desk."],
  ["Walk-in vs booking online - any difference?", "Online booking has selected perks and weekends get busy, so booking ahead is recommended."],
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Header active="FAQ" />
      <main>
        <section id="faq">
          <SectionHead
            eyebrow="Before You Book"
            title="FAQ · One Spa"
            sub="Prices, booking, changes, arrival - all here. Still stuck? Tap WhatsApp for a real person."
          />
          <div className="container">
            <div className="faqwrap">
              <div className="faq">
                {faqs.map(([question, answer], index) => (
                  <details open={index === 0} key={question}>
                    <summary>
                      {question}
                      <span className="plus" />
                    </summary>
                    <div className="a">{answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

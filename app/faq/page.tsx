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
    "One Spa 南海龙宫 is at Lot No. 2-69 & 2-70, Level 2, Viva Home Mall, 85 Jalan Loke Yew, Taman Miharja, 52200 Kuala Lumpur - on the Cheras side of KL, take the lift to Level 2.",
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
  ["Can I really stay 12 hours?", "You can. The clock starts at check-in and runs 12 hours, and everything on site is yours for all of it."],
  ["Is Sunday a weekday or weekend rate?", "Sunday counts as a weekday with us. Sunday to Thursday sit on the lower tier; Friday, Saturday and public holidays sit on the higher one."],
  ["How are public holidays priced?", "At the weekend tier. You will not need to work anything out - choose your date and the calendar shows that day's price."],
  ["How does Buy 1 Free 1 work?", "It is one order covering two adults who come in together, same day, same time. It cannot be split across two separate visits."],
  ["Best value for one person?", "The Solo 12-Hour Pass. Book it online and a 30-minute massage comes with it."],
  ["How do 3 or 5 people buy?", "Pair people up on Buy 1 Free 1, and whoever is left over books a Solo Pass."],
  ["Do packages include a massage?", "Booked online, the Solo Pass comes with 30 minutes of massage. The daytime packages have selected treatments built in as well."],
  ["Free entry when I spend RM499?", "That is right - once a single bill reaches RM499, entry is on us. Book the treatments and skip the ticket."],
  ["Can kids come?", "They can. Children 12 and under need a Kids Ticket and an adult with them; under-2s are registered free at the front desk."],
  ["Couples - can we be together?", "Everywhere except the baths, yes. The bathing areas are split by gender and there is no mixed section."],
  ["Do I need a swimsuit? What's provided?", "Bathing here is mostly done unclothed, though you are welcome to bring swimwear. We hand out towels and basic bathing wear."],
  ["Can I stay overnight?", "Sleeping through the night inside your 12 hours is fine. Just bear in mind this is a spa, not a hotel."],
  ["Is the food halal?", "No. Our food is non-halal and carries no halal certification."],
  ["Can I bring a cake or outside food?", "Bring the cake in, that is no problem, and outside food is fine too. Alcohol is the one thing we cannot allow."],
  ["Any birthday deal?", "There is - ask the team about the birthday pass any time within two days either side of the date."],
  ["How far ahead must I book?", "An hour ahead is the minimum, and that applies to every package."],
  ["Can I reschedule?", "Yes, and it costs nothing. Message us on WhatsApp any time up to the day before."],
  ["How do refunds work?", "Message the team and they will check your order. Anything refunded goes back the way it was paid."],
  ["What do I bring on arrival?", "Your phone is enough. Show the order at the front desk and you are in."],
  ["Walk-in vs booking online - any difference?", "Some perks only attach to online orders, and weekends fill up, so booking ahead is the safer bet."],
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

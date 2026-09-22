/**
 * BLUE BELL CAFÉ — ARTISANAL MENU CONTROLLER (menu/menu.js)
 * Manages category tabs, tasting tray store, steppers, and cart persistence.
 */
'use strict';

const MENU_HTML_TEMPLATE = "<section id=\"cafe-menu\" class=\"cafe-menu-section\">\n    <div class=\"menu-container\">\n\n      <!-- Section Header -->\n      <header class=\"menu-header\">\n        <div class=\"menu-eyebrow\">\n          <span>Curated Seasonal Sips &amp; Sweet Treats \u2022 Gulshan Roastery</span>\n        </div>\n        <h2 class=\"menu-title\">The Artisanal Menu</h2>\n\n        <!-- Category Filter Tabs -->\n        <nav class=\"menu-filter-nav\" aria-label=\"Menu categories\">\n          <button type=\"button\" class=\"menu-filter-btn is-active\" data-category=\"all\">\n            <span class=\"tab-icon\">\u2615</span>\n            <span>All Creations</span>\n            <span class=\"tab-count\">17</span>\n          </button>\n          <button type=\"button\" class=\"menu-filter-btn\" data-category=\"pour-over\">\n            <span class=\"tab-icon\">\ud83e\uded7</span>\n            <span>Signature Pour-Overs</span>\n            <span class=\"tab-count\">3</span>\n          </button>\n          <button type=\"button\" class=\"menu-filter-btn\" data-category=\"espresso\">\n            <span class=\"tab-icon\">\u2615</span>\n            <span>Espresso &amp; Milk Craft</span>\n            <span class=\"tab-count\">3</span>\n          </button>\n          <button type=\"button\" class=\"menu-filter-btn\" data-category=\"cold-brew\">\n            <span class=\"tab-icon\">\ud83e\uddca</span>\n            <span>Cold Drip &amp; Elixirs</span>\n            <span class=\"tab-count\">3</span>\n          </button>\n          <button type=\"button\" class=\"menu-filter-btn\" data-category=\"bistro\">\n            <span class=\"tab-icon\">\ud83c\udf73</span>\n            <span>Bistro &amp; Kitchen</span>\n            <span class=\"tab-count\">4</span>\n          </button>\n          <button type=\"button\" class=\"menu-filter-btn\" data-category=\"bakery\">\n            <span class=\"tab-icon\">\ud83c\udf70</span>\n            <span>Bakery &amp; Desserts</span>\n            <span class=\"tab-count\">4</span>\n          </button>\n        </nav>\n      </header>\n\n      <!-- Spotlight Feature Card: Roaster's Tasting Flight -->\n      <div class=\"menu-spotlight-card\">\n        <div class=\"spotlight-media\">\n          <img src=\"assets/menu/flight_for_two.webp\" decoding=\"async\" alt=\"The Sanctuary Tasting Flight for Two\" class=\"spotlight-img\"\n            loading=\"lazy\">\n          <span class=\"spotlight-media-tag\">Signature Flight</span>\n        </div>\n        <div class=\"spotlight-content\">\n          <div class=\"spotlight-badge\">\n            <span class=\"badge-dot\"></span>\n            <span>Barista's Signature Experience</span>\n          </div>\n          <h3 class=\"spotlight-title\">The Sanctuary Tasting Flight for Two</h3>\n          <p class=\"spotlight-desc\">\n            An intimate sensorial journey featuring our award-winning Ethiopian Yirgacheffe V60 pour-over alongside a\n            velvety Saffron Honey Cortado, paired with freshly baked Pistachio Flaky Brioche.\n          </p>\n          <div class=\"spotlight-tags\">\n            <span class=\"spotlight-tag\">Dual Origin Flight</span>\n            <span class=\"spotlight-tag\">Fresh Table-Side Pour</span>\n            <span class=\"spotlight-tag\">Warm Pastries</span>\n          </div>\n        </div>\n        <div class=\"spotlight-action\">\n          <div class=\"spotlight-price\">\n            <span class=\"currency\">\u09f3</span>\n            <span class=\"amount\">950</span>\n            <span class=\"price-unit\">/ flight</span>\n          </div>\n          <div class=\"card-tray-control spotlight-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn spotlight-btn\" data-id=\"flight-01\"\n              data-name=\"Sanctuary Tasting Flight for Two\" data-price=\"950\" data-cat=\"pour-over\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Menu Grid: 17 Artisanal Items Across 5 Categories -->\n      <div class=\"menu-grid\" id=\"menu-grid\">\n\n        <!-- ITEM 1: Ethiopian Yirgacheffe G1 -->\n        <article class=\"menu-card\" data-category=\"pour-over\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">Signature V60</span>\n              <span class=\"card-badge badge-light\">Guji Micro-Lot</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">480</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/yirgacheffe_v60.webp\" decoding=\"async\" alt=\"Ethiopian Yirgacheffe G1\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Ethiopian Yirgacheffe G1</h4>\n          <p class=\"card-terroir\">Guji Highlands, 2,100m \u2022 Fully Washed \u2022 Medium-Light</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Wild Jasmine</span>\n            <span class=\"note-pill\">Bergamot Honey</span>\n            <span class=\"note-pill\">Peach Blossom</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2615</span>\n            <span>Pairs with: <strong>Lemon Thyme Madeleines</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"po-01\" data-name=\"Ethiopian Yirgacheffe G1\"\n              data-price=\"480\" data-cat=\"pour-over\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 2: Panama Geisha Boquete Estate -->\n        <article class=\"menu-card\" data-category=\"pour-over\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-reserve\">Rare Geisha</span>\n              <span class=\"card-badge badge-light\">Sun-Kissed Natural</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">720</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/panama_geisha.webp\" decoding=\"async\" alt=\"Panama Geisha Boquete\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Panama Geisha Boquete</h4>\n          <p class=\"card-terroir\">Chiriqu\u00ed Province, 1,750m \u2022 Anaerobic Natural \u2022 Light</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Orange Blossom</span>\n            <span class=\"note-pill\">Papaya</span>\n            <span class=\"note-pill\">White Tea</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2615</span>\n            <span>Pairs with: <strong>Pistachio Flaky Brioche</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"po-02\" data-name=\"Panama Geisha Boquete\"\n              data-price=\"720\" data-cat=\"pour-over\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 3: Colombian Huila Pink Bourbon -->\n        <article class=\"menu-card\" data-category=\"pour-over\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">Barista's Reserve</span>\n              <span class=\"card-badge badge-light\">Honey Process</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">520</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/pink_bourbon.webp\" decoding=\"async\" alt=\"Colombian Pink Bourbon\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Colombian Pink Bourbon</h4>\n          <p class=\"card-terroir\">San Agust\u00edn, Huila 1,850m \u2022 Anaerobic Honey \u2022 Medium</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Red Currant</span>\n            <span class=\"note-pill\">Guava</span>\n            <span class=\"note-pill\">Golden Caramel</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2615</span>\n            <span>Pairs with: <strong>Dark Chocolate Cardamom Tart</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"po-03\" data-name=\"Colombian Pink Bourbon\"\n              data-price=\"520\" data-cat=\"pour-over\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 4: Blue Bell Saffron Honey Latte -->\n        <article class=\"menu-card\" data-category=\"espresso\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">House Specialty</span>\n              <span class=\"card-badge badge-light\">\u2601\ufe0f Velvet Microfoam</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">460</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/saffron_latte.webp\" decoding=\"async\" alt=\"Blue Bell Saffron Latte\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Blue Bell Saffron Latte</h4>\n          <p class=\"card-terroir\">Double Ristretto, Kashmiri Saffron Infusion &amp; Sundarbans Honey</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Golden Saffron</span>\n            <span class=\"note-pill\">Warm Floral Honey</span>\n            <span class=\"note-pill\">Velvet Cream</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Pistachio Flaky Brioche</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"esp-01\" data-name=\"Blue Bell Saffron Latte\"\n              data-price=\"460\" data-cat=\"espresso\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 5: Cinnamon Spiced Flat White -->\n        <article class=\"menu-card\" data-category=\"espresso\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">\u2615 Warm Spice</span>\n              <span class=\"card-badge badge-light\">Double Ristretto</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">420</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/cinnamon_flatwhite.webp\" decoding=\"async\" alt=\"Cinnamon Spiced Flat White\" class=\"card-img\"\n              loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Cinnamon Spiced Flat White</h4>\n          <p class=\"card-terroir\">Brazil Cerrado Blend \u2022 Freshly Grated Ceylon Bark &amp; Silky Foam</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Ceylon Cinnamon</span>\n            <span class=\"note-pill\">Roasted Almond</span>\n            <span class=\"note-pill\">Milk Chocolate</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Burnt Basque Honey Cheesecake</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"esp-02\" data-name=\"Cinnamon Spiced Flat White\"\n              data-price=\"420\" data-cat=\"espresso\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 6: Smoked Maple Cortado -->\n        <article class=\"menu-card\" data-category=\"espresso\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">Velvet Cortado</span>\n              <span class=\"card-badge badge-light\">Smoked Maple</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">440</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/maple_cortado.webp\" decoding=\"async\" alt=\"Smoked Maple Cortado\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Smoked Maple Cortado</h4>\n          <p class=\"card-terroir\">Colombia Supremo Espresso, Grade-A Birch Smoked Maple Syrup</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Smoked Maple</span>\n            <span class=\"note-pill\">Dark Hazelnut</span>\n            <span class=\"note-pill\">Cacao Nib</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Dark Chocolate Cardamom Tart</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"esp-03\" data-name=\"Smoked Maple Cortado\"\n              data-price=\"440\" data-cat=\"espresso\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 7: 18-Hour Kyoto Slow Cold Drip -->\n        <article class=\"menu-card\" data-category=\"cold-brew\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-reserve\">\u2726 18h Slow Drip</span>\n              <span class=\"card-badge badge-light\">Kyoto Glass Tower</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">480</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/kyoto_cold_drip.webp\" decoding=\"async\" alt=\"18-Hour Kyoto Cold Drip\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">18-Hour Kyoto Cold Drip</h4>\n          <p class=\"card-terroir\">Sumatra Mandheling Micro-lot \u2022 Tower Ice Extraction over 18 Hours</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Ripe Dark Plum</span>\n            <span class=\"note-pill\">Bourbon Cask</span>\n            <span class=\"note-pill\">Molasses Finish</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Burnt Basque Honey Cheesecake</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"cb-01\" data-name=\"18-Hour Kyoto Cold Drip\"\n              data-price=\"480\" data-cat=\"cold-brew\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 8: Cascara & Orange Blossom Tonic -->\n        <article class=\"menu-card\" data-category=\"cold-brew\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-signature\">\ud83c\udf38 Botanical Spritz</span>\n              <span class=\"card-badge badge-light\">Refreshing</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">440</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/cascara_tonic.webp\" decoding=\"async\" alt=\"Cascara &amp; Orange Tonic\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Cascara &amp; Orange Tonic</h4>\n          <p class=\"card-terroir\">Sun-Dried Geisha Coffee Cherry Tea with Mandarin Tonic &amp; Rosemary</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Wild Rosehip</span>\n            <span class=\"note-pill\">Mandarin Zest</span>\n            <span class=\"note-pill\">Sparkling Fizz</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Pistachio Flaky Brioche</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"cb-02\" data-name=\"Cascara &amp; Orange Tonic\"\n              data-price=\"440\" data-cat=\"cold-brew\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 9: Nitro Velvet Espresso Float -->\n        <article class=\"menu-card\" data-category=\"cold-brew\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-reserve\">\u2601\ufe0f Nitro Velvet</span>\n              <span class=\"card-badge badge-light\">Tahitian Gelato</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">550</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/nitro_float.webp\" decoding=\"async\" alt=\"Nitro Velvet Float\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Nitro Velvet Float</h4>\n          <p class=\"card-terroir\">Micro-bubbled Nitrogen Cold Brew with Madagascar Bean Gelato</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Guinness Crema</span>\n            <span class=\"note-pill\">Tahitian Vanilla</span>\n            <span class=\"note-pill\">Espresso Swirl</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Body</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Acidity</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Dark Chocolate Cardamom Tart</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"cb-03\" data-name=\"Nitro Velvet Float\"\n              data-price=\"550\" data-cat=\"cold-brew\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 10: Pistachio Flaky Brioche -->\n        <article class=\"menu-card\" data-category=\"bakery\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bakery\">\ud83e\udd50 Freshly Baked</span>\n              <span class=\"card-badge badge-light\">Normandy Butter</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">380</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/pistachio_brioche.webp\" decoding=\"async\" alt=\"Pistachio Flaky Brioche\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Pistachio Flaky Brioche</h4>\n          <p class=\"card-terroir\">72-Hour Laminated Brioche with Roasted Bronte Pistachio Cream</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Flavor Profile:</span>\n            <span class=\"note-pill\">Caramelized Crust</span>\n            <span class=\"note-pill\">Toasted Pistachio</span>\n            <span class=\"note-pill\">Sea Salt Flake</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Flakiness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Ethiopian Yirgacheffe G1</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bak-01\" data-name=\"Pistachio Flaky Brioche\"\n              data-price=\"380\" data-cat=\"bakery\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 11: Dark Chocolate Cardamom Tart -->\n        <article class=\"menu-card\" data-category=\"bakery\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bakery\">\ud83c\udf6b 70% Valrhona</span>\n              <span class=\"card-badge badge-light\">Gold Leaf</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">420</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/chocolate_tart.webp\" decoding=\"async\" alt=\"Dark Chocolate Cardamom Tart\" class=\"card-img\"\n              loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Dark Chocolate Cardamom Tart</h4>\n          <p class=\"card-terroir\">Single-Origin Cocoa Ganache, Spiced Green Cardamom &amp; Sable Shell</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Flavor Profile:</span>\n            <span class=\"note-pill\">Bittersweet Cacao</span>\n            <span class=\"note-pill\">Aromatic Cardamom</span>\n            <span class=\"note-pill\">Buttery Crust</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Flakiness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Smoked Maple Cortado</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bak-02\" data-name=\"Dark Chocolate Cardamom Tart\"\n              data-price=\"420\" data-cat=\"bakery\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 12: Burnt Basque Honey Cheesecake -->\n        <article class=\"menu-card\" data-category=\"bakery\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bakery\">\ud83c\udf6f Basque Honey Heart</span>\n              <span class=\"card-badge badge-light\">Molten Center</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">460</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/basque_cheesecake.webp\" decoding=\"async\" alt=\"Burnt Basque Cheesecake\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Burnt Basque Cheesecake</h4>\n          <p class=\"card-terroir\">Charred Caramelized Crust with a Silky Molten Core &amp; Wild Honey Drizzle</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Flavor Profile:</span>\n            <span class=\"note-pill\">Caramelized Sugar</span>\n            <span class=\"note-pill\">Silky Cream</span>\n            <span class=\"note-pill\">Raw Honeycomb</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Flakiness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot\"></span><span\n                  class=\"dot\"></span><span class=\"dot\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>18-Hour Kyoto Cold Drip</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bak-03\" data-name=\"Burnt Basque Cheesecake\"\n              data-price=\"460\" data-cat=\"bakery\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 13: The Roastery American Breakfast -->\n        <article class=\"menu-card\" data-category=\"bistro\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bistro\">\ud83c\udf73 Roastery Brunch</span>\n              <span class=\"card-badge badge-light\">All-Day Classic</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">750</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/american_breakfast.webp\" decoding=\"async\" alt=\"The Roastery American Breakfast\" class=\"card-img\"\n              loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">The Roastery American Breakfast</h4>\n          <p class=\"card-terroir\">Two Farm Eggs Sunny-Side Up, Crispy Bacon, Herbed Chicken Sausages, Hash Browns &amp;\n            Buttered Sourdough</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Golden Yolk</span>\n            <span class=\"note-pill\">Crispy Bacon</span>\n            <span class=\"note-pill\">Herbed Sausage</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Heartiness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Savory</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Warmth</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Blue Bell Saffron Latte</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bis-01\" data-name=\"American Breakfast\"\n              data-price=\"750\" data-cat=\"bistro\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 14: Tuscan Slow-Baked Lasagna -->\n        <article class=\"menu-card\" data-category=\"bistro\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bistro\">\ud83c\udf5d Chef's Table</span>\n              <span class=\"card-badge badge-light\">Slow-Baked</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">780</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/lasagna.webp\" decoding=\"async\" alt=\"Tuscan Slow-Baked Lasagna\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Tuscan Slow-Baked Lasagna</h4>\n          <p class=\"card-terroir\">Layered Fresh Egg Pasta, 8-Hour Braised Beef Bolognese Rag\u00f9, Velvety B\u00e9chamel &amp;\n            Aged Parmigiano</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">San Marzano Tomato</span>\n            <span class=\"note-pill\">Melted Mozzarella</span>\n            <span class=\"note-pill\">Slow Rag\u00f9</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Savory</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Warmth</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>18-Hour Kyoto Cold Drip</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bis-02\" data-name=\"Tuscan Lasagna\" data-price=\"780\"\n              data-cat=\"bistro\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 15: Truffle Fettuccine Alfredo -->\n        <article class=\"menu-card\" data-category=\"bistro\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bistro\">\ud83e\uddc0 Artisan Pasta</span>\n              <span class=\"card-badge badge-light\">Black Truffle</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">690</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/fettuccine_alfredo.webp\" decoding=\"async\" alt=\"Truffle Fettuccine Alfredo\" class=\"card-img\"\n              loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Truffle Fettuccine Alfredo</h4>\n          <p class=\"card-terroir\">Bronze-Cut Fettuccine Ribbon Pasta, Normandy Cultured Butter, 24-Month Parmigiano\n            &amp; Black Truffle Cream</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Aged Parmigiano</span>\n            <span class=\"note-pill\">Black Truffle</span>\n            <span class=\"note-pill\">Cracked Peppercorn</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Savory</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Creaminess</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Cascara &amp; Orange Tonic</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bis-03\" data-name=\"Fettuccine Alfredo\"\n              data-price=\"690\" data-cat=\"bistro\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 16: Artisan Caf\u00e9 Club Sandwich -->\n        <article class=\"menu-card\" data-category=\"bistro\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bistro\">\ud83e\udd6a Toasted Brioche</span>\n              <span class=\"card-badge badge-light\">Triple-Decker</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">580</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/club_sandwich.webp\" decoding=\"async\" alt=\"Artisan Caf\u00e9 Club Sandwich\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Artisan Caf\u00e9 Club Sandwich</h4>\n          <p class=\"card-terroir\">Triple-Decker Brioche Toast, Smoked Chicken Breast, Crisp Turkey Bacon, Hass Avocado\n            &amp; Sun-Dried Herb Mayo</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Tasting Notes:</span>\n            <span class=\"note-pill\">Smoked Chicken</span>\n            <span class=\"note-pill\">Brioche Crunch</span>\n            <span class=\"note-pill\">Avocado Cream</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Savory</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Crispness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Freshness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Ethiopian Yirgacheffe G1</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bis-04\" data-name=\"Caf\u00e9 Club Sandwich\"\n              data-price=\"580\" data-cat=\"bistro\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n        <!-- ITEM 17: Venetian Espresso Tiramisu -->\n        <article class=\"menu-card\" data-category=\"bakery\">\n          <div class=\"card-top\">\n            <div class=\"card-badges\">\n              <span class=\"card-badge badge-bakery\">\u2615 Espresso Soaked</span>\n              <span class=\"card-badge badge-light\">Sabayon Cream</span>\n            </div>\n            <div class=\"card-price\">\n              <span class=\"currency\">\u09f3</span><span class=\"amount\">480</span>\n            </div>\n          </div>\n          <div class=\"card-img-wrap\">\n            <img src=\"assets/menu/tiramisu.webp\" decoding=\"async\" alt=\"Venetian Espresso Tiramisu\" class=\"card-img\" loading=\"lazy\">\n          </div>\n          <h4 class=\"card-title\">Venetian Espresso Tiramisu</h4>\n          <p class=\"card-terroir\">House-Baked Savoiardi Ladyfingers, Single-Origin Espresso Soak, Mascarpone Sabayon\n            &amp; Cocoa Dusting</p>\n          <p class=\"card-notes\">\n            <span class=\"note-label\">Flavor Profile:</span>\n            <span class=\"note-pill\">Mascarpone Cream</span>\n            <span class=\"note-pill\">Espresso Soak</span>\n            <span class=\"note-pill\">Dutch Cocoa</span>\n          </p>\n          <div class=\"card-metrics\">\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Richness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Creaminess</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot filled\"></span></div>\n            </div>\n            <div class=\"metric-item\">\n              <span class=\"metric-name\">Sweetness</span>\n              <div class=\"metric-dots\"><span class=\"dot filled\"></span><span class=\"dot filled\"></span><span\n                  class=\"dot filled\"></span><span class=\"dot\"></span></div>\n            </div>\n          </div>\n          <div class=\"card-pairing\">\n            <span class=\"pairing-icon\">\u2726</span>\n            <span>Pairs with: <strong>Cinnamon Spiced Flat White</strong></span>\n          </div>\n          <div class=\"card-tray-control\">\n            <button type=\"button\" class=\"add-to-tray-btn\" data-id=\"bak-04\" data-name=\"Venetian Tiramisu\"\n              data-price=\"480\" data-cat=\"bakery\">\n              <span>Add to Tasting Tray</span>\n            </button>\n            <div class=\"tray-qty-stepper\" role=\"group\" aria-label=\"Quantity selector\">\n              <button type=\"button\" class=\"qty-step-btn qty-minus\" aria-label=\"Decrease quantity\"\n                title=\"Decrease\">\u2212</button>\n              <div class=\"qty-step-display\">\n                <span class=\"qty-step-value\">1</span>\n                <span class=\"qty-step-label\">qty</span>\n              </div>\n              <button type=\"button\" class=\"qty-step-btn qty-plus\" aria-label=\"Increase quantity\"\n                title=\"Increase\">+</button>\n            </div>\n          </div>\n        </article>\n\n      </div>\n\n    </div>\n  </section>\n\n  <!-- Interactive Floating Tasting Tray Bar -->\n  <aside id=\"tasting-tray\" class=\"tasting-tray-dock is-hidden\" aria-label=\"Tasting Selection Tray\">\n    <div class=\"tray-inner\">\n      <div class=\"tray-info\">\n        <div class=\"tray-badge\">\n          <span class=\"tray-dot\"></span>\n          <span id=\"tray-count-label\">0 items</span>\n        </div>\n        <div class=\"tray-total\">\n          <span class=\"tray-total-label\">Estimated:</span>\n          <strong class=\"tray-total-val\" id=\"tray-total-val\">\u09f3 0</strong>\n        </div>\n      </div>\n      <div class=\"tray-actions\">\n        <button type=\"button\" class=\"tray-clear-btn\" id=\"tray-clear-btn\" title=\"Clear selection\">Clear</button>\n        <button type=\"button\" class=\"tray-order-btn\" id=\"tray-order-btn\">\n          <span>Book Table with this Order</span>\n          <svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\">\n            <path d=\"M5 12h14M12 5l7 7-7 7\" />\n          </svg>\n        </button>\n      </div>\n    </div>\n  </aside>\n\n  <!-- ======================================================================\n       ARTISANAL CAF\u00c9 FOOTER\n       Houses address, direct phone, social media, story chapters, \n       newsletter, and terms & conditions.\n       ====================================================================== -->\n  <footer class=\"site-footer\" id=\"site-footer\">\n    <div class=\"footer-inner\">\n\n      <!-- Main Navigation Grid: 4 Dedicated Balanced Columns -->\n      <div class=\"footer-grid\">\n\n        <!-- Column 1: Shop Address & Roastery Location -->\n        <div class=\"footer-col\">\n          <h4 class=\"footer-col-title\">\n            <span class=\"title-icon\">\ud83d\udccd</span>\n            <span>The Coffee House &amp; Roastery</span>\n          </h4>\n          <address class=\"footer-address\">\n            <strong class=\"shop-name\">Blue Bell Caf\u00e9</strong>\n            <p class=\"address-line\">Road 50, Gulshan 2</p>\n            <p class=\"address-sub\">Gulshan, Dhaka 1212, Bangladesh</p>\n            <p class=\"address-landmark\"><em>(Near Gulshan 2 &amp; Lake Park)</em></p>\n          </address>\n\n          <a href=\"https://maps.google.com/?q=Gulshan+2+Dhaka+Bangladesh\" target=\"_blank\" rel=\"noopener noreferrer\"\n            class=\"directions-link\">\n            <span>Get Directions on Google Maps</span>\n            <svg viewBox=\"0 0 24 24\" width=\"14\" height=\"14\" fill=\"currentColor\">\n              <path\n                d=\"M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4h-2v4H5V7h4V5H5z\" />\n            </svg>\n          </a>\n          <p class=\"atelier-note\">Intimate candlelit sanctuary &amp; artisanal roastery in Gulshan.</p>\n          <a href=\"#top\" class=\"footer-logo-badge\" title=\"Blue Bell Caf\u00e9 \u2014 Return to top\">\n            <img src=\"assets/Logo and falcon/logo.webp\" decoding=\"async\" alt=\"Blue Bell Caf\u00e9\" class=\"footer-logo-img\">\n          </a>\n        </div>\n\n        <!-- Column 2: Visiting & Opening Hours -->\n        <div class=\"footer-col\">\n          <h4 class=\"footer-col-title\">\n            <span class=\"title-icon\">\u23f1\ufe0f</span>\n            <span>Visiting Hours</span>\n          </h4>\n          <p class=\"col-desc\">Welcoming coffee enthusiasts daily:</p>\n\n          <div class=\"footer-hours\">\n            <h5 class=\"hours-title\">Opening Hours:</h5>\n            <ul class=\"hours-list\">\n              <li><span>Monday \u2013 Friday:</span> <strong>7:30 AM \u2013 11:00 PM</strong></li>\n              <li><span>Saturday \u2013 Sunday:</span> <strong>8:00 AM \u2013 12:30 PM</strong></li>\n              <li class=\"hours-highlight\"><span>Candlelight Lounge:</span> <strong>From 6:00 PM Daily</strong></li>\n            </ul>\n          </div>\n          <span class=\"roast-note\">Daily micro-batch roasts at 8:00 AM</span>\n        </div>\n\n        <!-- Column 3: Direct Phone & Reservations -->\n        <div class=\"footer-col\">\n          <h4 class=\"footer-col-title\">\n            <span class=\"title-icon\">\ud83d\udcde</span>\n            <span>Contact &amp; Bookings</span>\n          </h4>\n          <p class=\"col-desc\">For table bookings, bean orders, or inquiries:</p>\n\n          <div class=\"contact-links\">\n            <!-- Direct Phone -->\n            <a href=\"tel:+8801711234567\" class=\"contact-item\" title=\"Call: +880 1711-234567\">\n              <div class=\"contact-item-icon\">\n                <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"currentColor\">\n                  <path\n                    d=\"M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z\" />\n                </svg>\n              </div>\n              <div class=\"contact-item-text\">\n                <span class=\"contact-label\">Reservations</span>\n                <span class=\"contact-val\">+880&nbsp;1711234567</span>\n              </div>\n            </a>\n\n            <!-- Direct Email -->\n            <a href=\"mailto:contactshahria@gmail.com\" class=\"contact-item\" title=\"Email: contactshahria@gmail.com\">\n              <div class=\"contact-item-icon\">\n                <svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"currentColor\">\n                  <path\n                    d=\"M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z\" />\n                </svg>\n              </div>\n              <div class=\"contact-item-text\">\n                <span class=\"contact-label\">General &amp; Press Inquiries</span>\n                <span class=\"contact-val\">contactshahria@gmail.com</span>\n              </div>\n            </a>\n          </div>\n\n          <div class=\"quick-reserve-box\">\n            <p class=\"reserve-note\">Candlelit marble table for two?</p>\n            <a href=\"reservation/reservation.html\" class=\"footer-reserve-btn\" id=\"footer-book-btn\">\n              <span>Reserve a Table Online</span>\n              <svg viewBox=\"0 0 24 24\" width=\"16\" height=\"16\" fill=\"currentColor\">\n                <path d=\"M5 12h14M12 5l7 7-7 7\" />\n              </svg>\n            </a>\n            <a href=\"#cafe-menu\" class=\"footer-menu-link\">View Artisanal Menu \u2192</a>\n          </div>\n        </div>\n\n        <!-- Column 4: Social Media & Ambient Lounge -->\n        <div class=\"footer-col\">\n          <h4 class=\"footer-col-title\">\n            <span class=\"title-icon\">\u2726</span>\n            <span>Connect &amp; Social</span>\n          </h4>\n          <p class=\"col-desc\">Follow our daily roasting rituals &amp; stories:</p>\n\n          <div class=\"social-links-grid\">\n            <!-- Instagram -->\n            <a href=\"https://instagram.com\" target=\"_blank\" rel=\"noopener noreferrer\"\n              class=\"social-card social-instagram\" title=\"Follow Blue Bell Caf\u00e9 on Instagram\">\n              <div class=\"social-icon\">\n                <svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"currentColor\">\n                  <path\n                    d=\"M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z\" />\n                </svg>\n              </div>\n              <div class=\"social-details\">\n                <span class=\"social-name\">Instagram</span>\n                <span class=\"social-handle\">@bluebellcafe</span>\n              </div>\n            </a>\n\n            <!-- Facebook -->\n            <a href=\"https://facebook.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"social-card social-facebook\"\n              title=\"Like Blue Bell Caf\u00e9 on Facebook\">\n              <div class=\"social-icon\">\n                <svg viewBox=\"0 0 24 24\" width=\"22\" height=\"22\" fill=\"currentColor\">\n                  <path\n                    d=\"M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z\" />\n                </svg>\n              </div>\n              <div class=\"social-details\">\n                <span class=\"social-name\">Facebook</span>\n                <span class=\"social-handle\">/bluebellcafedhaka</span>\n              </div>\n            </a>\n          </div>\n\n          <!-- Vinyl Ambiance Showcase -->\n          <div class=\"cafe-vinyl-showcase\">\n            <div class=\"vinyl-disc\"></div>\n            <div class=\"vinyl-info\">\n              <span class=\"vinyl-tag\">In-House Ambience</span>\n              <strong class=\"vinyl-track\">Gulshan Vinyl Lounge</strong>\n              <span class=\"vinyl-sub\">Warm analog crackle &amp; acoustic jazz</span>\n            </div>\n          </div>\n        </div>\n\n      </div>\n\n      <!-- Bottom Bar: Centered Copyright -->\n      <div class=\"footer-bottom\">\n        <div class=\"footer-copyright\">\n          <p>\u00a9 2026 <strong>Blue Bell Caf\u00e9</strong>. All rights reserved by B. M. Shahria Alam.</p>\n        </div>\n      </div>\n\n    </div>\n  </footer>";

function mountMenuContent() {
  const mount = document.getElementById('menu-mount');
  if (!mount || mount.children.length > 0 || document.getElementById('cafe-menu')) {
    return;
  }
  mount.innerHTML = MENU_HTML_TEMPLATE;
}

function initMenuEngine() {
  mountMenuContent();
  const menuContainer = document.getElementById('cafe-menu');
  if (!menuContainer) return;

/* ------------------------------------------------------------------------------
   3. DYNAMIC FLOATING CONTROLS DOCKING
   Prevents floating components (e.g. Tasting Tray) from overlapping footer.
   ------------------------------------------------------------------------------ */

const footerElement = document.querySelector('.site-footer');
const tastingTrayEl = document.getElementById('tasting-tray');
let dockTicking = false;

/**
 * Recalculates bottom margin of the floating dock based on footer intersection.
 */
function updateFloatingControlsDocking() {
  const windowHeight = window.innerHeight;
  const baseTrayMargin = 24;

  if (footerElement) {
    const footerRect = footerElement.getBoundingClientRect();
    if (footerRect.top < windowHeight) {
      const footerOverlap = windowHeight - footerRect.top;
      if (tastingTrayEl) {
        tastingTrayEl.style.bottom = `${footerOverlap + baseTrayMargin}px`;
      }
      return;
    }
  }

  if (tastingTrayEl) {
    tastingTrayEl.style.bottom = `${baseTrayMargin}px`;
  }
}

/**
 * Throttles docking updates using requestAnimationFrame.
 */
function handleFloatingControlsScroll() {
  if (!dockTicking) {
    dockTicking = true;
    requestAnimationFrame(() => {
      updateFloatingControlsDocking();
      dockTicking = false;
    });
  }
}

window.addEventListener('scroll', handleFloatingControlsScroll, { passive: true });
window.addEventListener('resize', updateFloatingControlsDocking);
// Initialize docking geometry
updateFloatingControlsDocking();


/* ------------------------------------------------------------------------------
   4. ARTISANAL MENU ENGINE
   - Category Filter Navigation
   - Tasting Tray Reactive Store
   - Quantity Stepper UI Sync
   ------------------------------------------------------------------------------ */

// --- Category Filter Tabs ---
const filterButtons = document.querySelectorAll('.menu-filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

if (filterButtons.length > 0) {
  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active tab button style
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      // Filter cards with smooth entrance animation
      menuCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('is-filtered-out');
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.classList.add('is-filtered-out');
        }
      });
    });
  });
}

/**
 * Reactive Tasting Tray Store
 * Manages item selections, quantities, prices, and UI synchronization.
 */
const tastingTray = {
  /** @type {Map<string, {id: string, name: string, price: number, quantity: number}>} */
  items: new Map(),

  /**
   * Persists current tasting tray state to localStorage.
   */
  saveToStorage() {
    try {
      if (this.items && this.items.size > 0) {
        const itemsList = Array.from(this.items.values());
        const trayData = {
          items: itemsList,
          totalCount: this.getTotalCount(),
          totalPrice: this.getTotalPrice()
        };
        localStorage.setItem('bbc_tasting_tray', JSON.stringify(trayData));
      } else {
        localStorage.removeItem('bbc_tasting_tray');
      }
    } catch (err) {
      console.warn('[BlueBell] Unable to persist tasting tray state:', err);
    }
  },

  /**
   * Restores tasting tray selections from localStorage if previously stored.
   */
  loadFromStorage() {
    try {
      const raw = localStorage.getItem('bbc_tasting_tray');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || !data.items) return;
      const itemsList = Array.isArray(data.items) ? data.items : Object.values(data.items);
      itemsList.forEach((it) => {
        if (it && it.id && it.quantity > 0) {
          this.items.set(it.id, {
            id: it.id,
            name: it.name,
            price: Number(it.price) || 0,
            quantity: Number(it.quantity) || 1
          });
          this.updateCardUI(it.id, it.quantity);
        }
      });
      this.render();
    } catch (err) {
      console.warn('[BlueBell] Unable to restore tasting tray state:', err);
    }
  },

  /**
   * Adds an item to the tray or increments its quantity.
   * @param {string} id - Unique item identifier (e.g. 'bis-02')
   * @param {string} name - Culinary item name
   * @param {number|string} price - Unit price in BDT
   * @param {number} [quantity=1] - Quantity to add
   */
  add(id, name, price, quantity = 1) {
    if (this.items.has(id)) {
      const existing = this.items.get(id);
      existing.quantity += quantity;
    } else {
      this.items.set(id, { id, name, price: Number(price), quantity });
    }
    this.render();
    this.saveToStorage();
  },

  /**
   * Explicitly sets the quantity for an item.
   * @param {string} id - Item identifier
   * @param {number} quantity - Target quantity
   */
  setQuantity(id, quantity) {
    if (quantity <= 0) {
      this.remove(id);
      return;
    }
    if (this.items.has(id)) {
      this.items.get(id).quantity = quantity;
      this.render();
      this.saveToStorage();
    }
  },

  /**
   * Retrieves the current quantity of a specific item.
   * @param {string} id - Item identifier
   * @returns {number}
   */
  getQuantity(id) {
    return this.items.has(id) ? this.items.get(id).quantity : 0;
  },

  /**
   * Removes an item from the tray and resets card UI.
   * @param {string} id - Item identifier
   */
  remove(id) {
    this.items.delete(id);
    this.updateCardUI(id, 0);
    this.render();
    this.saveToStorage();
  },

  /**
   * Synchronizes card UI stepper with current tray quantity.
   * @param {string} id - Item identifier
   * @param {number} qty - Current quantity
   */
  updateCardUI(id, qty) {
    const btn = document.querySelector(`.add-to-tray-btn[data-id="${id}"]`);
    if (!btn) return;
    const parentControl = btn.closest('.card-tray-control');
    const stepperValue = parentControl ? parentControl.querySelector('.qty-step-value') : null;

    if (qty > 0) {
      btn.classList.add('is-added');
      btn.innerHTML = '<span>✓ In Tasting Tray</span>';
      if (parentControl) parentControl.classList.add('is-active');
      if (stepperValue) stepperValue.textContent = qty;
    } else {
      btn.classList.remove('is-added');
      btn.innerHTML = '<span>Add to Tasting Tray</span>';
      if (parentControl) parentControl.classList.remove('is-active');
      if (stepperValue) stepperValue.textContent = '1';
    }
  },

  /**
   * Clears all items from the tray and resets all card steppers.
   */
  clear() {
    this.items.clear();
    document.querySelectorAll('.card-tray-control').forEach((ctrl) => {
      ctrl.classList.remove('is-active');
      const btn = ctrl.querySelector('.add-to-tray-btn');
      if (btn) {
        btn.classList.remove('is-added');
        btn.innerHTML = '<span>Add to Tasting Tray</span>';
      }
      const val = ctrl.querySelector('.qty-step-value');
      if (val) val.textContent = '1';
    });
    this.render();
    this.saveToStorage();
  },

  /**
   * Computes the total item count.
   * @returns {number}
   */
  getTotalCount() {
    let count = 0;
    this.items.forEach((item) => {
      count += item.quantity;
    });
    return count;
  },

  /**
   * Computes total order value in BDT.
   * @returns {number}
   */
  getTotalPrice() {
    let sum = 0;
    this.items.forEach((item) => {
      sum += (item.price * item.quantity);
    });
    return sum;
  },

  /**
   * Renders the updated state to the floating Tasting Tray dock.
   */
  render() {
    const totalCount = this.getTotalCount();
    const totalPrice = this.getTotalPrice();
    const countLabel = document.getElementById('tray-count-label');
    const totalVal = document.getElementById('tray-total-val');

    if (countLabel) {
      countLabel.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'} selected`;
    }
    if (totalVal) {
      totalVal.textContent = `৳ ${totalPrice.toLocaleString()}`;
    }

    if (tastingTrayEl) {
      if (totalCount > 0) {
        tastingTrayEl.classList.remove('is-hidden');
      } else {
        tastingTrayEl.classList.add('is-hidden');
      }
    }
    updateFloatingControlsDocking();
  }
};

// Wire Add-to-Tray Buttons and Steppers
document.querySelectorAll('.card-tray-control').forEach((control) => {
  const btn = control.querySelector('.add-to-tray-btn');
  const minusBtn = control.querySelector('.qty-minus');
  const plusBtn = control.querySelector('.qty-plus');
  const valEl = control.querySelector('.qty-step-value');

  if (!btn) return;

  const id = btn.getAttribute('data-id');
  const name = btn.getAttribute('data-name');
  const price = Number(btn.getAttribute('data-price'));

  // Toggle in/out of tasting tray
  btn.addEventListener('click', () => {
    const currentQty = tastingTray.getQuantity(id);
    if (currentQty === 0) {
      tastingTray.add(id, name, price, 1);
      tastingTray.updateCardUI(id, 1);
    } else {
      tastingTray.remove(id);
    }
  });

  // Quantity increment
  if (plusBtn) {
    plusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentQty = tastingTray.getQuantity(id);
      const newQty = (currentQty > 0 ? currentQty : 1) + 1;
      tastingTray.setQuantity(id, newQty);
      if (valEl) valEl.textContent = newQty;
    });
  }

  // Quantity decrement
  if (minusBtn) {
    minusBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const currentQty = tastingTray.getQuantity(id);
      if (currentQty > 1) {
        const newQty = currentQty - 1;
        tastingTray.setQuantity(id, newQty);
        if (valEl) valEl.textContent = newQty;
      } else {
        tastingTray.remove(id);
      }
    });
  }
});

// Expose tastingTray globally for cross-module integration
window.tastingTray = tastingTray;

// Restore any existing tray selections from localStorage
tastingTray.loadFromStorage();

// Clear Tray Action Trigger
const clearTrayBtn = document.getElementById('tray-clear-btn');
if (clearTrayBtn) {
  clearTrayBtn.addEventListener('click', () => {
    tastingTray.clear();
    try {
      localStorage.removeItem('bbc_tasting_tray');
    } catch (e) {
      /* Safe ignore */
    }
  });
}


/* ------------------------------------------------------------------------------
   5. PAGE TRANSITION & PREFETCH ACCELERATION
   Provides fluid crossfades and zero-latency page prewarming.
   ------------------------------------------------------------------------------ */

/**
 * Triggers smooth page transition with steaming coffee veil.
 * @param {string} url - Destination target URL
 */
function getReservationUrl() {
  const inSubfolder = window.location.pathname.includes('/menu/') || 
                      window.location.pathname.includes('/story/') || 
                      window.location.pathname.includes('/reservation/');
  return inSubfolder ? '../reservation/reservation.html' : 'reservation/reservation.html';
}

function smoothNavigateTo(url) {
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.add('is-active');
  }
  setTimeout(() => {
    window.location.href = url;
  }, 25);
}

// Prefetch reservation page on hover or touch for instant loads
document.addEventListener('pointerenter', (e) => {
  const link = e.target.closest && e.target.closest('a[href*="reservation"]');
  if (link && !link._prefetched) {
    link._prefetched = true;
    const pre = document.createElement('link');
    pre.rel = 'prefetch';
    pre.href = link.getAttribute('href') || getReservationUrl();
    document.head.appendChild(pre);
  }
}, true);

// Reset transition veil on page show (handles browser Back button & bfcache)
window.addEventListener('pageshow', () => {
  const veil = document.getElementById('page-transition-veil');
  if (veil) {
    veil.classList.remove('is-active');
  }
});

// Intercept internal reservation links for smooth crossfade and persist tray
document.addEventListener('click', (e) => {
  const link = e.target.closest && e.target.closest('a[href*="reservation"]');
  if (link && !link.target && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
    e.preventDefault();
    tastingTray.saveToStorage();
    smoothNavigateTo(link.getAttribute('href') || getReservationUrl());
  }
});

// Proceed to Booking Action Trigger
const trayOrderBtn = document.getElementById('tray-order-btn');
if (trayOrderBtn) {
  trayOrderBtn.addEventListener('click', (e) => {
    e.preventDefault();
    tastingTray.saveToStorage();
    smoothNavigateTo(getReservationUrl());
  });
}
}

// Auto-run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMenuEngine);
} else {
  initMenuEngine();
}


// Immediate synchronous mount if script tag is parsed after #menu-mount
try {
  mountMenuContent();
} catch (e) {}


// Immediate synchronous mount if script tag is parsed after #menu-mount
try {
  mountMenuContent();
} catch (e) {}

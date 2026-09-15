// TikTok Pixel Helper for tracking eCommerce events in Morocco COD funnels

export const TIKTOK_PIXEL_ID = 'DAASFM3C77U21D59SVRG';

declare global {
  interface Window {
    ttq?: any;
    TiktokAnalyticsObject?: string;
  }
}

/**
 * Initialize TikTok Pixel snippet on the page
 */
export function initTikTokPixel(pixelId: string = TIKTOK_PIXEL_ID) {
  if (typeof window === 'undefined') return;

  // Check if already initialized
  if (window.ttq) {
    try {
      window.ttq.load(pixelId);
      window.ttq.page();
    } catch (e) {
      console.warn('TikTok pixel reload notice:', e);
    }
    return;
  }

  /* eslint-disable */
  (function (w: any, d: any, t: any) {
    w.TiktokAnalyticsObject = t;
    var ttq = (w[t] = w[t] || []);
    ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
    ];
    ttq.setAndDefer = function (t: any, e: any) {
      t[e] = function () {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (var i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    ttq.instance = function (t: any) {
      for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n]);
      }
      return e;
    };
    ttq.load = function (e: any, n: any) {
      var i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = i;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      var o = d.createElement('script');
      o.type = 'text/javascript';
      o.async = !0;
      o.src = i + '?sdkid=' + e + '&lib=' + t;
      var a = d.getElementsByTagName('script')[0];
      if (a && a.parentNode) {
        a.parentNode.insertBefore(o, a);
      } else {
        d.head.appendChild(o);
      }
    };

    ttq.load(pixelId);
    ttq.page();
  })(window, document, 'ttq');
}

/**
 * Track Page View event
 */
export function trackTikTokPageView() {
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      window.ttq.page();
    } catch (err) {
      console.warn('TikTok page view error:', err);
    }
  }
}

/**
 * Track ViewContent event when visitor lands and views the product offer
 */
export function trackTikTokViewContent(packageName: string = 'Magnesium Glycinate + Malate 2150mg', price: number = 229, sku: string = 'magnesium-glycinate') {
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      window.ttq.track('ViewContent', {
        contents: [
          {
            content_id: sku,
            content_type: 'product',
            content_name: packageName,
            quantity: 1,
            price: Number(price) || 0,
          },
        ],
        content_id: sku,
        content_type: 'product',
        content_name: packageName,
        quantity: 1,
        price: Number(price) || 0,
        value: Number(price) || 0,
        currency: 'MAD',
      });
    } catch (err) {
      console.warn('TikTok ViewContent tracking error:', err);
    }
  }
}

/**
 * Track Initiate Checkout event when customer engages with order form
 */
export function trackTikTokInitiateCheckout(packageName: string, price: number, sku: string = 'magnesium-glycinate') {
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      window.ttq.track('InitiateCheckout', {
        contents: [
          {
            content_id: sku,
            content_type: 'product',
            content_name: packageName || 'Magnesium Complex',
            quantity: 1,
            price: Number(price) || 0,
          },
        ],
        content_id: sku,
        content_type: 'product',
        content_name: packageName || 'Magnesium Complex',
        quantity: 1,
        price: Number(price) || 0,
        value: Number(price) || 0,
        currency: 'MAD',
      });
    } catch (err) {
      console.warn('TikTok InitiateCheckout tracking error:', err);
    }
  }
}

/**
 * Track Purchase / Complete Payment when order is successfully placed
 */
export function trackTikTokPurchase(orderNumber: string, packageName: string, price: number, quantity: number = 1, sku: string = 'magnesium-glycinate') {
  if (typeof window !== 'undefined' && window.ttq) {
    try {
      const payload = {
        contents: [
          {
            content_id: sku,
            content_type: 'product',
            content_name: packageName || 'Magnesium Complex',
            quantity: quantity,
            price: Number(price) || 0,
          },
        ],
        content_id: sku,
        content_type: 'product',
        content_name: packageName || 'Magnesium Complex',
        quantity: quantity,
        price: Number(price) || 0,
        value: Number(price) || 0,
        currency: 'MAD',
        order_id: orderNumber,
      };

      // CompletePayment is TikTok's official event for e-commerce purchases
      window.ttq.track('CompletePayment', payload);

      // Also send PlaceAnOrder for maximum compatibility across TikTok campaign optimization types
      window.ttq.track('PlaceAnOrder', payload);
    } catch (err) {
      console.warn('TikTok CompletePayment tracking error:', err);
    }
  }
}

(function () {
    const TH_ORIG = 0.95;
    const TH_ZONE = 0.95;
    const TH_IOU  = 0.92;
    const EPS     = 2;
    const ZONE_CLASS_RE = /^zone\d+/i;
  
    const A = (r) => Math.max(0, r.w) * Math.max(0, r.h);
    const inflate = (r, e) => ({ x: r.x - e, y: r.y - e, w: r.w + 2*e, h: r.h + 2*e });
    const rectOf = (el) => {
      const b = el.getBoundingClientRect();
      return { x: b.left + scrollX, y: b.top + scrollY, w: b.width, h: b.height };
    };
    const inter = (a,b) => {
      const x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y);
      const x2 = Math.min(a.x + a.w, b.x + b.w), y2 = Math.min(a.y + a.h, b.y + b.h);
      const w = Math.max(0, x2 - x1), h = Math.max(0, y2 - y1);
      return { x: x1, y: y1, w, h };
    };
    const iou = (a,b) => {
      const I = inter(a,b), Ai = A(I), Ua = A(a), Ub = A(b), U = Ua + Ub - Ai;
      return U <= 0 ? 0 : Ai / U;
    };
  
    const isOriginalZoneDiv = (el) => {
      if (!el || el.tagName !== "DIV") return false;
      const cls = (el.className || "").split(/\s+/);
      return cls.some(c => ZONE_CLASS_RE.test(c));
    };
  
    function collectPluginZones() {
      const nodes = document.querySelectorAll(
        "[zone_coords],[bbox],[zone],[keywords],[is-usable],[aria-controls],[data-target],[href^='#'],[onclick^='sendWS(']"
      );
      const out = [];
      nodes.forEach(el => {
        if (isOriginalZoneDiv(el)) return;
        const r = rectOf(el);
        if (r.w > 1 && r.h > 1) {
          out.push({ el, rect: r, onclick: el.getAttribute("onclick") || "" });
        }
      });
      return out;
    }
  
    function disableClicks(div) {
      div.removeAttribute("onclick");
      const stop = e => { e.stopImmediatePropagation(); e.preventDefault(); };
      ["click","mousedown","mouseup","pointerdown","pointerup","touchstart","touchend"]
        .forEach(t => div.addEventListener(t, stop, true));
      div.style.pointerEvents = "none";
      div.setAttribute("tabindex", "-1");
    }
  
    function isStrictMatch(divRect, zoneRect, onclickA, onclickB) {
      if (onclickA && onclickA === onclickB) return true;
  
      const A0 = inflate(divRect, EPS);
      const B0 = inflate(zoneRect, EPS);
      const I  = inter(A0, B0);
      const Ai = A(I), Aa = A(A0), Ab = A(B0);
      if (Aa <= 0 || Ab <= 0) return false;
  
      const coverA = Ai / Aa;
      const coverB = Ai / Ab;
      const J = iou(A0, B0);
  
      return (coverA >= TH_ORIG && coverB >= TH_ZONE) || (J >= TH_IOU);
    }
  
    let dirty = false, idleTicks = 0, tries = 0;
    const mo = new MutationObserver(() => { dirty = true; idleTicks = 0; });
  
    function tryMatchAndDisable() {
      const pluginZones = collectPluginZones();
      if (!pluginZones.length) return false;
  
      const originals = Array.from(document.querySelectorAll("div")).filter(isOriginalZoneDiv);
      for (const div of originals) {
        const R = rectOf(div);
        if (R.w <= 1 || R.h <= 1) continue;
        const myOnClick = div.getAttribute("onclick") || "";
        const matched = pluginZones.some(z => isStrictMatch(R, z.rect, myOnClick, z.onclick));
        if (!matched) disableClicks(div);
      }
      return true;
    }
  
    function pump() {
      if (!dirty) idleTicks++;
      if (dirty && idleTicks < 3) { requestAnimationFrame(pump); return; }
      dirty = false; idleTicks = 0;
      const ok = tryMatchAndDisable();
      if (ok) { mo.disconnect(); }
      else if (tries++ < 50) { requestAnimationFrame(pump); }
      else { mo.disconnect(); }
    }
  
    function start() {
      mo.observe(document.documentElement, {subtree:true, childList:true, attributes:true});
      dirty = true;
      pump();
    }
  
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start);
    } else {
      start();
    }
  })();
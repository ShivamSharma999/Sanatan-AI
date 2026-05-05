import { Create } from "../components/elements.js";
import { copyMessage, deleteChat, edit, init } from "../core/app.js";
import { evListener } from "../core/config.js";
import { chatBody, isMobile } from "./definitions.js";
import { md, mermaid, renderMath } from "./md-extension.js";
import { regenerateResponse } from "./regenerate.js";

class ParticleBackground {
  constructor(o = {}) {
    this.count = window.innerWidth / 50;
    this.o = {
      s: o.selector || ".background-particles",
      p: o.particleCount || (this.count < 15 ? 16 : this.count),
      c: o.colors || ["#8e44ad", "#3498db", "#2ecc71", "#f1c40f", "#ffffff"],
      mi: o.minSize || 2,
      ma: o.maxSize || 6,
      sp: o.speed || 0.5,
      con: o.connected || !0,
      cd: o.connectionDistance || 150,
      r: o.responsive || !0,
      op: o.opacity || 0.5,
    };
    this.par = [];
    this.con = document.querySelector(this.o.s);
    this.can = document.createElement("canvas");
    this.ctx = this.can.getContext("2d");
    this.pc = this.o.p;
    this.cs = { w: 0, h: 0 };
    this.i();
  }
  i() {
    if (!this.con) {
      // Fail silently or log warn if debugging, but avoid error for user experience if element is transient
      // console.warn("Particles container not found for selector:", this.o.s);
      return;
    }
    this.con.appendChild(this.can);
    this.can.style.position = "absolute";
    this.can.style.top = "0";
    this.can.style.left = "0";
    this.can.style.opacity = this.o.op.toString();
    this.can.style.pointerEvents = "none";
    this.can.style.zIndex = "0";
    this.r();
    evListener("resize", window, () => this.r());
    this.cp();
    this.af = requestAnimationFrame(() => this.a());
  }
  r() {
    if (!this.con) return;
    const { width, height } = this.con.getBoundingClientRect();
    this.cs.w = width;
    this.cs.h = height;
    this.can.width = width;
    this.can.height = height;
    if (this.par.length > 0) {
      this.par = [];
      this.cp();
    }
  }
  cp() {
    for (let o = 0; o < this.pc; o++) {
      this.par.push({
        x: Math.random() * this.cs.w,
        y: Math.random() * this.cs.h,
        s: Math.random() * (this.o.ma - this.o.mi) + this.o.mi,
        c: this.o.c[Math.floor(Math.random() * this.o.c.length)],
        sx: (Math.random() - 0.5) * this.o.sp,
        sy: (Math.random() - 0.5) * this.o.sp,
        op: Math.random() * 0.5 + 0.3,
      });
    }
  }
  a() {
    this.ctx.clearRect(0, 0, this.cs.w, this.cs.h);
    this.par.forEach((o, i) => {
      o.x += o.sx;
      o.y += o.sy;
      if (o.x > this.cs.w) o.x = 0;
      else if (o.x < 0) o.x = this.cs.w;
      if (o.y > this.cs.h) o.y = 0;
      else if (o.y < 0) o.y = this.cs.h;
      this.ctx.beginPath();
      this.ctx.arc(o.x, o.y, o.s, 0, Math.PI * 2);
      this.ctx.fillStyle = this.hTR(o.c, o.op);
      this.ctx.fill();
      if (this.o.con) {
        this.cP(o, i);
      }
    });
    this.af = requestAnimationFrame(() => this.a());
  }
  cP(o, i) {
    for (let a = i + 1; a < this.par.length; a++) {
      const p2 = this.par[a];
      const d = this.gD(o.x, o.y, p2.x, p2.y);
      if (d < this.o.cd) {
        const op = (1 - d / this.o.cd) * 0.8;
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.hTR(o.c, op);
        this.ctx.lineWidth = 0.5;
        this.ctx.moveTo(o.x, o.y);
        this.ctx.lineTo(p2.x, p2.y);
        this.ctx.stroke();
      }
    }
  }
  gD(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  hTR(hex, op) {
    let r, g, b;
    if (hex.length === 4) {
      r = parseInt(hex.charAt(1) + hex.charAt(1), 16);
      g = parseInt(hex.charAt(2) + hex.charAt(2), 16);
      b = parseInt(hex.charAt(3) + hex.charAt(3), 16);
    } else {
      r = parseInt(hex.substr(1, 2), 16);
      g = parseInt(hex.substr(3, 2), 16);
      b = parseInt(hex.substr(5, 2), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${op})`;
  }
  destroy() {
    if (this.af) {
      cancelAnimationFrame(this.af);
    }
    if (this.can && this.can.parentNode) {
      this.can.parentNode.removeChild(this.can);
    }
    this.par = [];
  }
}

evListener("DOMContentLoaded", document, () => {
  new ParticleBackground({ opacity: 1 });
  if (document.querySelector(".chatbot-popup")) {
   new ParticleBackground({ selector: ".chatbot-popup" });
  }
});


export function convertToHtml(chats) {
  chatBody.innerHTML = "";

  if (chats.length === 0) {
    return {
      botCount: 0,
      userCount: 0,
    };
  }

  let botCount = 0;
  let userCount = 0;
  let messageIndex = -1;

  document.body.classList.add("hide-suggestion");

  chats.forEach((chat) => {
    messageIndex++;
    const msgIdx = messageIndex;
    if (chat.role === "user") {
      let textContent = "";
      let fileAttachments = [];
      let hasFunctionResponse = false;

      chat.parts.forEach((part) => {
        if (part.functionResponse) {
          hasFunctionResponse = true;
          return;
        }

        if (part.text) {
          textContent += part.text;
        } else if (part.inlineData) {
          const mimeType = part.inlineData.mimeType;
          const data = part.inlineData.data;

          if (mimeType.startsWith("image/")) {
            let div = Create("div", {align: "right"}),
            src = `data:${mimeType};base64,${data}`
            div.appendChild(Create("img.attachment", {src: src}))
            fileAttachments.push(div);
          } else {
            let span = Create("span.sanatan-symbol", {}, "description"),
            para = Create("p.file-attachment", {}, [span]);
            fileAttachments.push(para);
          }
        }
      });

      if (!hasFunctionResponse) {
        // Only display user message if it's not solely a function response
        userCount++;

        const msgTxt = Create("div.message-text", {}, escapeHtml(textContent)),
        editMsg = Create("code.icon.sanatan-symbol", {}, "edit", ["click", () => { edit(editMsg, msgIdx) }]),
        delMsg = Create("code.icon.sanatan-symbol", {}, "delete", ["click", () => deleteChat(msgIdx)]),
        reGenBtn = Create("code.icon.sanatan-symbol", {}, "refresh", ["click", () => regenerateResponse(msgIdx + 1)]),
        edits = Create("p.flex", {}, [editMsg, reGenBtn, delMsg]),
        userMessage = Create("div.user-message.col", {}, [msgTxt, ...fileAttachments, edits]);
        chatBody.appendChild(userMessage);
      }
    } else if (chat.role === "model") {
      let botMessageContentHtml = "";
      let hasFunctionResponse = false;

      chat.parts.forEach((part) => {
        if (part.functionResponse) {
          hasFunctionResponse = true;
          return;
        }

        if (part.text) {
          let textContent = part.text;
          textContent = textContent.startsWith('\n') ? textContent.slice(1, textContent.length) : textContent;
          textContent = isMobile ? '![Sanatan Logo](./Resources/images/logo.png)' + textContent : textContent;
          botMessageContentHtml += md.render(textContent);
        } else if (part.inlineData) {
          const mimeType = part.inlineData.mimeType;
          const data = part.inlineData.data;
          botMessageContentHtml += `<img src="data:${mimeType};base64,${data}" class="attachment"/>`;
        }
      });

      if (!hasFunctionResponse) {
        // Only display bot message if it's not solely a function response
        botCount++;
        const msgTxt = Create("div.message-text", {}, botMessageContentHtml),
           logo = Create("img", {
            src: "./Resources/images/logo.png",
            alt: "Sanatan Logo"
          }),
          cDivArr = isMobile ? [msgTxt] : [logo,msgTxt],
          continerDiv = Create("div.row", {}, cDivArr),
          speakBtn = Create("code.icon.sanatan-symbol", {
            style: {
              marginLeft: '40px'
            }
          }, "volume_up", ["click", () => speak(speakBtn)]),
          copyBtn = Create("code.icon.sanatan-symbol", {}, "content_copy", ["click", () => copyMessage(msgIdx, copyBtn)]),
          deleteBtn = Create("code.icon.sanatan-symbol", {}, "delete", ["click", () => { deleteChat(msgIdx); }]),
          reGenBtn = Create("code.icon.sanatan-symbol", {}, "refresh", ["click", () => regenerateResponse(msgIdx)]),
          editContainer = Create("div.row", {}, [speakBtn, copyBtn, deleteBtn, reGenBtn]),
          botMessage = Create("div.message.bot-message", {}, [continerDiv, editContainer]);
        chatBody.appendChild(botMessage);
      }
    }
  });
  init();
  renderMath(chatBody);
  mermaid.run({
      nodes: document.querySelectorAll('.mermaid'),
    }).catch(err => console.error('Mermaid rendering failed:', err));
  
  return {
    botCount,
    userCount,
  };
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "<br>");
}
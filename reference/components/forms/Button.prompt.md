Deltalk's primary action control — warm by default, because warm is the user's reach and intent. Use it for any tap that moves a person toward a conversation.

```jsx
<Button variant="primary" size="lg" block>Say something real</Button>
<Button variant="gradient">Start talking</Button>   {/* the ONE hero action per screen */}
<Button variant="secondary">Maybe later</Button>
<Button variant="ghost" size="sm">Skip</Button>
```

Variants: `primary` (default), `gradient` (reserve for a single hero moment per screen), `secondary` (outlined), `ghost` (text). Rank is carried by weight, never by hue — there is no cool/accent variant. Sizes `sm | md | lg`. Props: `block`, `iconLeft`, `iconRight`, `as`, `disabled`, `tone`. Buttons use `--radius-button` (16) — a rounded square, **not** a pill — and shrink slightly on press.

**Danger has two weights, chosen by reversibility.** Solid `variant="destructive"` = irreversible (delete the account, a destructive dialog's confirm). `tone="danger"` on `secondary`/`ghost` = reversible but consequential (leave the conversation, log out): the label moves to `--danger-text`, the outline stays. Solid variants ignore `tone`.

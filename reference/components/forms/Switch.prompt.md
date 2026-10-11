Pill toggle switch. The variant is a **semantic** choice, not a stylistic one — it depends on
what turning the switch ON *means*. If the meaning is ambiguous, default to `enabling`.

- `enabling` (default) — ON **adds** something: optional, positive, expressive. Track is the
  brand gradient. Voice messages, notifications, show distance, show online status, only
  verified users can contact me, keep my photos blurred until we match.
- `restricting` — ON **limits, hides or cuts off**: protective/safety, where brand color would
  read as celebratory. Track is the neutral `--action-cta`. Also block this user, hide from
  contacts, incognito mode, temporarily deactivate account.

Off-state, knob, sizing and motion are identical across both variants.

```jsx
<Switch label="Voice notes" defaultChecked />
<Switch label="Keep my photos blurred until we match" defaultChecked />  {/* enabling */}
<Switch label="Also block this user" variant="restricting" />
<Switch label="Incognito mode" variant="restricting" />
```

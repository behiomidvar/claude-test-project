A single conversation bubble. The warm/cool duality carries meaning: the user (`me`) is always warm, the other person (`them`) is always cool. Tails mirror automatically under `dir="rtl"`.

```jsx
<MessageBubble from="them">سلام! چطوری؟</MessageBubble>
<MessageBubble from="me" time="۹:۴۱">Doing well — you?</MessageBubble>
<MessageBubble from="them" typing />
```

Props: `from` (`me|them`), `time`, `typing`.

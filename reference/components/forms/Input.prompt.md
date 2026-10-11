Text input and textarea on Deltalk's warm paper surface; the focus ring is cool violet ("conversation active").

```jsx
<Input label="Your name" placeholder="What should we call you?" />
<Input label="Answer the prompt" multiline rows={4}
  placeholder="Say something real…" />
<Input error="That email doesn't look right" iconLeft={<MailIcon/>} />
```

Props: `label`, `hint`, `error`, `multiline`, `rows`, `iconLeft`, `iconRight`, plus native input/textarea attrs. Placeholders should ask, not instruct.

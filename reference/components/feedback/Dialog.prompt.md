A bottom-sheet dialog that rises into view (the unfold, never a swipe). Titles use the display serif and should ask or reassure warmly rather than command. On wide screens it centers.

```jsx
<Dialog
  open={open}
  onClose={close}
  title="Ready to say hello properly?"
  actions={<>
    <Button variant="gradient" block>Send a hello</Button>
    <Button variant="ghost" block>Not yet</Button>
  </>}>
  You two have been talking for a while.
</Dialog>
```

Props: `open`, `onClose`, `title`, `actions`, `showGrip`.

Selectable pill for interests, prompt topics, and filters.

```jsx
<Chip selected>Books & long reads</Chip>
<Chip>Late-night talks</Chip>
<Chip variant="cool" interactive={false}>Cooking</Chip>   {/* display-only */}
<Chip emoji="📚">Books & long reads</Chip>   {/* interest chips ONLY — see component comment */}
<Chip selected removable onRemove={handleRemove}>Ages 18–28</Chip>   {/* close replaces the check */}
```

Props: `selected`, `variant` (`warm|cool`), `interactive`, `iconLeft`, `emoji` (interest chips only), `removable` + `onRemove` (whole chip becomes the remove target; never combines with the check).
